const path = require('path');

const { getEnvVariable } = require('../util/environment/getEnvVariable');

const ENV_CONFIG_FILE = 'env.json';
const DEFAULT_FILE = 'default.json';


const getConfigFiles = () => {
  const nodeEnv = getEnvVariable('NODE_ENV', 'development');
  let configDir = path.normalize(getEnvVariable('NODE_CONFIG_DIR', 'config'));

  const configFiles = [];

  const cwd = process.cwd();

  if (!path.isAbsolute(configDir)) {
    configDir = path.join(cwd, configDir);
  }

  if (nodeEnv !== 'production') {
    const defaultPath = path.join(configDir, DEFAULT_FILE);
    const nodeEnvPath = path.join(configDir, `${nodeEnv}.json`);

    configFiles.push({
      name: path.basename(defaultPath, '.json'),
      filePath: defaultPath,
    });

    configFiles.push({
      name: path.basename(nodeEnvPath, '.json'),
      filePath: nodeEnvPath,
    });
  }

  const customEnvPath = path.join(configDir, ENV_CONFIG_FILE);
  configFiles.push({
    name: path.basename(customEnvPath, '.json'),
    filePath: customEnvPath,
  });

  return configFiles;
};

module.exports = { getConfigFiles };
