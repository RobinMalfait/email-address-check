import promsifiy from "../promisify";

it("should convert a function with a callback as last param to a promise", () => {
  const fn = (a, b, cb) => {
    cb(a, b);
  };

  const fnPromisified = promsifiy(fn);

  expect(fnPromisified).toBeDefined;
  expect(fnPromisified).toBeInstanceOf(Function);
  expect(fnPromisified("1", "2").catch(() => {})).toBeInstanceOf(Promise);
});

it("should reject if there is an error", () => {
  const fn = (errorVariable, otherVariable, cb) => {
    cb(errorVariable, otherVariable);
  };

  const fnPromisified = promsifiy(fn);

  fnPromisified(Error("This is an error")).catch(err => {
    expect(err).toBeInstanceOf(Error);
  });
});

it("should resolve if there is no error", () => {
  const fn = (errorVariable, otherVariable, cb) => {
    cb(errorVariable, otherVariable);
  };

  const fnPromisified = promsifiy(fn);

  fnPromisified(undefined, "this is being resolved").then(data => {
    expect(data).toBe("this is being resolved");
  });
});

it("should resolve if there is no error, and the callback accepts more params", () => {
  const fn = (errorVariable, otherVariable, cb) => {
    cb(errorVariable, otherVariable, otherVariable);
  };

  const fnPromisified = promsifiy(fn);

  fnPromisified(undefined, "this is being resolved").then(data => {
    expect(data).toBeInstanceOf(Array);

    expect(data[0]).toBe("this is being resolved");
    expect(data[1]).toBe("this is being resolved");
  });
});
