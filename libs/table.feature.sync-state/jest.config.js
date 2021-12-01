module.exports = {
  name: 'table.feature.sync-state',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.sync-state',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
