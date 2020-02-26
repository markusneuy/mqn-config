
const Config = require('./Config');
const { getProperty, getPropertyPath } = require('../util/propertyAccess');

jest.mock('../util/propertyAccess');

describe('instantiate', () => {
  describe('Config', () => {
    describe('constructor', () => {
      it('should set all properties that are provided the constructors argument', () => {
        const inputConfig = {
          test: 'test123',
        };

        const config = new Config(inputConfig);

        expect(config.test).toEqual('test123');
        expect(Object.getOwnPropertyNames(config)).toEqual(['test']);
      });
    });

    describe('get', () => {
      it('should return the value of the provided property path if it is set', () => {
        const value = 'test';

        getPropertyPath.mockImplementation(() => ['property', 'path']);
        getProperty.mockImplementation(() => value);


        const config = new Config({});

        const result = config.get('property.path');

        expect(result).toEqual(value);
      });

      it('should throw an error if the provided property path does not exist', () => {
        getPropertyPath.mockImplementation(() => undefined);

        const config = new Config({});

        const expectedError = new Error('Calling config.get with in invalid property path. Strings and Arrays are allowed.');

        expect(() => config.get('property.path')).toThrow(expectedError);
      });

      it('should throw an error if the value of the provided property path is not defined', () => {
        getPropertyPath.mockImplementation(() => ['property', 'path']);
        getProperty.mockImplementation(() => undefined);

        const config = new Config({});

        const expectedError = new Error('Configuration property "property.path" is not defined.');

        expect(() => config.get('property.path')).toThrow(expectedError);
      });
    });


    describe('has', () => {
      it('should return true if the provided property string path exists and is defined', () => {
        const value = 'test';

        getPropertyPath.mockImplementation(() => ['property', 'path']);
        getProperty.mockImplementation(() => value);


        const config = new Config({});

        const result = config.has('property.path');

        expect(result).toEqual(true);
      });

      it('should return false if the provided property string path does not exist', () => {
        getPropertyPath.mockImplementation(() => undefined);

        const config = new Config({});

        const result = config.has('property.path');

        expect(result).toEqual(false);
      });

      it('should return false if the provided property string path is not defined', () => {
        getPropertyPath.mockImplementation(() => ['property', 'path']);
        getProperty.mockImplementation(() => undefined);


        const config = new Config({});

        const result = config.has('property.path');

        expect(result).toEqual(false);
      });
    });
  });
});
