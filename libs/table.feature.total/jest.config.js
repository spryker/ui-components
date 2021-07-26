module.exports = {
  name: 'table.feature.total',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.total',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
