module.exports = {
  displayName: 'table.column.dynamic',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/table.column.dynamic',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
