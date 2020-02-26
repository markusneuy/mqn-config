const config = require('./config');

const compose = require('./util/compose');
const load = require('./load');
const resolveEnv = require('./resolveEnv');
const merge = require('./merge');
const validate = require('./validate');
const instantiate = require('./instantiate/');

jest.mock('./util/compose');
jest.mock('./load');
jest.mock('./resolveEnv');
jest.mock('./merge');
jest.mock('./validate');
jest.mock('./instantiate/');

describe('config', () => {
  let processExitMock;

  beforeEach(() => {
    processExitMock = jest.spyOn(process, 'exit').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call all neccessary initiation functions', () => {
    const composeResultMock = jest.fn();
    compose.mockImplementation(() => composeResultMock);

    config();

    expect(compose).toHaveBeenCalledTimes(1);
    expect(compose).toHaveBeenCalledWith(load, resolveEnv, merge, validate, instantiate);
    expect(composeResultMock).toHaveBeenCalledTimes(1);

    expect(processExitMock).toHaveBeenCalledTimes(0);
  });
});
