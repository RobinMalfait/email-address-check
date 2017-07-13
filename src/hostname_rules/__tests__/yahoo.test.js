import yahoo from "../yahoo";

const validate = email => {
  return yahoo.validate(...email.split("@"));
};

describe("yahoo", () => {
  describe("hostname match", () => {
    it("should match @yahoo.com accounts", () => {
      expect(yahoo.hostname.test("test@yahoo.com")).toBe(true);
    });

    it("should match @yahoo.fr accounts", () => {
      expect(yahoo.hostname.test("test@yahoo.fr")).toBe(true);
    });

    it("should not match other @ accounts", () => {
      expect(yahoo.hostname.test("test@example.com")).toBe(false);
    });
  });

  describe("validate", () => {
    describe("valid email addresses", () => {
      it("should work with simple yahoo accounts", () => {
        expect(validate("example@yahoo.com")).toBe(true);
      });

      it("should work with yahoo accounts of length 4", () => {
        expect(validate("abcd@yahoo.com")).toBe(true);
      });

      it("should work with yahoo accounts of length 32", () => {
        expect(validate("abcdefghijklmnopqrstuvwxyzabcdef@yahoo.com")).toBe(
          true
        );
      });
    });

    describe("invalid email addresses", () => {
      it("should not allow usernames less than 4 characters", () => {
        expect(validate("tst@yahoo.com")).toBe(false);
      });

      it("should not allow usernames more than 32 characters", () => {
        expect(
          validate("this_is_clearly_more_than_32_characters_long@yahoo.com")
        ).toBe(false);
      });

      it("should not allow consecutive periods", () => {
        expect(validate("exa..mple@yahoo.com")).toBe(false);
      });

      it("should not allow consecutive underscores", () => {
        expect(validate("exa__mple@yahoo.com")).toBe(false);
      });

      it("should not allow a period after an underscore", () => {
        expect(validate("exa_.mple@yahoo.com")).toBe(false);
      });

      it("should not allow an underscore after a period", () => {
        expect(validate("exa._mple@yahoo.com")).toBe(false);
      });

      it("should at least start with a letter", () => {
        expect(validate("123456789@yahoo.com")).toBe(false);
      });

      describe("invalid characters (only allows letters, numbers, periods and underscores)", () => {
        it("should not allow hashtags", () => {
          expect(validate("ex#mple@yahoo.com")).toBe(false);
        });

        it("should not allow + signs", () => {
          expect(validate("ex+ample@yahoo.com")).toBe(false);
        });

        it("should not allow dashes", () => {
          expect(validate("ex-ample@yahoo.com")).toBe(false);
        });
      });
    });
  });
});
