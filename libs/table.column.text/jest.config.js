module.exports = {
  name: 'table-column-text',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table-column-text',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
