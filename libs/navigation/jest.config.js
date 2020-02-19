module.exports = {
  name: 'navigation',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/navigation',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
