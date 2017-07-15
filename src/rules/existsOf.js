export default regex => input => {
  if (!(regex instanceof RegExp)) {
    return;
  }

  if (!regex.test(input)) {
    return false;
  }

  const [match] = input.match(regex);
  if (match !== input) {
    return false;
  }
};
