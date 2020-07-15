module.exports = {
  name: 'headline',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/headline',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
