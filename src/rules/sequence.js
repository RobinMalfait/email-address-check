export default sequence => input => {
  if (sequence === undefined) {
    return;
  }

  if (input.includes(sequence)) {
    return true;
  }
};
