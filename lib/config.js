const compose = require('./util/compose');

const load = require('./load');
const resolveEnv = require('./resolveEnv');
const merge = require('./merge');
const validate = require('./validate');
const instantiate = require('./instantiate/');

const init = () => {
  const getConfig = compose(load, resolveEnv, merge, validate, instantiate);
  return getConfig();
};

module.exports = init;
