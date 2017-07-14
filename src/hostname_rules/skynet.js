const validator = {
  name: "skynet",
  hostname: /Skynet\.(com|[a-z]{2})/i,
  validate(username) {
    // Skynet only wants usernames in the range of [3, 26[
    const length = username.length;
    if (length < 3 || length > 26) {
      return false;
    }

    // Skynet only allows letters, numbers, periods, dashes and underscores
    const valid_regex = /[a-z0-9._-]+/;
    const [match] = username.match(valid_regex);
    if (match !== username) {
      return false;
    }

    // Probably valid
    return true;
  }
};

export default validator;
