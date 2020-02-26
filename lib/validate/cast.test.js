const { cast } = require('./cast');
const {
  getPropertyPath,
  getProperty,
  setProperty,
} = require('../util/propertyAccess');

jest.mock('../util/propertyAccess');

describe('validate', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('cast', () => {
    it('should typecast integer values provided in the provided errors array', () => {
      const errors = [{
        keyword: 'type',
        dataPath: 'test.prop',
        params: { type: 'integer' },
      }];
      const config = { test: { prop: '5' } };

      getPropertyPath.mockImplementation(() => ['test', 'prop']);
      getProperty.mockImplementation(() => '5');
      setProperty.mockImplementation(() => ({}));

      const result = cast(config, errors);

      expect(getPropertyPath).toHaveBeenCalledTimes(1);
      expect(getPropertyPath).toHaveBeenCalledWith('test.prop');

      expect(getProperty).toHaveBeenCalledTimes(1);
      expect(getProperty).toHaveBeenCalledWith(config, ['test', 'prop']);

      expect(setProperty).toHaveBeenCalledTimes(1);
      expect(setProperty).toHaveBeenCalledWith(config, 5, ['test', 'prop']);

      expect(result).toEqual({});
    });

    it('should typecast boolean values provided in the provided errors array', () => {
      const errors = [{
        keyword: 'type',
        dataPath: 'test.prop',
        params: { type: 'boolean' },
      }];
      const config = { test: { prop: 'false' } };

      getPropertyPath.mockImplementation(() => ['test', 'prop']);
      getProperty.mockImplementation(() => 'false');
      setProperty.mockImplementation(() => ({}));

      const result = cast(config, errors);

      expect(getPropertyPath).toHaveBeenCalledTimes(1);
      expect(getPropertyPath).toHaveBeenCalledWith('test.prop');

      expect(getProperty).toHaveBeenCalledTimes(1);
      expect(getProperty).toHaveBeenCalledWith(config, ['test', 'prop']);

      expect(setProperty).toHaveBeenCalledTimes(1);
      expect(setProperty).toHaveBeenCalledWith(config, false, ['test', 'prop']);

      expect(result).toEqual({});
    });

    it('should typecast number values provided in the provided errors array', () => {
      const errors = [{
        keyword: 'type',
        dataPath: 'test.prop',
        params: { type: 'number' },
      }];
      const config = { test: { prop: '1.5' } };

      getPropertyPath.mockImplementation(() => ['test', 'prop']);
      getProperty.mockImplementation(() => '1.5');
      setProperty.mockImplementation(() => ({}));

      const result = cast(config, errors);

      expect(getPropertyPath).toHaveBeenCalledTimes(1);
      expect(getPropertyPath).toHaveBeenCalledWith('test.prop');

      expect(getProperty).toHaveBeenCalledTimes(1);
      expect(getProperty).toHaveBeenCalledWith(config, ['test', 'prop']);

      expect(setProperty).toHaveBeenCalledTimes(1);
      expect(setProperty).toHaveBeenCalledWith(config, 1.5, ['test', 'prop']);

      expect(result).toEqual({});
    });

    it('should do nothing if the errors are emty', () => {
      const errors = [];
      const config = { test: { prop: '1.5' } };

      getPropertyPath.mockImplementation(() => ['test', 'prop']);
      getProperty.mockImplementation(() => '1.5');
      setProperty.mockImplementation(() => ({}));

      const result = cast(config, errors);

      expect(getPropertyPath).toHaveBeenCalledTimes(0);

      expect(getProperty).toHaveBeenCalledTimes(0);

      expect(setProperty).toHaveBeenCalledTimes(0);

      expect(result).toEqual(config);
    });

    it('should not cast a value if the path to the data could not be found', () => {
      const errors = [{
        keyword: 'type',
        dataPath: 'test.prop',
        params: { type: 'number' },
      }];
      const config = { test: { prop: '1.5' } };

      getPropertyPath.mockImplementation(() => ['test', 'prop']);
      getProperty.mockImplementation(() => undefined);
      setProperty.mockImplementation(() => ({}));

      const result = cast(config, errors);

      expect(getPropertyPath).toHaveBeenCalledTimes(1);
      expect(getPropertyPath).toHaveBeenCalledWith('test.prop');

      expect(getProperty).toHaveBeenCalledTimes(1);
      expect(getProperty).toHaveBeenCalledWith(config, ['test', 'prop']);

      expect(setProperty).toHaveBeenCalledTimes(0);

      expect(result).toEqual(config);
    });

    it('should not cast a value if the type is not number, integer or boolean', () => {
      const errors = [{
        keyword: 'type',
        dataPath: 'test.prop',
        params: { type: 'object' },
      }];
      const config = { test: { prop: '1.5' } };

      getPropertyPath.mockImplementation(() => ['test', 'prop']);
      getProperty.mockImplementation(() => '1.5');
      setProperty.mockImplementation(() => ({}));

      const result = cast(config, errors);

      expect(getPropertyPath).toHaveBeenCalledTimes(1);
      expect(getProperty).toHaveBeenCalledTimes(1);

      expect(setProperty).toHaveBeenCalledTimes(0);

      expect(result).toEqual(config);
    });
  });
});
