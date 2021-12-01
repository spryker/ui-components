module.exports = {
  name: 'data-transformer.filter.range',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.filter.range',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
