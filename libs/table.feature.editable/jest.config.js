module.exports = {
  name: 'table.feature.editable',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.editable',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
