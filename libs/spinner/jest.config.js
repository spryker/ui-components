module.exports = {
  name: 'spinner',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/spinner',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
