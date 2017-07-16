import mutate from "../mutate";

describe("mutate", () => {
  it("should mutate a given input to an output using a mutator function", () => {
    const input = "abc";
    const output = "abcabcabc";

    const mutator = input => input.repeat(3);

    expect(mutate(mutator)(input)).toEqual(output);
  });
});
