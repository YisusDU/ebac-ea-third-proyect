// filepath: /C:/Users/yisus/OneDrive/Documentos/EBAC/22-testing-react/03-practice-34-jesus-diaz-testing-react/jest.config.js
/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/'
  ],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",

  "moduleNameMapper": {
  "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
}
};


module.exports = config;
