module.exports = {
    roots: ['<rootDir>/src'],
    modulePaths: ['<rootDir>', 'src'],
    moduleNameMapper: {
        '@/(.*)': ['<rootDir>/src/$1'],
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
