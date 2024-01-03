const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../tsconfig');

module.exports = {
    moduleFileExtensions: ["js", "json", "ts"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' } ),
    testEnvironment: "node",
    testRegex: "-e2e.spec.ts$",
    rootDir: "../",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    }
}