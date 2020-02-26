const path = require('path');

jest.resetModules();

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
process.env.NODE_ENV = 'production';
process.env.SERVER_HOST = 'TEST_HOST';
process.env.SERVER_PORT = '9000';
process.env.LOGLEVEL = 'error';

describe('config - production', () => {
  it('should use custom environment variables only', () => {
    const expectedConfig = {
      server: {
        port: 9000,
        host: 'TEST_HOST',
      },
      loglevel: 'error',
    };

    const config = require('../index'); // eslint-disable-line global-require

    expect(config).toEqual(expectedConfig);
  });
});
