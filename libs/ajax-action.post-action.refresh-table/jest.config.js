module.exports = {
  name: 'ajax-action.post-action.refresh-table',
  preset: '../../jest.config.js',
  coverageDirectory:
    '../../coverage/libs/ajax-action.post-action.refresh-table',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
