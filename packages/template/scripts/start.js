/**
 * ==================================================
 *                     Requires
 * ==================================================
 */
require('./env').init('start');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const createWebpackConfig = require('./configs/webpack.config');
const createWebpackDevServerConfig = require('./configs/webpackDevServer.config');

/**
 * ==================================================
 *                     Start script
 * ==================================================
 */

let webpackConfig;
let webpackDevServerConfig;
let compiler;
let server;
const logger = console;
const webpackEnv = process.env.WEBPACK_ENV;
try {
  logger.log(`Configuring...`);
  webpackConfig = createWebpackConfig(webpackEnv);
  webpackDevServerConfig = createWebpackDevServerConfig();
  compiler = webpack(webpackConfig);
  server = new webpackDevServer(webpackDevServerConfig, compiler);
} catch (error) {
  logger.log(`(❗️) Failed to configure. (❗️)`);
  logger.error(error.message ? error.message : error);
  process.exit(1);
}

logger.log(`Configured successfully! ✅`);

server.startCallback((error) => {
  if (error) {
    logger.log(`(❗️) Failed to start the development server. (❗️)`);
    logger.error(error);
    process.exit(1);
  }

  logger.log(`\nStarting the server...`);
});
