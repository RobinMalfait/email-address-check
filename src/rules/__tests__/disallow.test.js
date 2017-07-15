import disallow from "../disallow";

describe("disallow", () => {
  it("should negate false values to true", () => {
    expect(disallow(() => false)()).toBe(true);
  });

  it("should negate true values to false", () => {
    expect(disallow(() => true)()).toBe(false);
  });

  it("should ignore object values", () => {
    const obj = {
      some: "object"
    };

    expect(disallow(() => obj)()).toBe(obj);
  });

  it("should ignore undefined values", () => {
    const obj = undefined;

    expect(disallow(() => obj)()).toBe(obj);
  });

  it("should ignore string values", () => {
    const obj = "abc";

    expect(disallow(() => obj)()).toBe(obj);
  });

  it("should ignore number values", () => {
    const obj = 123;

    expect(disallow(() => obj)()).toBe(obj);
  });

  it("should ignore array values", () => {
    const obj = [];

    expect(disallow(() => obj)()).toBe(obj);
  });
});
