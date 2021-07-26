module.exports = {
  name: 'data-serializer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-serializer',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
