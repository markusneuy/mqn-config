const compose = (...fns) => (args) => fns.reduce((prev, fn) => fn(prev), args);

module.exports = compose;
