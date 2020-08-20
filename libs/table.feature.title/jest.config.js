module.exports = {
  name: 'table.feature.title',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.title',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
