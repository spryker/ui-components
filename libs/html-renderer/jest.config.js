module.exports = {
  name: 'html-renderer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/html-renderer',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
