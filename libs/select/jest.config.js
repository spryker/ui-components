module.exports = {
  name: 'select',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/select',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
