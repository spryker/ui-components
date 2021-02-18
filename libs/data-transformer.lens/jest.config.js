module.exports = {
  name: 'data-transformer.lens',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.lens',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
