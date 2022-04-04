module.exports = {
  displayName: 'data-transformer.date-serialize',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/data-transformer.date-serialize',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
