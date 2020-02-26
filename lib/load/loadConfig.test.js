const fs = require('fs');
const { loadConfigs } = require('./loadConfigs');

jest.mock('fs');

describe('load', () => {
  describe('loadConfigs', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should attempt to load the files for all provided file paths', () => {
      const filePaths = [
        { name: 'test1', filePath: 'test1.json' },
        { name: 'test2', filePath: 'test2.json' },
      ];

      fs.readFileSync.mockImplementation(() => '{}');

      loadConfigs(filePaths);

      expect(fs.readFileSync).toHaveBeenCalledTimes(2);
      expect(fs.readFileSync).toHaveBeenCalledWith('test1.json', 'utf8');
      expect(fs.readFileSync).toHaveBeenCalledWith('test2.json', 'utf8');
    });

    it('should ignore file paths that could not be read', () => {
      const filePaths = [
        { name: 'test1', filePath: 'test1.json' },
        { name: 'test2', filePath: 'test2.json' },
      ];

      fs.readFileSync
        .mockImplementationOnce(() => { throw new Error('file does not exist'); })
        .mockImplementationOnce(() => '{}');

      const result = loadConfigs(filePaths);

      expect(fs.readFileSync).toHaveBeenCalledTimes(2);
      expect(result.length).toEqual(1);
    });

    it('should return an array of names and deserialized content objects if names and filepaths are given', () => {
      const filePaths = [
        { name: 'test1', filePath: 'test1.json' },
        { name: 'test2', filePath: 'test2.json' },
      ];

      fs.readFileSync
        .mockImplementationOnce(() => '{ "test": 456}')
        .mockImplementationOnce(() => '{ "result": "123"}');

      const result = loadConfigs(filePaths);

      expect(result.length).toEqual(2);
      expect(result[0].name).toEqual('test1');
      expect(result[0].content).toEqual({ test: 456 });
      expect(result[1].name).toEqual('test2');
      expect(result[1].content).toEqual({ result: '123' });
    });

    it('should throw an error if a file is not JSON deserializable', () => {
      const filePaths = [
        { name: 'test1', filePath: 'test1.json' },
        { name: 'test2', filePath: 'test2.json' },
      ];

      fs.readFileSync.mockImplementation(() => 'not json');

      expect(() => loadConfigs(filePaths)).toThrowError();
    });
  });
});
