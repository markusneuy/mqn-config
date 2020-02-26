// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,
  browser: false,
  clearMocks: false,
  collectCoverage: false,
  coverageDirectory: 'coverage',

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },

  errorOnDeprecated: false,
  // globalSetup: null,
  // globalTeardown: null,
  // resetMocks: false,
  // resetModules: false,
  // resolver: null,
  // restoreMocks: false,
  // rootDir: null,
  //   "<rootDir>"
  // ],
  // setupFiles: [],
  // setupFilesAfterEnv: [],
  testEnvironment: 'node',
  // testEnvironmentOptions: {},
};
