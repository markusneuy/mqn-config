
const types = new Map([
  ['integer', (value) => parseInt(value, 10)],
  ['number', (value) => parseFloat(value, 10)],
  ['boolean', (value) => value === 'true'],
]);

const {
  setProperty,
  getProperty,
  getPropertyPath,
} = require('../util/propertyAccess');

const cast = (config, errors) => errors
  .filter(({ keyword }) => keyword === 'type')
  .map(({ dataPath, params: { type } }) => ({ dataPath, type }))
  .reduce((prev, { dataPath, type }) => {
    const propertyPath = getPropertyPath(dataPath);

    const value = getProperty(config, propertyPath);
    const caster = types.get(type);
    if (value !== undefined && caster) {
      const castedValue = caster(value);

      return setProperty(prev, castedValue, propertyPath);
    }
    return prev;
  }, config);

module.exports = { cast };
