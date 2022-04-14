module.exports = {
    roots: ["<rootDir>/tests"],
    transform: {
    "^.+\\.tsx?$": ["@swc/jest"],
   },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        '\\.(css)$': '<rootDir>/tests/__mocks__/styleMock.ts',
    }
};
