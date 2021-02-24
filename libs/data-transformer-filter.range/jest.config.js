module.exports = {
  name: 'data-transformer-filter.range',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer-filter.range',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
