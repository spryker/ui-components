module.exports = {
  name: 'data-transformer.pluck',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.pluck',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
