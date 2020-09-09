module.exports = {
  name: 'interception',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/interception',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
