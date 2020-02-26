const fs = require('fs');
const path = require('path');

const Ajv = require('ajv');

const { getEnvVariable } = require('../util/environment/getEnvVariable');

const SCHEMA_FILENAME = 'schema.json';

const getValidationFile = () => {
  const configDir = path.normalize(getEnvVariable('NODE_CONFIG_DIR', 'config'));
  const schemaFilePath = path.join(configDir, SCHEMA_FILENAME);

  try {
    const schema = fs.readFileSync(schemaFilePath, 'utf8');

    const parsedSchema = JSON.parse(schema);

    return parsedSchema;
  } catch (err) {
    throw new Error(`Loading and parsing the following schema file did not work: '${schemaFilePath}'`);
  }
};

const compileSchema = (schema) => {
  const validator = new Ajv();

  return validator.compile(schema);
};

const loadSchema = () => {
  const schema = getValidationFile();
  const validator = compileSchema(schema);

  return validator;
};

module.exports = {
  getValidationFile,
  compileSchema,
  loadSchema,
};
