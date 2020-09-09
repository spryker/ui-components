module.exports = {
  name: 'unsaved-changes.monitor.form',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/unsaved-changes.monitor.form',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
