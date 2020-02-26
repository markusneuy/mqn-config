const resolver = require('./resolver');

describe('propertyAccess', () => {
  describe('resolver', () => {
    it('should return the provided array if an array is provided', () => {
      const array = ['test', 'property', 'path'];

      const result = resolver(array);

      expect(result).toStrictEqual(array);
    });

    it('should return an array of segments split by a dot if a string is provided', () => {
      const string = 'test.property.path';
      const expectedResult = ['test', 'property', 'path'];

      const result = resolver(string);

      expect(result).toEqual(expectedResult);
    });

    it('should remove dots from the beginning of the string if a string is provided', () => {
      const string = '.test.property.path';
      const expectedResult = ['test', 'property', 'path'];

      const result = resolver(string);

      expect(result).toEqual(expectedResult);
    });

    it('should return an array with the provided number if a number if provided', () => {
      const number = 1;
      const expectedResult = [1];

      const result = resolver(number);

      expect(result).toEqual(expectedResult);
    });

    it('should return undefined if an object is provided', () => {
      const object = {};

      const result = resolver(object);

      expect(result).toEqual(undefined);
    });

    it('should return undefined if undefined is provided', () => {
      const result = resolver(undefined);

      expect(result).toEqual(undefined);
    });

    it('should return undefined if null is provided', () => {
      const result = resolver(null);

      expect(result).toEqual(undefined);
    });
  });
});
