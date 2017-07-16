function errorIf(predicate, msg) {
  return async input => {
    // Resolve the error message
    if (typeof msg === "function") {
      msg = msg(input);
    }

    // Resolve the predicate
    if (typeof predicate === "function") {
      try {
        predicate = await predicate(input);
      } catch (err) {
        throw new Error(msg);
      }
    }

    // If the predicate is true, throw an error
    if (predicate) {
      throw new Error(msg);
    }
  };
}

export default errorIf;
