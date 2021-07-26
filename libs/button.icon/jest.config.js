module.exports = {
  name: 'button.icon',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/button.icon',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
