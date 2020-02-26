const getEnvVariable = (name, defaultValue) => process.env[name] || defaultValue;

module.exports = { getEnvVariable };
