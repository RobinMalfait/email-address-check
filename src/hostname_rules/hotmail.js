import {
  between,
  existsOf,
  consecutive,
  disallow,
  startsWithLetter
} from "../rules";

const validator = {
  name: "hotmail",
  hostname: /(hotmail|outlook)\.(com|[a-z]{2})/i,
  validate: [
    // Hotmail wants the username in the range of [1, 64[
    between(1, 64),

    // Hotmail wants the username to start with a letter
    startsWithLetter(),

    // Hotmail only allows letters, numbers, periods, underscores and dashes
    existsOf(/[a-z0-9._-]+/),

    // Hotmail does not allow consecutive periods
    disallow(consecutive("."))
  ]
};

export default validator;
