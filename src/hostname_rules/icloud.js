import {
  between,
  existsOf,
  consecutive,
  disallow,
  startsWithLetter
} from "../rules";

const validator = {
  name: "icloud",
  hostname: /icloud\.com/i,
  validate: [
    // icloud only wants usernames in the range of [6, 30[
    between(3, 20),

    // icloud only allows letters, numbers and periods
    existsOf(/[a-z0-9.]+/),

    // icloud does not allow consecutive periods
    disallow(consecutive(".")),

    // icloud wants the email to start with a letter
    startsWithLetter()
  ]
};

export default validator;
