import { between, existsOf } from "../rules";

const validator = {
  name: "skynet",
  hostname: /Skynet\.(com|[a-z]{2})/i,
  validate: [
    // Skynet only wants usernames in the range of [3, 26[
    between(3, 26),

    // Skynet only allows letters, numbers, periods, dashes and underscores
    existsOf(/[a-z0-9._-]+/)
  ]
};

export default validator;
