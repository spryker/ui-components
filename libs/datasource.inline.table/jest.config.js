module.exports = {
  name: 'datasource.inline.table',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/datasource.inline.table',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
