
const instantiate = require('./index');

describe('instantiate', () => {
  it('should return the given config without changes in the values and keys', () => {
    const deepTreeValue = Symbol('deeptree');
    const config = {
      test: 'test',
      deep: {
        tree: deepTreeValue,
      },
      array: [1, 2, 3],
    };

    const result = instantiate(config);

    expect(result.test).toEqual('test');
    expect(result.deep.tree).toEqual(deepTreeValue);
  });

  it('should return the result config with "has" and "get" functions accross multiple levels', () => {
    const deepTreeValue = Symbol('deeptree');
    const config = {
      test: 'test',
      deep: {
        tree: deepTreeValue,
      },
      array: [1, 2, 3],
    };

    const result = instantiate(config);

    expect(typeof result.has).toBe('function');
    expect(typeof result.get).toBe('function');
    expect(typeof result.deep.has).toBe('function');
    expect(typeof result.deep.get).toBe('function');
  });

  it('should return the result config without "has" and "get" being enumerable', () => {
    const deepTreeValue = Symbol('deeptree');
    const config = {
      test: 'test',
      deep: {
        tree: deepTreeValue,
      },
      array: [1, 2, 3],
    };

    const result = instantiate(config);

    expect(Object.keys(result)).toEqual(
      expect.not.arrayContaining(['get', 'has']),
    );

    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['test', 'deep']),
    );
  });

  it('should return the result config without the values being changeable', () => {
    const deepTreeValue = Symbol('deeptree');
    const config = {
      test: 'test',
      deep: {
        tree: deepTreeValue,
      },
      array: [1, 2, 3],
    };

    const result = instantiate(config);

    result.test = 10;

    expect(result.test).toEqual('test');
    expect(result.array.length).toEqual(3);
    expect(result.array[3]).not.toBeDefined();
    expect(() => result.array.push(4)).toThrowError();
  });

  it('should return the result config without being extendable', () => {
    const deepTreeValue = Symbol('deeptree');
    const config = {
      test: 'test',
      deep: {
        tree: deepTreeValue,
      },
      array: [1, 2, 3],
    };

    const result = instantiate(config);

    result.added = 'property';

    expect(Object.keys(result)).toEqual(
      expect.not.arrayContaining(['get', 'has', 'added']),
    );

    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['test', 'deep']),
    );

    expect(result.added).not.toBeDefined();
  });
});
