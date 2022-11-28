declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
    readonly WEBPACK_ENV: 'development' | 'production';
    readonly DEPLOY: 'true' | 'false';
  }
}
