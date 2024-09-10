export default {
    displayName: 'carousel',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/carousel',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
    moduleNameMapper: {
        swiper: 'swiper/core/core.js',
    },
};
