
const { getEnvVariable } = require('./getEnvVariable');

describe('util', () => {
  describe('environment', () => {
    describe('getEnvVariable', () => {
      beforeEach(() => {
        delete process.env.TEST;
      });

      it('should resolve a name to the value of the environment variable with that key', () => {
        process.env.TEST = '123';

        const result = getEnvVariable('TEST');

        expect(result).toEqual('123');
      });

      it('should resolve to a default value if the environment variable is not set', () => {
        const result = getEnvVariable('TEST', '456');

        expect(result).toEqual('456');
      });

      it('should return undefined if no default value is given and the environment variable is not set', () => {
        const result = getEnvVariable('TEST');

        expect(result).toEqual(undefined);
      });
    });
  });
});
