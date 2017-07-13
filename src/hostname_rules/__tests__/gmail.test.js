import gmail from "../gmail";

const validate = email => {
  return gmail.validate(...email.split("@"));
};

describe("gmail", () => {
  describe("hostname match", () => {
    it("should match @gmail.com accounts", () => {
      expect(gmail.hostname.test("test@gmail.com")).toBe(true);
    });

    it("should match @googlemail.com accounts", () => {
      expect(gmail.hostname.test("test@googlemail.com")).toBe(true);
    });

    it("should not match other @ accounts", () => {
      expect(gmail.hostname.test("test@example.com")).toBe(false);
    });
  });

  describe("validate", () => {
    describe("valid email addresses", () => {
      it("should work with simple gmail accounts", () => {
        expect(validate("example@gmail.com")).toBe(true);
      });

      it("should work with gmail accounts of length 6", () => {
        expect(validate("abcdef@gmail.com")).toBe(true);
      });

      it("should work with gmail accounts of length 30", () => {
        expect(validate("abcdefghijklmnopqrstuvwxyzabcd@gmail.com")).toBe(true);
      });

      it("should ignore + signs, and only validate the first part", () => {
        expect(validate("example+of+an+email+address@gmail.com")).toBe(true);
      });

      it("should at least have 1 letter, if the email address has more than 8 characters", () => {
        expect(validate("123456789a@gmail.com")).toBe(true);
      });
    });

    describe("invalid email addresses", () => {
      it("should not allow usernames less than 6 characters", () => {
        expect(validate("test@gmail.com")).toBe(false);
      });

      it("should not allow usernames less than 6 characters even if you have + signs", () => {
        expect(validate("test+of+an+email+address@gmail.com")).toBe(false);
      });

      it("should not allow usernames more than 30 characters", () => {
        expect(
          validate("this.is.clearly.more.than.30.characters_long@gmail.com")
        ).toBe(false);
      });

      it("should not allow consecutive periods", () => {
        expect(validate("exa..mple@gmail.com")).toBe(false);
      });

      it("should at least have 1 letter, if the email address has more than 8 characters", () => {
        expect(validate("123456789@gmail.com")).toBe(false);
      });

      describe("invalid characters (only allows letters, numbers and periods)", () => {
        it("should not allow hashtags", () => {
          expect(validate("ex#mple@gmail.com")).toBe(false);
        });

        it("should not allow underscores", () => {
          expect(validate("ex_ample@gmail.com")).toBe(false);
        });

        it("should not allow dashes", () => {
          expect(validate("ex-ample@gmail.com")).toBe(false);
        });
      });
    });
  });
});
