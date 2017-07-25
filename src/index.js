import validateEmail from "./validateEmail";
import isBlacklistedEmail from "./isBlacklisted";
import nextTickify from "./nextTickify";

export const validate = nextTickify(validateEmail);
export const isBlacklisted = nextTickify(isBlacklistedEmail);

export default {
  validate,
  isBlacklisted
};
