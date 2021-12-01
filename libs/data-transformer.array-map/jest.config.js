module.exports = {
  name: 'data-transformer.array-map',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.array-map',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
