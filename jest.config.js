const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./renderer",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
