import ruler from "../../rules/ruler";
import icloud from "../icloud";

const validate = email => {
  return ruler(icloud.validate)(...email.split("@"));
};

describe("icloud", () => {
  describe("hostname match", () => {
    it("should match @icloud.com accounts", () => {
      expect(icloud.hostname.test("test@icloud.com")).toBe(true);
    });

    it("should not match other @ accounts", () => {
      expect(icloud.hostname.test("test@example.com")).toBe(false);
    });
  });

  describe("validate", () => {
    describe("valid email addresses", () => {
      it("should work with simple icloud accounts", () => {
        expect(validate("example@icloud.com")).toBe(true);
      });

      it("should work with icloud accounts of length 3", () => {
        expect(validate("abcd@icloud.com")).toBe(true);
      });

      it("should work with icloud accounts of length 20", () => {
        expect(validate("abcdefghijklmnopqrst@icloud.com")).toBe(true);
      });
    });

    describe("invalid email addresses", () => {
      it("should not allow usernames less than 3 characters", () => {
        expect(validate("ab@icloud.com")).toBe(false);
      });

      it("should not allow usernames more than 20 characters", () => {
        expect(
          validate("this_is_clearly_more_than_20_characters_long@icloud.com")
        ).toBe(false);
      });

      it("should not allow consecutive periods", () => {
        expect(validate("exa..mple@icloud.com")).toBe(false);
      });

      it("should not allow consecutive underscores", () => {
        expect(validate("exa__mple@icloud.com")).toBe(false);
      });

      it("should at least start with a letter", () => {
        expect(validate("123456789@icloud.com")).toBe(false);
      });

      describe("invalid characters (only allows letters, numbers, periods and underscores)", () => {
        it("should not allow hashtags", () => {
          expect(validate("ex#mple@icloud.com")).toBe(false);
        });

        it("should not allow + signs", () => {
          expect(validate("ex+ample@icloud.com")).toBe(false);
        });

        it("should not allow dashes", () => {
          expect(validate("ex-ample@icloud.com")).toBe(false);
        });
      });
    });
  });
});
