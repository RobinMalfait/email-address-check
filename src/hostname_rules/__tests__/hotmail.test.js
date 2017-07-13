import hotmail from "../hotmail";

const validate = email => {
  return hotmail.validate(...email.split("@"));
};

describe("hotmail", () => {
  describe("hostname match", () => {
    it("should match @hotmail.com accounts", () => {
      expect(hotmail.hostname.test("test@hotmail.com")).toBe(true);
    });

    it("should match @hotmail.fr accounts", () => {
      expect(hotmail.hostname.test("test@hotmail.fr")).toBe(true);
    });

    it("should match @outlook.com accounts", () => {
      expect(hotmail.hostname.test("test@outlook.com")).toBe(true);
    });

    it("should match @outlook.fr accounts", () => {
      expect(hotmail.hostname.test("test@outlook.fr")).toBe(true);
    });

    it("should not match other @ accounts", () => {
      expect(hotmail.hostname.test("test@example.com")).toBe(false);
    });
  });

  describe("validate", () => {
    describe("valid email addresses", () => {
      it("should work with simple hotmail accounts", () => {
        expect(validate("example@hotmail.com")).toBe(true);
      });

      it("should work with hotmail accounts of length 1", () => {
        expect(validate("a@hotmail.com")).toBe(true);
      });

      it("should work with hotmail accounts of length 32", () => {
        expect(validate("abcdefghijklmnopqrstuvwxyzabcdef@hotmail.com")).toBe(
          true
        );
      });
    });

    describe("invalid email addresses", () => {
      it("should not allow usernames less than 1 characters", () => {
        expect(validate("@hotmail.com")).toBe(false);
      });

      it("should not allow usernames more than 64 characters", () => {
        expect(
          validate(
            "this_is_clearly_more_than_64_characters_lon_or_is_it_still_good_after_this_large_weird_email@hotmail.com"
          )
        ).toBe(false);
      });

      it("should not allow consecutive periods", () => {
        expect(validate("exa..mple@hotmail.com")).toBe(false);
      });

      it("should at least start with a letter", () => {
        expect(validate("123456789@hotmail.com")).toBe(false);
      });

      describe("invalid characters (only allows letters, numbers, periods, underscores and dashes)", () => {
        it("should not allow hashtags", () => {
          expect(validate("ex#mple@hotmail.com")).toBe(false);
        });

        it("should not allow + signs", () => {
          expect(validate("ex+ample@hotmail.com")).toBe(false);
        });
      });
    });
  });
});
