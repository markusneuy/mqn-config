const compose = require('./compose');


describe('util', () => {
  describe('compose', () => {
    it('should return a function', () => {
      const fn = () => { };

      const result = compose(fn);

      expect(typeof result).toEqual('function');
    });

    it('should return the provided argument in case no function is given', () => {
      const parameter = 'test';
      const preResult = compose();

      const result = preResult(parameter);

      expect(typeof preResult).toEqual('function');
      expect(result).toEqual(parameter);
    });

    it('should call the provided functions in the provided order', () => {
      const order = [];
      const fn1 = jest.fn(() => order.push(1));
      const fn2 = jest.fn(() => order.push(2));

      const preResult = compose(fn1, fn2);

      preResult();

      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(1);
      expect(order).toEqual([1, 2]);
    });

    it('should pass the initial arguments to the first function', () => {
      const parameter = 'test';
      const fn = jest.fn();

      compose(fn)(parameter);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(parameter);
    });

    it('should pass the result from the previous function to the current function', () => {
      const fn1 = jest.fn(() => 'test');
      const fn2 = jest.fn();

      compose(fn1, fn2)();

      expect(fn2).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledWith('test');
    });

    it('should return the result of the last called function', () => {
      const fn1 = jest.fn(() => 'test1');
      const fn2 = jest.fn(() => 'test2');

      const result = compose(fn1, fn2)();

      expect(result).toEqual('test2');
    });
  });
});
