const path = require('path');

jest.resetModules();

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
process.env.NODE_ENV = 'development';
process.env.LOGLEVEL = 'test';

describe('config - development', () => {
  it('should merge the configs of default, development and env in this order', () => {
    const expectedConfig = {
      server: {
        port: 8080,
        host: '0.0.0.0',
      },
      loglevel: 'test',
    };

    const config = require('../index'); // eslint-disable-line global-require

    expect(config).toEqual(expectedConfig);
  });
});
