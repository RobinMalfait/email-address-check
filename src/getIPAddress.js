const dns = require("dns");
import promisify from "./promisify";

const dnsLookup = promisify(dns.lookup);

async function getIPAddress(hostname) {
  const hostname_ip_regex = /(\[(.*)\])/;

  if (hostname_ip_regex.test(hostname)) {
    return hostname.replace("[", "").replace("]", "");
  }

  try {
    const [ip] = await dnsLookup(hostname);
    return ip;
  } catch (err) {
    throw new Error("Hostname not found");
  }
}

export default getIPAddress;
