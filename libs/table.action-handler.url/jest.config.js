module.exports = {
  name: 'table.action-handler.url',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.action-handler.url',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
