import validateRules from "../validateRules";
import mutate from "../mutate";

describe("validateRules", () => {
  it("should early return when a rule returns true", () => {
    let count = 0;
    const rules = [
      () => {
        count++;
        return;
      },
      () => {
        count++;
        return true;
      },
      () => {
        count++;
        return;
      }
    ];

    return validateRules(rules)("some input").then(result => {
      expect(count).toEqual(2);
      expect(result).toMatchSnapshot();
    });
  });

  it("should mutate the input if a mutator is defined", () => {
    const rules = [
      mutate(input => "my new input"),
      new_input => {
        throw new Error(new_input);
      }
    ];

    return expect(validateRules(rules)("some input")).rejects.toMatchSnapshot();
  });
});
