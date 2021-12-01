module.exports = {
  name: 'data-transformer.configurator.table',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-transformer.configurator.table',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
