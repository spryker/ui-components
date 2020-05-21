module.exports = {
  name: 'button-link',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/button-link',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
