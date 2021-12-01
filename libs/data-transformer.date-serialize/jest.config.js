module.exports = {
  name: 'data-transformer.date-serialize',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.date-serialize',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
