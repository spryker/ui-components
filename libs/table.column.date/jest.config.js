module.exports = {
  name: 'table.column.date',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.column.date',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
