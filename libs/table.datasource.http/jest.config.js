module.exports = {
  name: 'table.datasource.http',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.datasource.http',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
