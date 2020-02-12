module.exports = {
  name: 'logo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/logo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
