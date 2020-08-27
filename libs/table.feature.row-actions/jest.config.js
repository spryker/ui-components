module.exports = {
  name: 'table.feature.row-actions',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.row-actions',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
