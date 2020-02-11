module.exports = {
  name: 'web-components',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/web-components',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
