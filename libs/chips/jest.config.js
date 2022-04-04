module.exports = {
  displayName: 'chips',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/chips',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
