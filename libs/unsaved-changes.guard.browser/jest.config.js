module.exports = {
  name: 'unsaved-changes.guard.browser',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/unsaved-changes.guard.browser',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
