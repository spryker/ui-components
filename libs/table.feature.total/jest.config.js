module.exports = {
  name: 'table.feature.total',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.total',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
