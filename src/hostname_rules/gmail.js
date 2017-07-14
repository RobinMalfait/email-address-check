const validator = {
  name: "gmail",
  hostname: /g(oogle)?mail\.com/i,
  validate(username) {
    // Gmail will ignore everything after the + sign
    const username_to_validate = username.split("+")[0];

    // Gmail only wants usernames in the range of [6, 30[
    const length = username_to_validate.length;
    if (length < 6 || length > 30) {
      return false;
    }

    // Gmail only allows letters, numbers and periods
    const valid_regex = /[a-z0-9.]+/;
    const [match] = username_to_validate.match(valid_regex);
    if (match !== username_to_validate) {
      return false;
    }

    // Gmail does not allow consecutive periods
    const consecutive_periods_regex = /\.{2,}/;
    if (consecutive_periods_regex.test(username_to_validate)) {
      return false;
    }

    // Gmail wants at least 1 letter if you have more than 8 characters
    const has_one_letter_regex = /[a-z]/;
    if (
      username_to_validate.length > 8 &&
      !has_one_letter_regex.test(username_to_validate)
    ) {
      return false;
    }

    // Probably valid
    return true;
  }
};

export default validator;
