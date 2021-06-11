module.exports = {
  name: 'actions.notification',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/actions.notification',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
