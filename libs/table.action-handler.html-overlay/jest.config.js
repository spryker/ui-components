module.exports = {
  name: 'table.action-handler.html-overlay',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.action-handler.html-overlay',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
