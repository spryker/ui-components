module.exports = {
  name: 'table.column.input',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.column.input',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
