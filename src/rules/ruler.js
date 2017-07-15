export default (rules = []) => (username, hostname) => {
  return rules.reduce((result, rule) => {
    if (!result) {
      return result;
    }

    const rule_result = rule(username, hostname);

    if (typeof rule_result === "object") {
      const { username: new_username, hostname: new_hostname } = rule_result;

      username = new_username;
      hostname = new_hostname;

      return result;
    }

    if (rule_result === false) {
      return false;
    }

    return result;
  }, true);
};
