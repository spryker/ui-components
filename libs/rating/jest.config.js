module.exports = {
  name: 'rating',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/rating',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
