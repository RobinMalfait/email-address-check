import {
  between,
  existsOf,
  consecutive,
  sequence,
  disallow,
  startsWithLetter
} from "../rules";

const validator = {
  name: "yahoo",
  hostname: /yahoo\.(com|[a-z]{2})/i,
  validate: [
    // Yahoo wants the username in the range of [4, 32[
    between(4, 32),

    // Yahoo wants the username to start with a letter
    startsWithLetter(),

    // Yahoo only allows letters, numbers, periods and underscores
    existsOf(/[a-z0-9._]+/),

    // Yahoo does not allow consecutive periods ..
    disallow(consecutive(".")),

    // Yahoo does not allow consecutive underscores __
    disallow(consecutive("_")),

    // Yahoo does not allow a period after an underscore _.
    disallow(sequence("_.")),

    // Yahoo does not allow an underscore after a period ._
    disallow(sequence("._"))
  ]
};

export default validator;
