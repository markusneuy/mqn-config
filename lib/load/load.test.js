const load = require('./');

const { getConfigFiles } = require('./getConfigFiles');
const { loadConfigs } = require('./loadConfigs');

jest.mock('./loadConfigs');
jest.mock('./getConfigFiles');

describe('load', () => {
  it('should concat getting config files and loading config files', () => {
    const getConfigResult = Symbol('result');
    getConfigFiles.mockImplementation(() => getConfigResult);

    load();

    expect(getConfigFiles).toHaveBeenCalledTimes(1);
    expect(getConfigFiles).toHaveBeenCalledWith();

    expect(loadConfigs).toHaveBeenCalledTimes(1);
    expect(loadConfigs).toHaveBeenCalledWith(getConfigResult);
  });
});
