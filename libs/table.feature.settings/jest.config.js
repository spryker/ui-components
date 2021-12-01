module.exports = {
  name: 'table.feature.settings',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.settings',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
