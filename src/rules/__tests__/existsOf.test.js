import existsOf from "../existsOf";

describe("existsOf", () => {
  it("should return undefined if no regex is provided", () => {
    expect(existsOf()("example")).toBe(undefined);
  });

  it("should return undefined if everything is good", () => {
    expect(existsOf(/[a-z0-9._]+/)("example")).toBe(undefined);
  });

  it("should fail when it has invalid characters", () => {
    expect(existsOf(/[a-z0-9._]+/)("ABC-")).toBe(false);
  });
});
