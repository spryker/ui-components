module.exports = {
  name: 'datasource',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/datasource',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
