module.exports = {
  name: 'popover',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/popover',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
