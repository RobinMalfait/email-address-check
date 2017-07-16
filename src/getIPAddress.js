const dns = require("dns");
import promisify from "./promisify";

const dnsResolve = promisify(dns.resolve);

async function getIPAddress(hostname) {
  const hostname_ip_regex = /(\[(.*)\])/;

  if (hostname_ip_regex.test(hostname)) {
    return hostname.replace("[", "").replace("]", "");
  }

  try {
    const [ip] = await dnsResolve(hostname, "A");
    return ip;
  } catch (err) {
    throw new Error("Hostname not found");
  }
}

export default getIPAddress;
