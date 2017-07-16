import getIPAddress from "../getIPAddress";

describe("getIPAddress", () => {
  it("should return the ip address if the hostname already is an ip address", () => {
    return expect(getIPAddress("[127.0.0.1]")).resolves.toMatchSnapshot();
  });

  it("should return the ip address for the hostname", () => {
    return expect(getIPAddress("example.com")).resolves.toMatchSnapshot();
  });
});
