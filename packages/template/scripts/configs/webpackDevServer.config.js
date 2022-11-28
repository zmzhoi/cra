const path = require('path');

const paths = require('./paths');
const { toSpecifiedHost } = require('../utils');

/**
 * Reference: https://webpack.kr/configuration/dev-server/#root
 * 주요 옵션들은 default 값 이어도 명시적 선언.
 */
module.exports = function ({ proxy } = {}) {
  const open = process.env.OPEN_BROWSER !== 'false';
  const host = process.env.HOST || '0.0.0.0';
  const port = parseInt(process.env.PORT, 10) || 3000;

  return {
    allowedHosts: 'auto', // 👀
    bonjour: false, // 👀
    historyApiFallback: true, // SPA는 CSR을 위해 HTML5 History API를 사용하기 때문에 개발 서버는 없는 경로를 요청받아도 index.html을 응답하게 처리해줘야한다. 이 옵션을 활성화하면 없는 url 요청이 들어와도 원래처럼 404를 응답하지 않고 index.html을 응답한다.
    hot: true, // HMR(Hot-Module-Replacement) v4부터 기본 활성화
    liveReload: false,
    open: open ? (process.env.PUBLIC_URL ? [process.env.PUBLIC_URL] : true) : false,
    host: toSpecifiedHost(host),
    port,
    server: 'http',
    compress: true, // gzip 여부
    static: {
      // ✨ 정적 파일 제공 옵션
      watch: true, // 지정된 directory 감시. 변경시 페이지 reload.
      directory: path.resolve(paths.root, 'public'),
      ...(process.env.PUBLIC_URL && {
        publicPath: process.env.PUBLIC_URL.endsWith('/')
          ? process.env.PUBLIC_URL
          : process.env.PUBLIC_URL + '/',
      }),
    },
    webSocketServer: 'ws', // 👀
    client: {
      logging: 'verbose', // 브라우저에서 로그 수준 ('log' | 'info' | 'warn' | 'error' | 'none' | 'verbose')
      overlay: {
        // 컴파일 오류가 있는 경우 브라우저 화면에 오버레이 표시
        errors: true,
        warnings: false,
      },
      progress: false, // 브라우저에서 컴파일 진행률을 백분율로 출력 여부
      reconnect: true, // 클라이언트 재연결 시도 횟수 (true === 무한)
    },
    ...(proxy && { proxy }), // 개발API 서버에 API 요청을 보낼 때 유용한 Proxy-Middleware 적용 여부
  };
};
