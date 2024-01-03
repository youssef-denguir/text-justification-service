const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        "src/**/*.ts"
    ],
    coveragePathIgnorePatterns: [
        "node_modules",
        ".module.ts",
        "src/main.ts"
    ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' } ),
    testPathIgnorePatterns: ["-e2e.spec.ts$"],
    rootDir: ".",
    testEnvironment: "node",
    testRegex: ".spec.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    }
}