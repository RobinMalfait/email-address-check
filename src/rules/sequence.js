export default sequence => input => {
  if (sequence !== undefined && input.includes(sequence)) {
    return true;
  }
};
