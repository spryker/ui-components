module.exports = {
  name: 'table.feature.filters',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.filters',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
