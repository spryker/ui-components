module.exports = {
  name: 'actions.refresh-table',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/actions.refresh-table',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
