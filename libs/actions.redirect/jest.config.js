module.exports = {
  name: 'actions.redirect',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/actions.redirect',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
