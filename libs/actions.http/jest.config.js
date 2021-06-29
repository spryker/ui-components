module.exports = {
  name: 'actions.http',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/actions.http',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
