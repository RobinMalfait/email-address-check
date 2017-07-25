import isBlacklisted from "../isBlacklisted";

describe("isBlacklisted", () => {
  it("should mark the email as blacklisted", () => {
    return expect(
      isBlacklisted("example@[98.150.108.228]")
    ).resolves.toMatchSnapshot();
  });
});
