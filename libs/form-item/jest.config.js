module.exports = {
  name: 'form-item',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/form-item',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
