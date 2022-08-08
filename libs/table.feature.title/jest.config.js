module.exports = {
  displayName: 'table.feature.title',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/table.feature.title',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
