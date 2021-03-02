module.exports = {
  name: 'actions.drawer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/actions.drawer',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
