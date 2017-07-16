import errorIf from "../errorIf";

describe("errorIf", () => {
  it("should throw an error, when the predicate condition is true", () => {
    const errorFn = errorIf(true, "the actual error message");

    return expect(errorFn("some input value")).rejects.toMatchSnapshot();
  });

  it("should throw an error, when the predicate condition is fn that resolves to true", () => {
    const errorFn = errorIf(() => true, "the actual error message");

    return expect(errorFn("some input value")).rejects.toMatchSnapshot();
  });

  it("should throw an error, when the predicate already throws an error", () => {
    const errorFn = errorIf(() => {
      throw new Error("An error in the condition");
    }, "the actual error message");

    return expect(errorFn("some input value")).rejects.toMatchSnapshot();
  });

  it("should throw an error, ", () => {
    const errorFn = errorIf(true, () => "the actual error message");

    return expect(errorFn("some input value")).rejects.toMatchSnapshot();
  });
});
