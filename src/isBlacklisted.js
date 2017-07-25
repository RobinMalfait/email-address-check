const dnsbl = require("dnsbl");
import getIPAddress from "./getIPAddress";

async function isBlacklisted(email) {
  const [username, hostname] = email.split("@");

  try {
    const ip = await getIPAddress(hostname);
    return await dnsbl.lookup(ip, "zen.spamhaus.org");
  } catch (err) {
    return false;
  }
}

export default isBlacklisted;
