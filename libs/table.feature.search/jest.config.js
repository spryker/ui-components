module.exports = {
  name: 'table.feature.search',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.search',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
