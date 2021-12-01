module.exports = {
  name: 'table.feature.editable',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.editable',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
