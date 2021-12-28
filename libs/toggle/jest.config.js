module.exports = {
  displayName: 'toggle',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/toggle',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
