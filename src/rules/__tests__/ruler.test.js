import ruler from "../ruler";

describe("ruler", () => {
  it("should result in true when there are no rules", () => {
    expect(ruler()("example", "gmail.com")).toBe(true);
  });

  it("should return false, once one of the rules is false", () => {
    expect(
      ruler([
        () => true,
        () => true,
        () => true,
        () => true,
        () => false,
        () => false
      ])("example", "gmail.com")
    ).toBe(false);
  });

  it("should stay false, once one of the rules is false and then some rule is true again", () => {
    expect(
      ruler([
        () => true,
        () => true,
        () => true,
        () => true,
        () => false,
        () => true
      ])("example", "gmail.com")
    ).toBe(false);
  });

  it("should not invoke other rules once one fails", () => {
    let count = 0;

    ruler([
      () => {
        count++;
        return true;
      },
      () => {
        count++;
        return false;
      },
      () => {
        count++;
        return true;
      }
    ])("example", "gmail.com");

    expect(count).toBe(2);
  });
});
