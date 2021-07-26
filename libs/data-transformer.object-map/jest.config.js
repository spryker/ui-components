module.exports = {
  name: 'data-transformer.object-map',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.object-map',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
