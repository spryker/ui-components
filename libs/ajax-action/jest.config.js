module.exports = {
  name: 'ajax-action',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ajax-action',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
