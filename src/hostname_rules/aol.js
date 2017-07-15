import {
  between,
  consecutive,
  disallow,
  existsOf,
  sequence,
  startsWithLetter
} from "../rules";

const validator = {
  name: "aol",
  hostname: /aol\.(com|[a-z]{2})/i,
  validate: [
    // AOL only wants usernames in the range of [3, 32[
    between(3, 32),

    // AOL only allows letters, numbers, periods and underscores
    existsOf(/[a-z0-9._]+/),

    // AOL does not allow consecutive periods ..
    disallow(consecutive(".")),

    // AOL does not allow consecutive underscores __
    disallow(consecutive("_")),

    // AOL does not allow a period after an underscore _.
    disallow(sequence("_.")),

    // AOL does not allow an underscore after a period ._
    disallow(sequence("._")),

    // AOL wants the email address to start with a letter
    startsWithLetter()
  ]
};

export default validator;
