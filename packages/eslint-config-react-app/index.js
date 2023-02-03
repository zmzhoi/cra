const { hasBabelConfigFile } = require('./utils');

var hasBabel = hasBabelConfigFile();

module.exports = {
  // 루트 설정 파일로 지정
  root: true,

  // babel config 파일을 사용 중이면 Espress가 아닌, @babel/eslint-parser를 사용한다. (package.json 은 체크하지 않음)
  parser: hasBabel ? '@babel/eslint-parser' : undefined,

  // [Eslint Parser 옵션 설정]
  parserOptions: {
    ecmaVersion: 2018, // ECMAScript 2018
    ecmaFeatures: {
      jsx: true, // ECMAScript 표준 JSX 사용
    },
    sourceType: 'module', // ESM 모듈(import/export)을 사용
  },

  // [런타임별 전역 변수 사용 설정]
  env: {
    browser: true, // 브라우저 전역 변수 사용(e.g. window, IntersectionObserver, etc)
    es6: true, // ES6 전역 변수 사용(e.g. Promise, etc)
    node: true, // NodeJS 전역 변수 사용(e.g. process, etc)
    commonjs: true, // CommonJS 전역 변수 사용
  },

  // ..
  settings: {
    react: {
      version: 'detect',
    },
  },

  // [Eslint Sharable Config 설정]
  extends: [
    'eslint:recommended', // eslint 에서 추천하는 룰 적용.
    'plugin:react/recommended', // eslint-plugin-react 에서 추천하는 룰 적용.
    'plugin:react-hooks/recommended', // eslint-plugin-react-hooks 에서 추천하는 룰 적용.
    'prettier', // eslint-config-prettier 적용. (prettier 룰을 off 해주는 eslint 설정)
  ],

  // [Eslint Plugin 설정]
  // * eslint-plugin-import 사용 -> import/export 관련 린트
  // * eslint-plugin-jsx-a11y 사용:  JSX 내의 접근성 문제에 대해 즉각적인 AST 린팅 피드백을 제공
  plugins: ['import', 'jsx-a11y'],

  // 추가 룰 적용.
  rules: {
    'no-empty': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
    'react/display-name': ['off', { ignoreTranspilerName: false }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-else-return': 0,
    'prefer-object-spread': 0,
    'react/destructuring-assignment': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'func-names': 0,
    'react/require-default-props': 0,
    'no-unused-vars': [
      'warn',
      {
        // underscore pattern 변수는 no-unused-vars 옵션에서 제외
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'no-console': 0,
    'react/react-in-jsx-scope': 0,
    'react/forbid-prop-types': 0,
    'react/prop-types': 0,
    'no-restricted-exports': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'no-shadow': 0,
    'react/no-array-index-key': 0,
    'no-debugger': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'no-return-assign': 0,
    'arrow-body-style': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'import/no-named-as-default-member': 0,
    'import/order': [
      'warn',
      {
        // import 하는 모듈 타입 별 newline으로 구분
        'newlines-between': 'always',
        // 모듈별 import 순서 : builtin -> external -> internal -> relative module -> object
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent', 'index'], 'object'],
        // Alias of internal module
        // e.g. import Something from '@/components/Something';
        pathGroups: [
          {
            pattern: '@/**/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },

  // 이외 추가 설정 (Typescript, Jest)
  overrides: [
    // Typescript 환경에 대한 린트 적용.
    {
      // Typescript 린트를 적용할 대상 파일
      files: ['**/*.ts?(x)'],

      // // typescript 파일은 Espress가 아닌, @typescript-eslint/parser 를 사용한다.
      parser: '@typescript-eslint/parser',

      // [Eslint Parser 옵션 설정]
      parserOptions: {
        ecmaVersion: 2018, // ECMAScript 2018
        sourceType: 'module', // ESM 모듈(import/export)을 사용
        ecmaFeatures: {
          jsx: true, // ECMAScript 표준 JSX 사용
        },
        warnOnUnsupportedTypeScriptVersion: true, // 지원되지 않는 Typescript 버전 사용시 경고
      },

      // [Eslint Plugin 설정]
      // * @typescript-eslint/eslint-plugin -> Typescript 관련 린트
      plugins: ['@typescript-eslint'],

      // [Eslint Sharable Config 설정]
      // @typescript-eslint/eslint-plugin 에서 추천하는 룰 적용
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],

      // 추가 룰 적용.
      rules: {
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            // underscore pattern 변수는 no-unused-vars 옵션에서 제외
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },

    // Jest 환경에 대한 린트 적용.
    {
      // Jest 린트를 적용할 대상 파일
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],

      // [Eslint Sharable Config 설정]
      extends: ['plugin:jest/recommended'], // eslint-plugin-jest 에서 추천하는 룰 적용

      // [Eslint Plugin 설정]
      // * eslint-plugin-testing-library
      plugins: ['testing-library'],

      // [테스트 관련 전역 변수 사용 설정]
      env: {
        jest: true, // Jest 전역 변수 사용 (e.g. jest)
        'jest/globals': true, // Jest 전역 변수 사용 (e.g. describe, it, test, etc)
      },

      // 추가 룰 적용.
      rules: {
        'jest/no-focused-tests': 'off',
        'jest/expect-expect': 'off',
        'jest/no-done-callback': 'off',
      },
    },
  ],
};
