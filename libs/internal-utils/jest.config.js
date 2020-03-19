module.exports = {
  name: 'internal-utils',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/internal-utils',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
