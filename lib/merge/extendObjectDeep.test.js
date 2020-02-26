const { mergeConfigs } = require('./extendObjectDeep');

describe('merge', () => {
  describe('extendObjectDeep', () => {
    describe('merge two objects', () => {
      it('should merge values by taking the seoncd value', () => {
        const config1 = {
          test: 1,
          test2: 'string',
        };

        const config2 = {
          test: 2,
          test2: 'string2',
        };

        const result = mergeConfigs([config1, config2]);

        expect(result.test).toEqual(2);
        expect(result.test2).toEqual('string2');
      });

      it('should merge arrays by taking the second array', () => {
        const config1 = {
          test: [1, 2, 3, 4],
          test2: ['abc', 'def'],
        };

        const config2 = {
          test: [5, 6, 7, 8],
          test2: ['ghi', 'jkl'],
        };

        const result = mergeConfigs([config1, config2]);

        expect(result.test).toEqual([5, 6, 7, 8]);
        expect(result.test2).toEqual(['ghi', 'jkl']);
      });

      it('should merge values by taking the first value if the second does not exist', () => {
        const config1 = {
          test: 'some_Value',
          test2: 'some_other_value',
        };

        const config2 = {
          test: 'third',
        };

        const result = mergeConfigs([config1, config2]);

        expect(result.test).toEqual('third');
        expect(result.test2).toEqual('some_other_value');
      });

      it('should merge values by taking the first value if the second is undefined', () => {
        const config1 = {
          test: 'some_Value',
          test2: 'some_other_value',
        };

        const config2 = {
          test: 'third',
          test2: undefined,
        };

        const result = mergeConfigs([config1, config2]);

        expect(result.test).toEqual('third');
        expect(result.test2).toEqual('some_other_value');
      });

      it('should merge values by taking the first value if the second is null', () => {
        const config1 = {
          test: 'some_Value',
          test2: 'some_other_value',
        };

        const config2 = {
          test: 'third',
          test2: null,
        };

        const result = mergeConfigs([config1, config2]);

        expect(result.test).toEqual('third');
        expect(result.test2).toEqual('some_other_value');
      });


      it('should merge values by taking the second value if the first does not exist', () => {
        const config1 = {
          test: 'some_Value',
        };

        const config2 = {
          test: 'third',
          test2: 'some_other_value',
        };

        const result = mergeConfigs([config1, config2]);

        expect(result.test).toEqual('third');
        expect(result.test2).toEqual('some_other_value');
      });

      it('should merge values by taking the second value if the first is null', () => {
        const config1 = {
          test: 'some_Value',
          test2: null,
        };

        const config2 = {
          test: 'third',
          test2: 'some_other_value',
        };

        const result = mergeConfigs([config1, config2]);

        expect(result.test).toEqual('third');
        expect(result.test2).toEqual('some_other_value');
      });

      it('should merge value by taking the second value if the first is undefined', () => {
        const config1 = {
          test: 'some_Value',
          test2: undefined,
        };

        const config2 = {
          test: 'third',
          test2: 'some_other_value',
        };

        const result = mergeConfigs([config1, config2]);

        expect(result.test).toEqual('third');
        expect(result.test2).toEqual('some_other_value');
      });

      it('should deeply merge nested objects', () => {
        const child1 = {
          test: 1,
          node: {
            test2: 2,
          },
        };
        const config1 = {
          child: child1,
          test3: 3,
        };

        const child2 = {
          node: {
            test2: 4,
          },
        };

        const config2 = {
          child: child2,
          test3: 5,
        };

        const result = mergeConfigs([config1, config2]);

        expect(result.child.test).toEqual(1);
        expect(result.child.node.test2).toEqual(4);
        expect(result.test3).toEqual(5);
      });

      it('should return a newly created objects', () => {
        const child1 = {
          test: 1,
          node: {
            test2: 2,
          },
        };
        const config1 = {
          child: child1,
          test3: 3,
        };

        const child2 = {
          node: {
            test2: 4,
          },
        };

        const config2 = {
          child: child2,
          test3: 5,
        };

        const result = mergeConfigs([config1, config2]);

        expect(result).not.toBe(config1);
        expect(result).not.toBe(config2);

        expect(result.child).not.toBe(child1);
        expect(result.child).not.toBe(child2);
      });
    });

    describe('multiple objects', () => {
      const config1 = {
        test1: 1,
        test2: 2,
      };

      const config2 = {
        test1: 3,
        test3: 4,
      };

      const config3 = {
        test1: 5,
        test4: 6,
      };

      const result = mergeConfigs([config1, config2, config3]);

      expect(result.test1).toEqual(5);
      expect(result.test2).toEqual(2);
      expect(result.test3).toEqual(4);
      expect(result.test4).toEqual(6);
    });
  });
});
