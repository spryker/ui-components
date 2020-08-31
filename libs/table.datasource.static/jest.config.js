module.exports = {
  name: 'table.datasource.static',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.datasource.static',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
