module.exports = {
  name: 'table.feature.pagination',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.pagination',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
