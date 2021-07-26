module.exports = {
  name: 'button.action',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/button.action',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
