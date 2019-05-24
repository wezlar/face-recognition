module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  transform: {
    '.*': 'babel-jest',
    '^.+\\.js?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|ttf|css)$': '<rootDir>/testHelpers/assetsTransformer.js',
    '@jest-helpers(.*)$': '<rootDir>/testHelpers/$1',
  },
  collectCoverageFrom: [
    '**/client/**/*.js',
  ],
};
