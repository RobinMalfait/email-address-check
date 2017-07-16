const dns = require("dns");
const dnsbl = require("dnsbl");
import promisify from "./promisify";
import validateUsernameForHostname from "./validateUsernameForHostname";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const dnsResolve = promisify(dns.resolve);
const dnsLookup = promisify(dns.lookup);

async function getIPAddress(hostname) {
  const hostname_ip_regex = /(\[(.*)\])/;

  if (hostname_ip_regex.test(hostname)) {
    return hostname.replace("[", "").replace("]", "");
  }

  const [ip] = await dnsLookup(hostname);
  return ip;
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

  // Is the IP address blacklisted?
  const ip = await getIPAddress(hostname);
  if (await dnsbl.lookup(ip, "zen.spamhaus.org")) {
    throw new Error("E-mail address has been blacklisted by spamhaus.org");
  }

  try {
    // Did we find MX records
    const mx_records = await dnsResolve(hostname, "MX");
    if (mx_records.length !== 0) {
      return true;
    }
  } catch (err) {
    throw new Error("Hostname does not have any DNS records attached");
  }
}

export function validate(email) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      validateEmail(email).then(resolve, reject);
    });
  });
}

export default validate;
