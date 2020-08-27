module.exports = {
  name: 'table.column.image',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.column.image',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
