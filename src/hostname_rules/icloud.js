const validator = {
  name: "icloud",
  hostname: /icloud\.com/i,
  validate(username) {
    // icloud only wants usernames in the range of [6, 30[
    const length = username.length;
    if (length < 3 || length > 20) {
      return false;
    }

    // icloud only allows letters, numbers and periods
    const valid_regex = /[a-z0-9.]+/;
    const [match] = username.match(valid_regex);
    if (match !== username) {
      return false;
    }

    // icloud does not allow consecutive periods
    const consecutive_periods_regex = /\.{2,}/;
    if (consecutive_periods_regex.test(username)) {
      return false;
    }

    // icloud wants the email to start with a letter
    const has_one_letter_regex = /^[a-z]/;
    if (!has_one_letter_regex.test(username)) {
      return false;
    }

    // Probably valid
    return true;
  }
};

export default validator;
