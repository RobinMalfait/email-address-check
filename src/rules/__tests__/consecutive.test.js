import consecutive from "../consecutive";

describe("consecutive", () => {
  it("should return undefined if no character was provided", () => {
    expect(consecutive()("example")).toBe(undefined);
  });

  it("should return undefined if everything is good", () => {
    expect(consecutive(".")("example")).toBe(undefined);
  });

  it("should succeed when it has two dots", () => {
    expect(consecutive(".")("ex..ample")).toBe(true);
  });

  it("should succeed when it has three dots", () => {
    expect(consecutive(".")("ex...ample")).toBe(true);
  });
});
