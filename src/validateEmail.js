const dns = require("dns");
const dnsbl = require("dnsbl");

import promisify from "./promisify";
import validateUsernameForHostname from "./validateUsernameForHostname";
import getIPAddress from "./getIPAddress";
import errorIf from "./errorIf";
import mutate from "./mutate";
import validateRules from "./validateRules";

async function validateEmail(email) {
  return await validateRules([
    // Do we have a value
    errorIf(email => email === undefined, "E-mail address not specified"),

    // Did we receive a string
    errorIf(
      email => typeof email !== "string",
      "E-mail address is not a string"
    ),

    // Make sure the email address does not contain encoded characters
    errorIf(
      email => decodeURIComponent(email) !== email,
      "E-mail address has not a valid signature"
    ),

    // Make sure the email address is in lowercase
    mutate(email => email.toLowerCase()),

    // Does the email have a good looking syntax
    errorIf(email => {
      const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return !EMAIL_REGEX.test(email);
    }, "E-mail address has not a valid signature"),

    // Split email into parts
    mutate(email => email.split("@")),

    // Do we match the rules for the hostname
    errorIf(
      ([username, hostname]) => {
        return !validateUsernameForHostname(username, hostname);
      },
      ([username, hostname]) => {
        return "E-mail address did not match the rules for " + hostname;
      }
    ),

    // Add the IP address from the hostname to the input array
    mutate(async ([username, hostname]) => {
      const ip = await getIPAddress(hostname);
      return [username, hostname, ip];
    }),

    // Is the IP address blacklisted?
    errorIf(async ([username, hostname, ip]) => {
      return await dnsbl.lookup(ip, "zen.spamhaus.org");
    }, "E-mail address has been blacklisted by spamhaus.org"),

    // Did we find MX records
    errorIf(async ([username, hostname]) => {
      const dnsResolve = promisify(dns.resolve);

      const mx_records = await dnsResolve(hostname, "MX");
      return mx_records.length === 0;
    }, "Hostname does not have any DNS records attached"),

    // When no errors occur, we are good
    () => true
  ])(email);
}

export default validateEmail;
