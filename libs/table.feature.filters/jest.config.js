module.exports = {
  name: 'table.feature.filters',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.filters',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
