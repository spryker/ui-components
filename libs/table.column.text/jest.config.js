module.exports = {
  name: 'table.column.text',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.column.text',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
