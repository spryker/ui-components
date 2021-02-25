module.exports = {
  name: 'datasource.http',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/datasource.http',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
