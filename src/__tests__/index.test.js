import index from "../index";

describe("PUBLIC API", () => {
  it("should have a validate function available", () => {
    expect(index.validate).toBeDefined();
  });
});
