import { between, existsOf, consecutive, disallow, mutate } from "../rules";

const validator = {
  name: "gmail",
  hostname: /g(oogle)?mail\.com/i,
  validate: [
    // Gmail will ignore everything after the + sign
    mutate(username => username.split("+")[0]),

    // Gmail only wants usernames in the range of [6, 30[
    between(6, 30),

    // Gmail only allows letters, numbers and periods
    existsOf(/[a-z0-9.]+/),

    // Gmail does not allow consecutive periods
    disallow(consecutive(".")),

    // Gmail wants at least 1 letter if you have more than 8 characters
    (username, hostname) => {
      const has_one_letter_regex = /[a-z]/;
      if (username.length > 8 && !has_one_letter_regex.test(username)) {
        return false;
      }
    }
  ]
};

export default validator;
