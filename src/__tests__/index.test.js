import validate from "../index";

describe("validator", () => {
  it("should error when not specifiying an email", () => {
    return expect(validate()).rejects.toBeDefined();
  });

  it("should error when specifiying value null", () => {
    return expect(validate(null)).rejects.toBeDefined();
  });

  it("should error when specifiying value true", () => {
    return expect(validate(true)).rejects.toBeDefined();
  });

  it("should error when specifiying value false", () => {
    return expect(validate(false)).rejects.toBeDefined();
  });

  it("should error when specifiying value 5", () => {
    return expect(validate(5)).rejects.toBeDefined();
  });

  it("should error when specifiying value () => {}", () => {
    return expect(validate(() => {})).rejects.toBeDefined();
  });

  it("should error when specifiying value {}", () => {
    return expect(validate({})).rejects.toBeDefined();
  });

  it("should error when specifiying value []", () => {
    return expect(validate([])).rejects.toBeDefined();
  });

  it("should error when passing an invalid email syntax", () => {
    return expect(validate("@gmail.com")).rejects.toBeDefined();
  });

  it("should error when passing an invalid syntax for a specific host", () => {
    return expect(validate("ab@gmail.com")).rejects.toBeDefined();
  });

  it("should error when no dns records are found", () => {
    return expect(validate("example@example.com")).rejects.toBeDefined();
  });

  it("should validate an email address", () => {
    return expect(validate("example@gmail.com")).resolves.toBeDefined();
  });
});
