import skynet from "../skynet";

const validate = email => {
  return skynet.validate(...email.split("@"));
};

describe("skynet", () => {
  describe("hostname match", () => {
    it("should match @skynet.com accounts", () => {
      expect(skynet.hostname.test("test@skynet.com")).toBe(true);
    });

    it("should match @skynet.fr accounts", () => {
      expect(skynet.hostname.test("test@skynet.fr")).toBe(true);
    });

    it("should not match other @ accounts", () => {
      expect(skynet.hostname.test("test@example.com")).toBe(false);
    });
  });

  describe("validate", () => {
    describe("valid email addresses", () => {
      it("should work with simple skynet accounts", () => {
        expect(validate("example@skynet.com")).toBe(true);
      });

      it("should work with skynet accounts of length 3", () => {
        expect(validate("abc@skynet.com")).toBe(true);
      });

      it("should work with skynet accounts of length 26", () => {
        expect(validate("abcdefghijklmnopqrstuvwxyz@skynet.com")).toBe(true);
      });
    });

    describe("invalid email addresses", () => {
      it("should not allow usernames less than 3 characters", () => {
        expect(validate("ab@skynet.com")).toBe(false);
      });

      it("should not allow usernames more than 26 characters", () => {
        expect(
          validate("this.is.clearly.more.than.26.characters_long@skynet.com")
        ).toBe(false);
      });

      describe("invalid characters (only allows letters, numbers and periods)", () => {
        it("should not allow hashtags", () => {
          expect(validate("ex#mple@skynet.com")).toBe(false);
        });
      });
    });
  });
});
