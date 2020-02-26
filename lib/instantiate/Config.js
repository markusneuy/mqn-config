const {
  getProperty,
  getPropertyPath,
} = require('../util/propertyAccess');

class Config {
  constructor(config) {
    for (const [key, value] of Object.entries(config)) {
      this[key] = value;
    }
  }

  get(property) {
    const propertyPath = getPropertyPath(property);

    if (propertyPath === undefined) {
      throw new Error('Calling config.get with in invalid property path. Strings and Arrays are allowed.');
    }

    const result = getProperty(this, propertyPath);

    if (result === undefined) {
      throw new Error(`Configuration property "${property}" is not defined.`);
    }

    return result;
  }

  has(property) {
    const propertyPath = getPropertyPath(property);

    if (propertyPath === undefined) {
      return false;
    }

    return getProperty(this, propertyPath) !== undefined;
  }
}

module.exports = Config;
