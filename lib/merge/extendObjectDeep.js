const extendObjectDeep = (base, partial) => {
  const result = { ...base };

  for (const [key, value] of Object.entries(partial)) {
    const baseValue = result[key];

    if (baseValue === null || baseValue === undefined) {
      result[key] = value;
    } else if (Array.isArray(value)) {
      result[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      result[key] = extendObjectDeep(baseValue, value);
    } else if (value !== undefined && value !== null) {
      result[key] = value;
    }
  }

  return result;
};

const mergeConfigs = (configs) => configs.reduce(
  (prevConfig, currentConfig) => extendObjectDeep(prevConfig, currentConfig),
  {},
);

module.exports = {
  mergeConfigs,
};
