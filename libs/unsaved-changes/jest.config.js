module.exports = {
  name: 'unsaved-changes',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/unsaved-changes',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
