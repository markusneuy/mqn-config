const getter = (object, property) => {
  const [name, ...rest] = property;
  const value = object[name];

  if (rest.length === 0) {
    return value;
  }

  if (value === null || typeof value !== 'object') {
    return undefined;
  }

  return getter(value, rest);
};

module.exports = getter;
