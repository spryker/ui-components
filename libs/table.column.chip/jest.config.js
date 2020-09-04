module.exports = {
  name: 'table.column.chip',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.column.chip',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
