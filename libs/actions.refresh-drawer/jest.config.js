module.exports = {
  name: 'actions.refresh-drawer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/actions.refresh-drawer',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
