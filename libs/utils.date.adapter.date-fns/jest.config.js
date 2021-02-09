module.exports = {
  name: 'utils.date.adapter.date-fns',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/utils.date.adapter.date-fns',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
