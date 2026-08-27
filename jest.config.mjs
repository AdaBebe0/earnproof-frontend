import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["[\\\\/]node_modules[\\\\/]", "[\\\\/]e2e[\\\\/]"],
};

export default createJestConfig(config);
