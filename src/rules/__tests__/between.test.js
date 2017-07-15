import between from "../between";

describe("between", () => {
  it("should return undefined if everything is good", () => {
    expect(between()("example")).toBe(undefined);
  });

  it("should return false when there are less than min characters", () => {
    expect(between(3)("ab")).toBe(false);
  });

  it("should return false when there are more than max characters", () => {
    expect(between(0, 2)("abc")).toBe(false);
  });
});
