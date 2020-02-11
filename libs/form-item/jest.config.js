module.exports = {
  name: 'form-item',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/form-item',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
