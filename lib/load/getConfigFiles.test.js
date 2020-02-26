const path = require('path');

const { getEnvVariable } = require('../util/environment/getEnvVariable');
const { getConfigFiles } = require('./getConfigFiles');

jest.mock('../util/environment/getEnvVariable');

describe('Get Config Files', () => {
  it('should return a file for default, development and custom environment variables if the node env is set to development', () => {
    getEnvVariable.mockImplementation(() => 'development');

    const result = getConfigFiles();

    expect(result.length).toEqual(3);

    expect(result[0]).toEqual(expect.objectContaining({
      name: expect.stringMatching('default'),
      filePath: expect.stringMatching('default.json'),
    }));

    expect(result[1]).toEqual(expect.objectContaining({
      name: expect.stringMatching('development'),
      filePath: expect.stringMatching('development.json'),
    }));

    expect(result[2]).toEqual(expect.objectContaining({
      name: expect.stringMatching('env'),
      filePath: expect.stringMatching('env.json'),
    }));
  });

  it('should return a file for custom environment variables if the node env is set to production', () => {
    getEnvVariable.mockImplementation(() => 'production');

    const result = getConfigFiles();

    expect(result.length).toEqual(1);

    expect(result[0]).toEqual(expect.objectContaining({
      name: expect.stringMatching('env'),
      filePath: expect.stringMatching('env.json'),
    }));
  });

  it('should return a file for default, test and custom environment variables if the node env is set to test', () => {
    getEnvVariable.mockImplementation(() => 'test');

    const result = getConfigFiles();

    expect(result.length).toEqual(3);

    expect(result[0]).toEqual(expect.objectContaining({
      name: expect.stringMatching('default'),
      filePath: expect.stringMatching('default.json'),
    }));

    expect(result[1]).toEqual(expect.objectContaining({
      name: expect.stringMatching('test'),
      filePath: expect.stringMatching('test.json'),
    }));

    expect(result[2]).toEqual(expect.objectContaining({
      name: expect.stringMatching('env'),
      filePath: expect.stringMatching('env.json'),
    }));
  });

  it('should use the provided configured config directory as is if it is absolute', () => {
    getEnvVariable
      .mockImplementationOnce(() => 'development')
      .mockImplementationOnce(() => '/test');

    const expectedDefaultPath = path.join('/test', 'default.json');
    const expectedDevelopmentPath = path.join('/test', 'development.json');
    const expectedEnvPath = path.join('/test', 'env.json');

    const result = getConfigFiles();

    expect(result.length).toEqual(3);

    expect(result[0].filePath).toEqual(expectedDefaultPath);
    expect(result[1].filePath).toEqual(expectedDevelopmentPath);
    expect(result[2].filePath).toEqual(expectedEnvPath);
  });
});
