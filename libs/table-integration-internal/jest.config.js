module.exports = {
  name: 'table-integration-internal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table-integration-internal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
