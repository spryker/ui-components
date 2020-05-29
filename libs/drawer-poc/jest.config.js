module.exports = {
  name: 'drawer-poc',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/drawer-poc',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
