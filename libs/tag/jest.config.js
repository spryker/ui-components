module.exports = {
  name: 'tag',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/tag',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  testRunner: "jasmine2"
};
