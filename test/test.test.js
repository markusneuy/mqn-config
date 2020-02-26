const path = require('path');

jest.resetModules();

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
process.env.NODE_ENV = 'test';
process.env.SERVER_HOST = 'TEST_HOST';

describe('config - test', () => {
  it('should use merge default config, test config and environment variables', () => {
    const expectedConfig = {
      server: {
        port: 8000,
        host: 'TEST_HOST',
      },
      loglevel: 'none',
    };

    const config = require('../index'); // eslint-disable-line global-require

    expect(config).toEqual(expectedConfig);
  });
});
