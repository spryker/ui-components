module.exports = {
  name: 'table.filter.tree-select',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.filter.tree-select',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
