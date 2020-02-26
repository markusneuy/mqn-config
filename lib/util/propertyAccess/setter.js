const setter = (object, val, property) => {
  if (
    object === null
    || object === undefined
    || typeof object !== 'object') {
    throw new Error(`Property '${property}' not found.`);
  }

  if (property.length === 1) {
    return {
      ...object,
      [property]: val,
    };
  }

  const [name, ...rest] = property;
  const next = object[name];

  return {
    ...object,
    [name]: setter(next, val, rest),
  };
};

module.exports = setter;
