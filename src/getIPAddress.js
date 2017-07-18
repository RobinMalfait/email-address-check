const dns = require("dns");
import promisify from "./promisify";

const dnsResolve = promisify(dns.resolve);

async function getIPAddress(hostname) {
  const hostname_ip_regex = /(\[(.*)\])/;

  if (hostname_ip_regex.test(hostname)) {
    return hostname.replace("[", "").replace("]", "");
  }

  const [ip] = await dnsResolve(hostname, "A");
  return ip;
}

export default getIPAddress;
