module.exports = {
  name: 'unsaved-changes.guard.browser',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/unsaved-changes.guard.browser',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
