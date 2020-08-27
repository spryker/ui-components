module.exports = {
  name: 'table.feature.settings',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.feature.settings',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
