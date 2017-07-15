import sequence from "../sequence";

describe("sequence", () => {
  it("should return undefined if no sequence is provided", () => {
    expect(sequence()("example")).toBe(undefined);
  });

  it("should return undefined if everything is good", () => {
    expect(sequence("_.")("example")).toBe(undefined);
  });

  it("should succeed when it has the specific sequence", () => {
    expect(sequence("_.")("ab_.cd")).toBe(true);
  });
});
