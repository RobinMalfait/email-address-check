export default (min, max) => input => {
  const len = input.length;

  if (max === undefined) {
    if (len < min) {
      return false;
    }
  }

  if (len < min || len > max) {
    return false;
  }
};
