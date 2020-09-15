module.exports = {
  name: 'table.feature.pagination',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.pagination',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
