module.exports = {
  name: 'sidebar',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/sidebar',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
