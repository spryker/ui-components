module.exports = {
  name: 'data-transformer-filter',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer-filter',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
