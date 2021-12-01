module.exports = {
  name: 'actions.close-drawer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/actions.close-drawer',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
