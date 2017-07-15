export default mutator => (username, hostname) => {
  const mutation = mutator(username, hostname);

  if (Array.isArray(mutation)) {
    const [new_username, new_hostname] = mutation;
    return {
      username: new_username || username,
      hostname: new_hostname || hostname
    };
  }

  if (typeof mutation === "object") {
    const { username, hostname } = mutation;
    return { username, hostname };
  }

  if (typeof mutation === "string") {
    return {
      username: mutation,
      hostname
    };
  }

  return {
    username,
    hostname
  };
};
