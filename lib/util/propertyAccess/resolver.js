const resolver = (property) => {
  if (Array.isArray(property)) {
    return property;
  }

  if (typeof property === 'string') {
    return property.replace(/^\.*/, '').split('.');
  }

  if (typeof property === 'number') {
    return [property];
  }
  return undefined;
};

module.exports = resolver;
