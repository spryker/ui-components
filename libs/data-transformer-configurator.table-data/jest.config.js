module.exports = {
  name: 'data-transformer-configurator.table-data',
  preset: '../../jest.config.js',
  coverageDirectory:
    '../../coverage/libs/data-transformer-configurator.table-data',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
