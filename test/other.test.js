const path = require('path');

jest.resetModules();

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
process.env.NODE_ENV = 'other';

describe('config - other', () => {
  it('should use the default config if no other config could be found', () => {
    const expectedConfig = {
      server: {
        port: 8000,
        host: 'localhost',
      },
      loglevel: 'info',
    };

    const config = require('../index'); // eslint-disable-line global-require

    expect(config).toEqual(expectedConfig);
  });
});
