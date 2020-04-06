module.exports = {
  // jest should be looking for tests in the 'tests` directory
  roots: ["<rootDir>/tests"],

  // ts-jest will take care of .ts and .tsx files only, leaving JavaScript files as-is
  preset: "ts-jest"
};
