const { cast } = require('./cast');
const { loadSchema } = require('./loadSchema');

const testValid = (validate, config) => {
  const isValid = validate(config);

  return {
    isValid,
    errors: validate.errors,
  };
};

const validate = (config) => {
  const checkValid = loadSchema();

  const {
    isValid,
    errors,
  } = testValid(checkValid, config);

  if (isValid) {
    return config;
  }

  const casted = cast(config, errors);

  const {
    isValid: isValidCasted,
    errors: remainingError,
  } = testValid(checkValid, casted);

  if (!isValidCasted) {
    throw new Error(`The config does not match the provided schema.\n${JSON.stringify(remainingError)}`);
  }

  return casted;
};

module.exports = { validate };
