module.exports = {
  name: 'utils.date.adapter.date-fns',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/utils.date.adapter.date-fns',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
