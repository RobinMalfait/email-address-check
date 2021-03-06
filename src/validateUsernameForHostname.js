import ruler from "./rules/ruler";
import hostname_specific_rules from "./hostname_rules";

export default function validateUsernameForHostname(username, hostname) {
  return hostname_specific_rules.every(rule => {
    if (rule.hostname.test(hostname)) {
      return ruler(rule.validate)(username, hostname);
    }

    return true;
  });
}
