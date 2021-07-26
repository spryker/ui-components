module.exports = {
  name: 'table.column.dynamic',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.column.dynamic',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
