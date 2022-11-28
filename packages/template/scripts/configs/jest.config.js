const paths = require('./paths');

module.exports = {
  rootDir: paths.root,
  testEnvironment: 'jsdom', // jsdom 환경 구축
  setupFilesAfterEnv: ['<rootDir>/scripts/configs/jestSetup.js'], // 테스트를 위한 추가 환경 설정(@testing-librart/jest-dom)
  testMatch: [
    // 기본 값이긴 하나, 명시적 작성.
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    // Asset 파일 로드시 mocking
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/scripts/configs/jestStyleTransformer.js',
    '\\.(css|less)$': '<rootDir>/scripts/configs/jestStyleTransformer.js',
    '^@/*(.*)$': '<rootDir>/src/$1',
  },
};
