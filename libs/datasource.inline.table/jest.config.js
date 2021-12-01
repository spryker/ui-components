module.exports = {
  name: 'datasource.inline.table',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/datasource.inline.table',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
