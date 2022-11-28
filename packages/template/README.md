# React app

## Tech Stack

<img src="https://img.shields.io/badge/React-v18-brightgreen?style=flat-square&logo=react&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/Webpack-v5-brightgreen?style=flat-square&logo=Webpack&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/WebpackDevServer-v4-brightgreen?style=flat-square&logo=Webpack&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/Babel-v7-brightgreen?style=flat-square&logo=babel&logoColor=yellow"/>

<img src="https://img.shields.io/badge/Eslint-v8-brightgreen?style=flat-square&logo=eslint&logoColor=blueviolet"/>

## Scripts

**`start`**

app을 시작합니다.

(`WebpackDevServer` 을 구동시켜 [localhost:3000](localhost:3000) 으로 app을 serving 합니다.)

```
npm start
```

start 스크립트는 기본적으로 `development mode` 빌드를 진행합니다. start 스크립트에서 `produnction mode` 빌드를 원하시면 아래와 같이 script를 수정해주세요.

> 사용하는 PC가 MacOS가 아니라면 [여기](https://github.com/kentcdodds/cross-env)를 참고해주세요.

```
"scripts": {
  "start": "WEBPACK_ENV=production node scripts/start.js",
  ...
}
```

**`build`**

app을 빌드합니다.

(빌드 결과물은 build 디렉토리에 생성됩니다.)

```
npm run build
```

build 스크립트는 기본적으로 `production mode` 빌드를 진행합니다. build 스크립트에서 `development mode` 빌드를 원하시면 아래와 같이 script를 수정해주세요.

> 사용하는 PC가 MacOS가 아니라면 [여기](https://github.com/kentcdodds/cross-env)를 참고해주세요.

```
"scripts": {
  "build": "WEBPACK_ENV=development node scripts/build.js",
  ...
}
```

**`test`**

테스트를 진행합니다.

```
npm test
```

**`lint`**

소스 코드 린트 검사 및 타입 검사를 진행합니다.

(문제가 있을 경우 에러를 던집니다.)

```
npm run lint
```

**`format`**

소스 코드에 포맷팅에 문제가 없는지 검사합니다.

(문제가 있을 경우 에러를 던집니다.)

```
npm run format
```

**`format:fix`**

소스 코드 포맷팅을 진행합니다.

(포맷팅에 문제가 있는 부분을 강제로 변경합니다.)

```
npm run format:fix
```

## Dotenv

아래는 적용 우선 순위대로 정렬된 dotenv 파일 유효 리스트 입니다.

- `.env.development`, `.env.production` ( .env.{process.env.NODE_ENV} )
- `.env`

기본적으로는 `.env` 파일을 프로젝트 루트에 생성하여 사용하면 됩니다. 만약, development mode 와 production mode 에서 사용하는 환경변수 값이 다르다면 `.env.development` 파일과 `.env.production` 파일을 프로젝트 루트에 생성하여 사용해주세요.

> NODE_ENV 값은 start 스크립트에서는 development, build 스크립트에서는 production 값이 기본 값입니다. NODE_ENV 값 커스텀을 원하시면 package.json 파일에서 scripts를 수정해주세요.

## Environment variables

아래는 빌드시에 필요한 환경변수입니다. 커스텀을 할 때에는 script를 수정하시면 됩니다.
| 환경 변수 | 기본 값 | 커스텀 가능 여부 | 설명 |
| :--------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: | :--------------: | :------------------------------------------------: |
| **NODE_ENV** | <table><thead><tr><th>start.js</th><th>build.js</th></tr></thead><tbody><tr><td>`'development'`</td><td>`'production'`</td></tr></tbody> </table> | ✅ | - |
| **WEBPACK_ENV** | <table><thead><tr><th>start.js</th><th>build.js</th></tr></thead><tbody><tr><td>`'development'`</td><td>`'production'`</td></tr></tbody> </table> | ✅ | 웹팩 빌드 mode |
| **DEPLOY** | <table><thead><tr><th>start.js</th><th>build.js</th></tr></thead><tbody><tr><td>`'false'`</td><td>`'true'`</td></tr></tbody> </table> | ❌ | build.js 실행 여부 (배포 여부) |
| **PUBLIC_URL** | `''` | ✅ | - |
| **OPEN_BROWSER** | `true` | ✅ | start.js 스크립트 실행 시 브라우저를 자동으로 실행 |
| **PORT** | `3000` | ✅ | 웹팩 개발 서버 포트 번호 |

## Polyfill

폴리필을 삽입하시려면 먼저 `core-js`를 설치하고:

```sh
npm i core-js@3
```

`src/index.tsx` 파일 최상단에서 `import` 하시면 됩니다:

```javascript
import 'core-js'; // on the top
```

**자세한 커스텀을 원하시면 .browserslistrc 파일을 수정해주세요. 기본값은 defaults 입니다.**

> `browserslist`에 대한 자세한 내용은
> <a href="https://github.com/browserslist/browserslist#readme" target="_blank">여기</a>를 참조해주세요.
