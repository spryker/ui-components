module.exports = {
  name: 'toggle',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/toggle',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
