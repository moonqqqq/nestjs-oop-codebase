export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '\\.spec\\.ts$', // .spec.ts 파일만 테스트
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  rootDir: '../', // 루트 디렉토리 지정
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
