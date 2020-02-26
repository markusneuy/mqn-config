const setter = require('./setter');

describe('properyAccess', () => {
  describe('setter', () => {
    it('should throw an error if the first parameter is null', () => {
      const object = null;
      const val = 'test';
      const property = ['property', 'path'];

      expect(() => setter(object, val, property)).toThrowError('Property \'property,path\' not found.');
    });

    it('should throw an error if the first parameterr is undefined', () => {
      const object = undefined;
      const val = 'test';
      const property = ['property', 'path'];

      expect(() => setter(object, val, property)).toThrowError('Property \'property,path\' not found.');
    });

    it('should throw an error if the first parameter is not a string', () => {
      const object = 'string';
      const val = 'test';
      const property = ['property', 'path'];

      expect(() => setter(object, val, property)).toThrowError('Property \'property,path\' not found.');
    });

    it('should throw an error if the provided property path could not be found', () => {
      const object = { property: 'test' };
      const val = 'test';
      const property = ['property', 'path'];

      expect(() => setter(object, val, property)).toThrowError('Property \'path\' not found.');
    });

    it('should set the property of the provided property path to the given value', () => {
      const object = { property: { path: 'not_test' } };
      const val = 'test';
      const property = ['property', 'path'];

      const result = setter(object, val, property);

      expect(result.property.path).toEqual(val);
    });

    it('should set the property of the provided property path to the given value if is references an array index', () => {
      const inputValue = 'not_test';
      const object = { property: [inputValue, inputValue] };
      const val = 'test';
      const property = ['property', 1];

      const result = setter(object, val, property);

      expect(result.property[0]).toEqual(inputValue);
      expect(result.property[1]).toEqual(val);
    });

    it('should set the provided property and create copies in every hierarchy level if correct parameters are provided', () => {
      const child = { path: 'not_text' };
      const object = { property: child };
      const val = 'test';
      const property = ['property', 'path'];

      const result = setter(object, val, property);

      expect(result.property).not.toBe(child);
      expect(result).not.toBe(object);
    });
  });
});
