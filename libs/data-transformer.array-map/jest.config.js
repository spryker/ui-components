module.exports = {
  name: 'data-transformer.array-map',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.array-map',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
