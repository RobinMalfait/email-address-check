const dns = require("dns");
import promisify from "./promisify";
import validateUsernameForHostname from "./validateUsernameForHostname";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const dnsResolve = promisify(dns.resolve);

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
  email = decodeURIComponent(email);

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

  try {
    // Did we find MX records
    const mx_records = await dnsResolve(hostname, "MX");
    if (mx_records.length !== 0) {
      return true;
    }

    // Did we find A records
    const a_records = await dnsResolve(hostname, "A");
    if (a_records.length !== 0) {
      return true;
    }
  } catch (err) {
    throw new Error("Hostname does not have any DNS records attached");
  }

  // Nope
  throw new Error("E-mail address is probably invalid");
}

export function validate(email) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      validateEmail(email).then(resolve, reject);
    });
  });
}

export default validate;
