module.exports = {
  name: 'spinner',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/spinner',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
