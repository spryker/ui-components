module.exports = {
  name: 'logo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/logo',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
