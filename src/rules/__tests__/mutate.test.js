import mutate from "../mutate";

describe("mutate", () => {
  it("should mutate the username, if a string is returned", () => {
    expect(
      mutate((username, hostname) => "new username")(
        "old username",
        "old hostname"
      )
    ).toEqual({
      username: "new username",
      hostname: "old hostname"
    });
  });

  it("should mutate nothing if an empty array is returned", () => {
    expect(
      mutate((username, hostname) => [])("old username", "old hostname")
    ).toEqual({
      username: "old username",
      hostname: "old hostname"
    });
  });

  it("should mutate the username if an array is returned with 1 value", () => {
    expect(
      mutate((username, hostname) => ["new username"])(
        "old username",
        "old hostname"
      )
    ).toEqual({
      username: "new username",
      hostname: "old hostname"
    });
  });

  it("should mutate the username and hostname if an array is returned with 2 values", () => {
    expect(
      mutate((username, hostname) => ["new username", "new hostname"])(
        "old username",
        "old hostname"
      )
    ).toEqual({
      username: "new username",
      hostname: "new hostname"
    });
  });

  it("should mutate the username and hostname if an object with new values is provided", () => {
    expect(
      mutate((username, hostname) => ({
        username: "new username",
        hostname: "new hostname"
      }))("old username", "old hostname")
    ).toEqual({
      username: "new username",
      hostname: "new hostname"
    });
  });

  it("should not mutate if undefined is returned", () => {
    expect(
      mutate((username, hostname) => undefined)("old username", "old hostname")
    ).toEqual({
      username: "old username",
      hostname: "old hostname"
    });
  });
});
