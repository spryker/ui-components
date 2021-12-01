module.exports = {
  name: 'dropdown',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/dropdown',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
