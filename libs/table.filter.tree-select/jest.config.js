module.exports = {
  name: 'table.filter.tree-select',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.filter.tree-select',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
