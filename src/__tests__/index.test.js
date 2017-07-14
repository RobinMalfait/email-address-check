import validate from "../index";

describe("validator", () => {
  it("should error when not specifiying an email", () => {
    return expect(validate()).rejects.toMatchSnapshot();
  });

  it("should error when specifiying value null", () => {
    return expect(validate(null)).rejects.toMatchSnapshot();
  });

  it("should error when specifiying value true", () => {
    return expect(validate(true)).rejects.toMatchSnapshot();
  });

  it("should error when specifiying value false", () => {
    return expect(validate(false)).rejects.toMatchSnapshot();
  });

  it("should error when specifiying value 5", () => {
    return expect(validate(5)).rejects.toMatchSnapshot();
  });

  it("should error when specifiying value () => {}", () => {
    return expect(validate(() => {})).rejects.toMatchSnapshot();
  });

  it("should error when specifiying value {}", () => {
    return expect(validate({})).rejects.toMatchSnapshot();
  });

  it("should error when specifiying value []", () => {
    return expect(validate([])).rejects.toMatchSnapshot();
  });

  it("should error when passing an invalid email syntax", () => {
    return expect(validate("@gmail.com")).rejects.toMatchSnapshot();
  });

  it("should error when passing an invalid syntax for a specific host", () => {
    return expect(validate("ab@gmail.com")).rejects.toMatchSnapshot();
  });

  it("should error when no dns records are found", () => {
    return expect(validate("example@example.com")).rejects.toMatchSnapshot();
  });

  it("should validate an email address", () => {
    return expect(validate("example@gmail.com")).resolves.toMatchSnapshot();
  });

  it("should decode uri parts before validating an email address", () => {
    return expect(
      validate("example%20%20@gmail.com")
    ).rejects.toMatchSnapshot();
  });
});
