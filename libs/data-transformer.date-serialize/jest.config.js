module.exports = {
  name: 'data-transformer.date-serialize',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.date-serialize',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
