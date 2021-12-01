module.exports = {
  name: 'web-components',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/web-components',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
