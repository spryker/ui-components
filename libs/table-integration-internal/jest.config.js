module.exports = {
  name: 'table-integration-internal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table-integration-internal',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
