module.exports = {
  name: 'user-menu',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/user-menu',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
