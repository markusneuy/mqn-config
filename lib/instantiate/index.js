const Config = require('./Config');

const recurseInstantiate = (config) => {
  const result = {};

  for (const [key, value] of Object.entries(config)) {
    if (Array.isArray(value)) {
      result[key] = Object.freeze(value);
    } else if (typeof value === 'object') {
      const frozenTree = recurseInstantiate(value);
      const configClass = new Config(frozenTree);

      result[key] = Object.freeze(configClass);
    } else {
      result[key] = value;
    }
  }
  return result;
};

const instantiate = (config) => {
  const preparedConfig = recurseInstantiate(config);

  const resultConfig = new Config(preparedConfig);

  Object.preventExtensions(resultConfig);
  Object.freeze(resultConfig);

  return resultConfig;
};

module.exports = instantiate;
