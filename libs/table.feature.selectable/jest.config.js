module.exports = {
  name: 'table.feature.selectable',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.selectable',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
