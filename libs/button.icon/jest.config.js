module.exports = {
  name: 'button.icon',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/button.icon',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
