module.exports = {
  name: 'table.feature.batch-actions',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.batch-actions',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
