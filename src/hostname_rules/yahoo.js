const validator = {
  name: "yahoo",
  hostname: /yahoo\.(com|[a-z]{2})/i,
  validate(username) {
    // Yahoo wants the username in the range of [4, 32[
    if (username.length < 4 || username.length > 32) {
      return false;
    }

    // Yahoo wants the username to start with a letter
    const is_letter_regex = /[a-z]/;
    if (!is_letter_regex.test(username.charAt(0))) {
      return false;
    }

    // Yahoo only allows letters, numbers, periods and underscores
    const valid_regex = /[a-z0-9._]+/;
    const [match] = username.match(valid_regex);
    if (match !== username) {
      return false;
    }

    // Yahoo does not allow consecutive periods and underscores [invalids eg.:.. __ _. ._]
    //  Consecutive periods ..
    const consecutive_periods_regex = /\.{2,}/;
    if (consecutive_periods_regex.test(username)) {
      return false;
    }

    //  Consecutive underscores __
    const consecutive_underscores_regex = /\_{2,}/;
    if (consecutive_underscores_regex.test(username)) {
      return false;
    }

    //  Period after underscore _.
    const period_after_underscore_regex = /\_\./;
    if (period_after_underscore_regex.test(username)) {
      return false;
    }

    //  Underscore after period ._
    const underscore_after_period_regex = /\.\_/;
    if (underscore_after_period_regex.test(username)) {
      return false;
    }

    // Probably valid
    return true;
  }
};

export default validator;
