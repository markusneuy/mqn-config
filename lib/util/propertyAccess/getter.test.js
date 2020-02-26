const getter = require('./getter');


describe('propertyAccess', () => {
  describe('getter', () => {
    it('should return the value of the property if an array with the property path is provided', () => {
      const expectedValue = Symbol('test');
      const inputObject = { child: { property: expectedValue } };
      const propertyPath = ['child', 'property'];

      const result = getter(inputObject, propertyPath);

      expect(result).toEqual(expectedValue);
    });

    it('should return the value of the property if an array with the property name is provided', () => {
      const expectedValue = Symbol('test');
      const inputObject = { child: expectedValue };
      const propertyPath = ['child'];

      const result = getter(inputObject, propertyPath);

      expect(result).toEqual(expectedValue);
    });

    it('should return undefined if the value of the property path is null before the property path ends', () => {
      const inputObject = { child: { property: null } };
      const propertyPath = ['child', 'property', 'notExisting'];

      const result = getter(inputObject, propertyPath);

      expect(result).toEqual(undefined);
    });

    it('should return undefined if the value of the property path does not exist', () => {
      const inputObject = { child: { property: 'test' } };
      const propertyPath = ['child', 'property', 'notExisting'];

      const result = getter(inputObject, propertyPath);

      expect(result).toEqual(undefined);
    });
  });
});
