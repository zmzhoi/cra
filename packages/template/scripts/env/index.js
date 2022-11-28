'use strict';

const fs = require('fs');

let dotenvConfig = { parsed: {} };

module.exports.init = function (scriptType) {
  // Set env that is needed for build.
  setBuildEnvironment(scriptType);
};

function setBuildEnvironment(scriptType) {
  // Set NODE_ENV if it's not injected from cli.
  switch (scriptType) {
    case 'start':
      // If NODE_ENV is undefined, it will be development by default in start script.
      if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'development';
      }
      // If WEBPACK_ENV is undefined, it will be development by default in start script.
      if (!process.env.WEBPACK_ENV) {
        process.env.WEBPACK_ENV = 'development';
      }
      process.env.DEPLOY = 'false'; // deploy is 'false'
      break;
    case 'build':
      // If NODE_ENV is undefined, it will be production by default in build script.
      if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'production';
      }
      // If WEBPACK_ENV is undefined, it will be production by default in start script.
      if (!process.env.WEBPACK_ENV) {
        process.env.WEBPACK_ENV = 'production';
      }
      process.env.DEPLOY = 'true'; // deploy is 'true'
      break;
    default:
      break;
  }

  // Get environment variables from dotenv file if it exists.
  const dotenvFiles = [`.env.${process.env.NODE_ENV}`, `.env`];
  for (const dotenv of dotenvFiles) {
    if (fs.existsSync(dotenv)) {
      dotenvConfig = require('dotenv').config({ path: dotenv });

      // dotenv ignore NODE_ENV.
      if (dotenvConfig.parsed.NODE_ENV) {
        delete dotenvConfig.parsed.NODE_ENV;
      }

      break;
    }
  }

  if (!process.env.PUBLIC_URL) {
    process.env.PUBLIC_URL = dotenvConfig.parsed.PUBLIC_URL || '';
  }
}

module.exports.createClientEnv = function () {
  let clientEnv;

  // Set client environment variables with dotenv file if it exists.
  clientEnv = dotenvConfig.parsed;

  // Overwrite only major environment variables.
  Object.assign(clientEnv, {
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_URL: process.env.PUBLIC_URL,
    WEBPACK_ENV: process.env.WEBPACK_ENV,
    DEPLOY: process.env.DEPLOY,
  });

  return clientEnv;
};
