import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  // Playwright's visual regression suite lives under e2e/visual and uses
  // @playwright/test, not jest — keep jest from trying to run it.
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/e2e/"],
};

export default createJestConfig(config);
