const { getEnvVariable } = require('../util/environment');
const { resolveConfigs } = require('./resolveEnvVariables');

jest.mock('../util/environment');

describe('resolveEnv', () => {
  describe('resolveEnvVariables', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should map all entries not having the name "env" to their content property', () => {
      const inputConfig = [
        { name: 'test', content: { test: '123' } },
        { name: 'test2', content: { test: '456' } },
      ];

      const result = resolveConfigs(inputConfig);

      expect(result[0]).toEqual(inputConfig[0].content);
      expect(result[0]).toBe(inputConfig[0].content);

      expect(result[1]).toEqual(inputConfig[1].content);
      expect(result[1]).toBe(inputConfig[1].content);

      expect(getEnvVariable).toHaveBeenCalledTimes(0);
    });

    it('should only handle the entry with the name "env"', () => {
      const replacement = Symbol('replacement');
      const inputConfig = [
        { name: 'test', content: { test: '123' } },
        { name: 'env', content: { test: '456' } },
      ];

      getEnvVariable.mockImplementation(() => replacement);

      const result = resolveConfigs(inputConfig);

      expect(result[0]).toEqual(inputConfig[0].content);
      expect(result[0]).toBe(inputConfig[0].content);

      expect(result[1].test).toBe(replacement);
    });

    it('should get the environment variables for every string value in the provided object', () => {
      const inputConfig = [
        { name: 'env', content: { test: '456', deep: { other: 'other' }, notParsed: 123 } },
      ];

      resolveConfigs(inputConfig);

      expect(getEnvVariable).toHaveBeenCalledTimes(2);
      expect(getEnvVariable).toHaveBeenCalledWith('456');
      expect(getEnvVariable).toHaveBeenCalledWith('other');
    });

    it('should set properties that do not have a string value to undefined', () => {
      const inputConfig = [
        { name: 'env', content: { test: 456 } },
      ];

      getEnvVariable.mockImplementation(() => '123');

      const result = resolveConfigs(inputConfig);

      expect(result.test).toEqual(undefined);
    });

    it('should set properties that could not be resolved to an environment variable to undefined', () => {
      const inputConfig = [
        { name: 'env', content: { test: '456' } },
      ];

      getEnvVariable.mockImplementation(() => undefined);

      const result = resolveConfigs(inputConfig);

      expect(result.test).toEqual(undefined);
    });

    it('should resolve string in an array', () => {
      const inputConfig = [
        { name: 'env', content: { test: ['123', 456, '789'] } },
      ];

      resolveConfigs(inputConfig);

      expect(getEnvVariable).toHaveBeenCalledTimes(2);
      expect(getEnvVariable).toHaveBeenCalledWith('123');
      expect(getEnvVariable).toHaveBeenCalledWith('789');
    });
  });
});
