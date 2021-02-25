module.exports = {
  name: 'data-transformer.filter.text',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.filter.text',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
