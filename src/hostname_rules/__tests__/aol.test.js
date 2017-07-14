import aol from "../aol";

const validate = email => {
  return aol.validate(...email.split("@"));
};

describe("aol", () => {
  describe("hostname match", () => {
    it("should match @aol.com accounts", () => {
      expect(aol.hostname.test("test@aol.com")).toBe(true);
    });

    it("should match @aol.fr accounts", () => {
      expect(aol.hostname.test("test@aol.fr")).toBe(true);
    });

    it("should not match other @ accounts", () => {
      expect(aol.hostname.test("test@example.com")).toBe(false);
    });
  });

  describe("validate", () => {
    describe("valid email addresses", () => {
      it("should work with simple aol accounts", () => {
        expect(validate("example@aol.com")).toBe(true);
      });

      it("should work with aol accounts of length 3", () => {
        expect(validate("abc@aol.com")).toBe(true);
      });

      it("should work with aol accounts of length 32", () => {
        expect(validate("abcdefghijklmnopqrstuvwxyzabcdef@aol.com")).toBe(true);
      });
    });

    describe("invalid email addresses", () => {
      it("should not allow usernames less than 3 characters", () => {
        expect(validate("ab@aol.com")).toBe(false);
      });

      it("should not allow usernames more than 32 characters", () => {
        expect(
          validate("this.is.clearly.more.than.32.characters_long@aol.com")
        ).toBe(false);
      });

      it("should not allow consecutive periods", () => {
        expect(validate("exa..mple@aol.com")).toBe(false);
      });

      it("should not allow consecutive underscores", () => {
        expect(validate("exa__mple@aol.com")).toBe(false);
      });

      it("should not allow a period after an underscore", () => {
        expect(validate("exa_.mple@aol.com")).toBe(false);
      });

      it("should not allow an underscore after a period", () => {
        expect(validate("exa._mple@aol.com")).toBe(false);
      });

      it("should at least start with a letter", () => {
        expect(validate("123456789@aol.com")).toBe(false);
      });

      describe("invalid characters (only allows letters, numbers and periods)", () => {
        it("should not allow hashtags", () => {
          expect(validate("ex#mple@aol.com")).toBe(false);
        });

        it("should not allow dashes", () => {
          expect(validate("ex-ample@aol.com")).toBe(false);
        });
      });
    });
  });
});
