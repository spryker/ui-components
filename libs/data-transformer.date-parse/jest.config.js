module.exports = {
  name: 'data-transformer.date-parse',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.date-parse',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
