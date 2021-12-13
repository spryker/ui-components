module.exports = {
  displayName: 'link',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/link',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
