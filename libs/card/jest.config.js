module.exports = {
  name: 'card',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/card',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
