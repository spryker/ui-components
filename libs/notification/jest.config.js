module.exports = {
  name: 'notification',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/notification',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
