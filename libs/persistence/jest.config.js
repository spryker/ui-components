module.exports = {
  name: 'persistence',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/persistence',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
