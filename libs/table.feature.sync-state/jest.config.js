module.exports = {
  name: 'table.feature.sync-state',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.sync-state',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
