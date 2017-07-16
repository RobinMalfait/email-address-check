import validateEmail from "./validateEmail";
import nextTickify from "./nextTickify";

export const validate = nextTickify(validateEmail);

export default {
  validate
};
