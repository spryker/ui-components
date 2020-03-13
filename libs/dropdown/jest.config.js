module.exports = {
  name: 'dropdown',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/dropdown',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
