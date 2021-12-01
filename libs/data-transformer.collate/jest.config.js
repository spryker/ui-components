module.exports = {
  name: 'data-transformer.collate',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.collate',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
