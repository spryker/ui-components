module.exports = {
  displayName: 'headline',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/headline',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
