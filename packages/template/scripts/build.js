/**
 * ==================================================
 *                     Requires
 * ==================================================
 */
require('./env').init('build');

const webpack = require('webpack');

const createWebpackConfig = require('./configs/webpack.config');

/**
 * ==================================================
 *                     Build script
 * ==================================================
 */

let compiler;
let webpackConfig;
const logger = console;
const webpackEnv = process.env.WEBPACK_ENV;
try {
  logger.log(`Configuring...(1/2)`);
  webpackConfig = createWebpackConfig(webpackEnv);
  compiler = webpack(webpackConfig);
} catch (error) {
  logger.log(`(❗️) Failed to configure. (❗️)`);
  logger.error(error.message ? error.message : error);
  process.exit(1);
}
logger.log(`Configured successfully! ✅`);

logger.log(`\nCompiling...(2/2)`);
compiler.run((error, stats) => {
  const statsError = stats && typeof stats.hasErrors === 'function' && stats.hasErrors();
  const statsWarning = stats && typeof stats.hasWarnings === 'function' && stats.hasWarnings();

  if (error || statsError || statsWarning) {
    logger.log('(❗️) Failed to compile. (❗️)\n');

    if (error) {
      logger.error(error.stack || error);
      if (error.details) {
        logger.error(error.details);
      }
    }

    const info = stats.toJson({ all: false, warnings: true, errors: true });

    if (statsError) {
      info.errors.forEach((error) => {
        logger.error(error.message);
      });
    }

    if (statsWarning) {
      info.warnings.forEach((warning) => {
        logger.warn(warning.message);
      });
    }
  } else {
    logger.log(stats.toString({ colors: true }));
  }
});
