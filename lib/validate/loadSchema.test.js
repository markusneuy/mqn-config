const fs = require('fs');
const path = require('path');

jest.mock('fs');

describe('util', () => {
  describe('validate', () => {
    describe('load schema', () => {
      const oldEnv = process.env;
      let getValidationFile;
      let compileSchema;
      let loadSchema;

      beforeEach(() => {
        jest.isolateModules(() => {
          ({
            getValidationFile,
            compileSchema,
            loadSchema,
          } = require('./loadSchema')); // eslint-disable-line global-require
        });

        process.env = { ...oldEnv };
        delete process.env.NODE_CONFIG_DIR;

        fs.readFileSync.mockReset();
      });

      afterEach(() => {
        process.env = oldEnv;
      });

      describe('getValidationFile', () => {
        it('should load the validation file from the config directory if nothing else is specified', () => {
          process.env.NODE_CONFIG_DIR = '';

          const expectedSchemaFilePath = path.normalize('config/schema.json');
          fs.readFileSync.mockReturnValue('{}');

          getValidationFile();

          expect(fs.readFileSync).toHaveBeenCalledTimes(1);
          expect(fs.readFileSync).toHaveBeenCalledWith(expectedSchemaFilePath, 'utf8');
        });

        it('should load the validation file from the config directory in the environment variables', () => {
          process.env.NODE_CONFIG_DIR = 'test/folder';

          const expectedSchemaFilePath = path.normalize('test/folder/schema.json');
          fs.readFileSync.mockReturnValue('{}');

          getValidationFile();

          expect(fs.readFileSync).toHaveBeenCalledTimes(1);
          expect(fs.readFileSync).toHaveBeenCalledWith(expectedSchemaFilePath, 'utf8');
        });

        it('should return the loaded schema as javascript object', () => {
          fs.readFileSync.mockReturnValue('{ "test": "value" }');
          const expectedResult = { test: 'value' };

          const result = getValidationFile();

          expect(result).toEqual(expectedResult);
        });

        it('should throw an error in case the file could not be loaded', () => {
          process.env.NODE_CONFIG_DIR = '';
          fs.readFileSync.mockImplementation(() => {
            throw new Error('some error');
          });
          const filePath = path.normalize('config/schema.json');
          const expectedErrorMessage = `Loading and parsing the following schema file did not work: '${filePath}'`;

          expect(getValidationFile).toThrow(new Error(expectedErrorMessage));
        });

        it('should throw an error in case the file content is not a valid json string', () => {
          process.env.NODE_CONFIG_DIR = '';
          fs.readFileSync.mockReturnValue('no json string');
          const filePath = path.normalize('config/schema.json');
          const expectedErrorMessage = `Loading and parsing the following schema file did not work: '${filePath}'`;

          expect(getValidationFile).toThrow(new Error(expectedErrorMessage));
        });
      });

      describe('compileSchema', () => {
        it('should return a validator with a validate function if valid JSON schema is provided', () => {
          const schema = { properties: { test: { type: 'string' } } };

          const result = compileSchema(schema);

          expect(result).toEqual(expect.any(Function));
        });

        it('should throw an error in case the schema is not a valid JSON schema', () => {
          const schema = { properties: { test: { type: 'INVALID' } } };

          expect(() => compileSchema(schema)).toThrowError();
        });
      });

      describe('loadSchema', () => {
        it('should return a validator with a validate function if valid JSON schema is provided', () => {
          fs.readFileSync.mockReturnValue('{"properties":{"test":{"type":"string"}}}');

          const result = loadSchema();

          expect(result).toEqual(expect.any(Function));
        });

        it('should throw an error in case the schema is not a valid JSON schema', () => {
          fs.readFileSync.mockReturnValue('{"properties":{"test":{"type":"INVALID"}}}');


          expect(() => loadSchema()).toThrowError();
        });
      });
    });
  });
});
