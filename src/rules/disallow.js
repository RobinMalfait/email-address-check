export default rule => (...input) => {
  const result = rule(...input);

  if (result === true) {
    return false;
  }

  if (result === false) {
    return true;
  }

  return result;
};
