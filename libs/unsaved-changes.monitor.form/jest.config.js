module.exports = {
  name: 'unsaved-changes.monitor.form',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/unsaved-changes.monitor.form',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
