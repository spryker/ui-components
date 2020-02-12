module.exports = {
  name: 'form-item',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/form-item',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
