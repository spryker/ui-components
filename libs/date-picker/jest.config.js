module.exports = {
  name: 'date-picker',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/date-picker',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
