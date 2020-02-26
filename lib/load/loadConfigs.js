const fs = require('fs');

const loadConfigs = (configFilePaths) => {
  const result = [];

  for (const { filePath, name } of configFilePaths) {
    try {
      const configFileRaw = fs.readFileSync(filePath, 'utf8');
      result.push({
        name,
        content: configFileRaw,
      });
    } catch { } // eslint-disable-line no-empty
  }
  const parsed = result.map(({ name, content }) => ({ name, content: JSON.parse(content) }));

  return parsed;
};

module.exports = { loadConfigs };
