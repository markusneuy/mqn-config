const { validate } = require('./validate');
const { cast } = require('./cast');
const { loadSchema } = require('./loadSchema');


jest.mock('./cast');
jest.mock('./loadSchema');

describe('validate', () => {
  describe('validate', () => {
    const validatorMock = jest.fn();
    const loadSchemaMock = () => validatorMock;

    beforeEach(() => {
      jest.resetAllMocks();
      loadSchema.mockImplementation(loadSchemaMock);
      delete validatorMock.errors;
    });

    it('should validate once and return the config if it is already valid', () => {
      const config = {};

      validatorMock.mockImplementation(() => true);
      validatorMock.errors = [];

      const result = validate(config);

      expect(result).toStrictEqual(config);
      expect(loadSchema).toHaveBeenCalledTimes(1);
      expect(validatorMock).toHaveBeenCalledTimes(1);
      expect(validatorMock).toHaveBeenCalledWith(config);
    });

    it('should validate twice, cast the config and return the config if it is valid after casting', () => {
      const config = { casted: false };
      const castedConfig = { casted: true };
      const errors = [];

      validatorMock.errors = errors;
      validatorMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      cast.mockImplementation(() => castedConfig);

      const result = validate(config);

      expect(result).toStrictEqual(castedConfig);
      expect(loadSchema).toHaveBeenCalledTimes(1);
      expect(validatorMock).toHaveBeenCalledTimes(2);
      expect(validatorMock).toHaveBeenCalledWith(config);
      expect(validatorMock).toHaveBeenCalledWith(castedConfig);
    });

    it('should throw an error if the config is not valid after casting', () => {
      const config = { casted: false };
      const castedConfig = { casted: true };
      const errors = ['test'];

      const expectedErrors = new Error('The config does not match the provided schema.\n["test"]');

      validatorMock.errors = errors;
      validatorMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false);

      cast.mockImplementation(() => castedConfig);

      expect(() => validate(config)).toThrow(expectedErrors);
    });
  });
});
