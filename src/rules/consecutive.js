export default character => input => {
  if (character === undefined) {
    return;
  }

  if (input.includes(character.repeat(2))) {
    return true;
  }
};
