module.exports = {
  name: 'table.filter.date-range',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/table.filter.date-range',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
