import nextTickify from "../nextTickify";

describe("nextTickify", () => {
  it("should resolve like a promise", () => {
    const myFn = value => value;
    const myFnNextTickified = nextTickify(myFn);

    return expect(myFnNextTickified(123)).resolves.toMatchSnapshot();
  });

  it("should reject like a promise", () => {
    const myFn = value => {
      throw new Error(value);
    };
    const myFnNextTickified = nextTickify(myFn);

    return expect(
      myFnNextTickified("this should reject")
    ).rejects.toMatchSnapshot();
  });
});
