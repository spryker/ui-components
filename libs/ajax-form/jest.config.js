module.exports = {
  name: 'ajax-form',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ajax-form',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
