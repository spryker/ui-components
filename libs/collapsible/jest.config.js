module.exports = {
  name: 'collapsible',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/collapsible',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
