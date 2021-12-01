module.exports = {
  name: 'internal-utils',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/internal-utils',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
