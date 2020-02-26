const { getEnvVariable } = require('../util/environment');

const resolveEnvVariables = (config) => {
  if (typeof config === 'string') {
    return getEnvVariable(config);
  }

  if (Array.isArray(config)) {
    return config.map((value) => resolveEnvVariables(value));
  }

  if (typeof config === 'object') {
    const result = {};

    for (const [key, value] of Object.entries(config)) {
      result[key] = resolveEnvVariables(value);
    }
    return result;
  }

  return undefined;
};

const resolveConfigs = (configs) => configs.map(({ name, content }) => {
  if (name === 'env') {
    return resolveEnvVariables(content);
  }
  return content;
});

module.exports = { resolveConfigs };
