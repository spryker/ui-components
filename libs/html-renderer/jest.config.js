module.exports = {
  name: 'html-renderer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/html-renderer',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
