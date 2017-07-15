import startsWithLetter from "../startsWithLetter";

describe("startsWithLetter", () => {
  it("should return undefined if everything is good", () => {
    expect(startsWithLetter()("example")).toBe(undefined);
  });

  it("should fail if it does not start with a letter", () => {
    expect(startsWithLetter()("123abc")).toBe(false);
  });
});
