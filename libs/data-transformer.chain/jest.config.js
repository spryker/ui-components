module.exports = {
  name: 'data-transformer.chain',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.chain',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
