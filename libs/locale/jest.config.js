module.exports = {
  name: 'locale',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/locale',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
