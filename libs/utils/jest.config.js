module.exports = {
  name: 'utils',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/utils',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
