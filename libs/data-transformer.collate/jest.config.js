module.exports = {
  name: 'data-transformer.collate',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.collate',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
