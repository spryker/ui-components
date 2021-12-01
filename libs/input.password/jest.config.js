module.exports = {
  name: 'input.password',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/input.password',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
