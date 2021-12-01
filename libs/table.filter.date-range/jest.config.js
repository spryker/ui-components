module.exports = {
  name: 'table.filter.date-range',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.filter.date-range',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
