module.exports = {
  name: 'chips',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/chips',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
