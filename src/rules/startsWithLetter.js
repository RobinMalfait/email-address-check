export default () => input => {
  const starts_with_letter_regex = /^[a-z]/;

  if (!starts_with_letter_regex.test(input)) {
    return false;
  }
};
