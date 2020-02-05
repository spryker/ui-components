module.exports = {
  name: 'styles',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/styles',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
