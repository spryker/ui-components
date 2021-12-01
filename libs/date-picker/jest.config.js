module.exports = {
  name: 'date-picker',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/date-picker',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
