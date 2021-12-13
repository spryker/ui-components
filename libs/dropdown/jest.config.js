module.exports = {
  displayName: 'dropdown',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/dropdown',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
