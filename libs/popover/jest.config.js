module.exports = {
  name: 'popover',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/popover',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
