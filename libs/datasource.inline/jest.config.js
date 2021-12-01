module.exports = {
  name: 'datasource.inline',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/datasource.inline',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
