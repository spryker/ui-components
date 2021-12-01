module.exports = {
  name: 'datasource.http',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/datasource.http',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
