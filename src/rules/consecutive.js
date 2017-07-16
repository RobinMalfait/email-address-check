export default character => input => {
  if (character !== undefined && input.includes(character.repeat(2))) {
    return true;
  }
};
