const validator = {
  name: "hotmail",
  hostname: /(hotmail|outlook)\.(com|[a-z]{2})/i,
  validate(username) {
    // Hotmail wants the username in the range of [1, 64[
    if (username.length < 1 || username.length > 64) {
      return false;
    }

    // Hotmail wants the username to start with a letter
    const is_letter_regex = /[a-z]/;
    if (!is_letter_regex.test(username.charAt(0))) {
      return false;
    }

    // Hotmail only allows letters, numbers, periods, underscores and dashes
    const valid_regex = /[a-z0-9._-]+/;
    const [match] = username.match(valid_regex);
    if (match !== username) {
      return false;
    }

    // Hotmail does not allow consecutive periods
    const consecutive_periods_regex = /\.{2,}/;
    if (consecutive_periods_regex.test(username)) {
      return false;
    }

    // Probably valid
    return true;
  }
};

export default validator;
