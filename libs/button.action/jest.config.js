module.exports = {
  name: 'button.action',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/button.action',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
