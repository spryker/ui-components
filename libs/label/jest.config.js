module.exports = {
  name: 'label',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/label',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
