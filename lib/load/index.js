const { getConfigFiles } = require('./getConfigFiles');
const { loadConfigs } = require('./loadConfigs');

const load = () => loadConfigs(getConfigFiles());

module.exports = load;
