import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  // Playwright specs under e2e/ have their own runner (`npm run
  // test:e2e:a11y`) and must not be picked up by jest.
  testPathIgnorePatterns: ["[\\\\/]node_modules[\\\\/]", "[\\\\/]e2e[\\\\/]"],
};

export default createJestConfig(config);
