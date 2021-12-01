module.exports = {
  name: 'table.column.dynamic',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.column.dynamic',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
