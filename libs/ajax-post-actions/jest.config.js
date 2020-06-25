module.exports = {
  name: 'ajax-post-actions',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ajax-post-actions',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
