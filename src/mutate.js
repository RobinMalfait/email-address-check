function mutate(mutator) {
  return (...input) => mutator(...input);
}

export default mutate;
