module.exports = {
  name: 'data-transformer.configurator.table',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.configurator.table',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
