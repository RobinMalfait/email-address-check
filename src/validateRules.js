function validateRules(rules) {
  return async input => {
    for (let i = 0; i < rules.length; i++) {
      const value = await rules[i](input);

      // Early return
      if (value === true) {
        return true;
      }

      // It's a mutator!
      if (value !== undefined) {
        input = value;
      }
    }
  };
}

export default validateRules;
