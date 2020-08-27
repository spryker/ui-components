module.exports = {
  name: 'table.column.date',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.column.date',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
