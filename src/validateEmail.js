const dns = require("dns");
const dnsbl = require("dnsbl");

import promisify from "./promisify";
import validateUsernameForHostname from "./validateUsernameForHostname";
import getIPAddress from "./getIPAddress";
import { EMAIL_REGEX } from "./constants";

const dnsResolve = promisify(dns.resolve);

async function isBlacklisted(hostname) {
  try {
    const ip = await getIPAddress(hostname);
    return await dnsbl.lookup(ip, "zen.spamhaus.org");
  } catch (err) {
    console.log({ err });
    return false;
  }
}

async function validateEmail(email) {
  // Do we have a value
  if (email === undefined) {
    throw new Error("E-mail address not specified");
  }

  // Did we receive a string
  if (typeof email !== "string") {
    throw new Error("E-mail address is not a string");
  }

  // Make sure the email address does not contain encoded characters
  try {
    if (decodeURIComponent(email) !== email) {
      throw new Error();
    }
  } catch (err) {
    throw new Error("E-mail address has not a valid signature");
  }

  // Make sure the email address is in lowercase
  email = email.toLowerCase();

  // Does the email have a good looking syntax
  if (!EMAIL_REGEX.test(email)) {
    throw new Error("E-mail address has not a valid signature");
  }

  // Split email into parts
  const [username, hostname] = email.split("@");

  // Do we match the rules for the hostname
  if (!validateUsernameForHostname(username, hostname)) {
    throw new Error("E-mail address did not match the rules for " + hostname);
  }

  // Did we find MX records
  if (!/\[(.*)\]/.test(hostname)) {
    try {
      const mx_records = await dnsResolve(hostname, "MX");
      if (mx_records.length !== 0) {
        if (await isBlacklisted(hostname)) {
          throw new Error(
            "E-mail address has been blacklisted by spamhaus.org"
          );
        }

        return true;
      }
    } catch (err) {
      if (err.code === dns.NOTFOUND) {
        throw new Error("Hostname not found");
      }
    }
  }

  // Is the IP address blacklisted?
  if (await isBlacklisted(hostname)) {
    throw new Error("E-mail address has been blacklisted by spamhaus.org");
  }

  throw new Error("Hostname does not have any DNS records attached");
}

export default validateEmail;
