module.exports = {
  displayName: 'grid',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/grid',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
