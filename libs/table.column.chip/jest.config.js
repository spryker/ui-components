module.exports = {
  name: 'table.column.chip',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.column.chip',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
