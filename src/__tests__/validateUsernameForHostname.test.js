import validateUsernameForHostname from "../validateUsernameForHostname";

const validate = email => {
  return validateUsernameForHostname(...email.split("@"));
};

describe("validateUsernameForHostname", () => {
  it("should bypass hostnames that do not have a specific ruleset", () => {
    expect(validate("example@example.com")).toBe(true);
  });

  it("should run through the validator if the hostname has rules", () => {
    expect(validate("example@gmail.com")).toBe(true);
  });

  it("should error when one of the rules is not met", () => {
    expect(validate("test@gmail.com")).toBe(false);
  });
});
