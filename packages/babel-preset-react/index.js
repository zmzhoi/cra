'use strict';

const { hasTypescriptConfigFile, hasReactJsxRuntime, getBabelRuntimePath } = require('./utils');

const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

const isProduction = env === 'production';
const usingTypescript = hasTypescriptConfigFile();
const usingJsxRuntime = hasReactJsxRuntime();
const babelRuntimePath = getBabelRuntimePath();

function _createPresets() {
  const presets = [
    // @babel/preset-env 프리셋 적용.
    [
      '@babel/preset-env',
      env === 'test'
        ? {
            // [테스트 환경]
            //  - targets: { node: 'current' }
            //   (현재 구동중인 node 버전을 targets으로 한다.)
            targets: {
              node: 'current',
            },
          }
        : {
            // [브라우저 환경]
            //  - targets: No targets
            //   (현재는 targets 이 지정되지 않은 상태이므로, Oldest browsers를 대상으로 한다.)
            //   (targets을 지정하는 것이 권장된다. -> 호스트 프로젝트에서 .browserslistrc 파일 생성.)
            //  - useBuiltIns: entry
            //   (폴리필(corejs) 삽입을 허용한다. -> 필요시 entry 파일 최상단에 삽입 필요.)
            //   (넓은 지원을 위해 corejs는 3버전을 사용한다.)
            useBuiltIns: 'entry', // Web app 프로젝트에서 사용하는 babel preset으로, 전역객체를 수정 하는 방식 사용.
            corejs: 3,
          },
    ],

    // @babel/preset-react 프리셋 적용.
    [
      '@babel/preset-react',
      {
        development: env !== 'production',
        runtime: usingJsxRuntime ? 'automatic' : 'classic', // jsx-runtime이 react 구버전까지 backporting 되었다고 함.
      },
    ],

    // 타입스크립트 사용시, @babel/preset-typescript 프리셋 적용.
    usingTypescript && ['@babel/preset-typescript'],
  ].filter(Boolean);

  return presets;
}

function _createPlugins() {
  const plugins = [
    // optional-chaining, nullish coalescing는 @babel/preset-env에서 지원하고 있지만, 웹팩에서 이슈가 존재해서 추가되었다.
    //          * 아래는 'babel-preset-react-app'의 설명이다. *
    // Optional chaining and nullish coalescing are supported in @babel/preset-env,
    // but not yet supported in webpack due to support missing from acorn.
    // These can be removed once webpack has support.
    // See https://github.com/facebook/create-react-app/issues/8445#issuecomment-588512250
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',

    // production 에서는 PropTypes 코드를 지워준다.
    isProduction && 'babel-plugin-transform-react-remove-prop-types',

    // @babel/plugin-transform-runtime 플러그인 사용.
    //  - 코드 사이즈를 줄이기 위해 사용.
    //  - 파일마다 생성되는 helpers(eg. classCallCheck) 들을 @babel/runtime 모듈 참조하는 require문으로 변경.
    //  - regenerator 생성이 필요할 때, @babel/runtime 모듈 참조하는 require문으로 변경. -> regenerator 전역 오염 방지.
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false, // corejs(폴리필)은 @babel/plugin-transform-runtime 에서 관여하지 않음.
        helpers: true, // Babel helpers 구문을 @babel/runtime을 참조하게 처리
        regenerator: true, // Regenerator 구문을 @babel/runtime 참조하게 처리
        absoluteRuntime: babelRuntimePath,
        version: require(babelRuntimePath + '/package.json').version, // 버전 명시.
      },
    ],
  ].filter(Boolean);

  return plugins;
}

// eslint-disable-next-line no-unused-vars
module.exports = function (api, opts) {
  // TODO: api option 조사
  // opts option은 추후 필요해지면 사용할 예정.
  return {
    presets: _createPresets(),
    plugins: _createPlugins(),
  };
};
