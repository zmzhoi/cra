const path = require('path');

const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PostCssPresetEnv = require('postcss-preset-env');
const PostcssNormalize = require('postcss-normalize');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const paths = require('./paths');
const { createClientEnv } = require('../env');

const moduleID = Symbol();
const clientEnv = createClientEnv();

module.exports = function (env) {
  const isProduction = env === 'production';
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];
  const assetInlineSizeLimit = 10 * 1024; // 10KB

  const webpackConfig = {
    mode: env,
    entry: {
      app: paths.entry, // name: 'app'
    },
    output: {
      path: paths.output,
      filename: 'js/bundle.js', // = output.path + output.filename
      assetModuleFilename: 'asset/[name][ext]',
      clean: true,
      ...(process.env.PUBLIC_URL && {
        publicPath: process.env.PUBLIC_URL.endsWith('/')
          ? process.env.PUBLIC_URL
          : process.env.PUBLIC_URL + '/',
      }),
    },
    resolve: {
      extensions,
      plugins: [
        new TsconfigPathsPlugin({
          configFile: paths.tsConfigFile,
        }),
      ],
    },
    devtool: isProduction ? false : 'eval-source-map',
    module: {
      rules: [
        {
          oneOf: [
            // Asset Module
            {
              [moduleID]: 'ASSET_RULE',
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g/, /\.png$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: assetInlineSizeLimit,
                },
              },
            },
            // Svg-Loader
            {
              [moduleID]: 'SVG_RULE',
              test: /\.svg$/,
              use: ['@svgr/webpack'],
            },
            // Babel-Loader
            {
              [moduleID]: 'BABEL_RULE',
              test: /\.(js|jsx|ts|tsx)$/,
              include: paths.src,
              loader: 'babel-loader',
              options: {
                // Refresh webpack plugin enable only development mode
                plugins: [!isProduction && require.resolve('react-refresh/babel')].filter(Boolean),

                // The result of caching will be placed in ./node_modules/.cache/babel-loader/
                // This help to be faster when rebuilding.
                cacheDirectory: true,
                cacheCompression: false,
                compact: isProduction,
              },
            },
            {
              // Style-Loader + Css-Loader + PostCss-Loader
              [moduleID]: 'CSS_RULE',
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [PostCssPresetEnv(), PostcssNormalize()],
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.htmlTemplate,
      }),
      new ESLintPlugin({
        extensions,
        failOnWarning: process.env.DEPLOY === 'true', // On deploy, Even a eslint warning will throw an error.
        cache: true,
        cacheLocation: path.resolve(paths.nodeModules, '.cache/.eslintcache'),
      }),
      new Webpack.DefinePlugin({
        'process.env': JSON.stringify(clientEnv),
      }),
      !isProduction && new ReactRefreshWebpackPlugin({ overlay: false }), // Refresh webpack plugin enable only development mode
      new ForkTsCheckerWebpackPlugin({
        async: !isProduction, // if true, reports issues after webpack build.
      }),
    ].filter(Boolean),
  };

  if (isProduction) {
    const webpackModuleRules = webpackConfig.module.rules[0].oneOf;

    /** Set Optimization. **/
    webpackConfig.optimization = {
      minimize: true,
      minimizer: [],
    };

    /** Change name of bundle file. **/
    webpackConfig.output.filename = 'js/[name].[contenthash:8].js';

    /** Change name of asset files. **/
    webpackConfig.output.assetModuleFilename = 'asset/[hash][ext][query]';

    /** Change handling css. **/
    /* (+) MiniCssExtractPlugin
     * Output path: /build/css/[name].[contenthash:8].css
     */
    const cssRule = webpackModuleRules.find((rule) => rule[moduleID] === 'CSS_RULE');
    cssRule.use = [
      MiniCssExtractPlugin.loader, // To use MiniCssExtractPlugin, style-loader is removed.
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [PostCssPresetEnv(), PostcssNormalize()],
          },
        },
      },
    ];
    webpackConfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
      }),
    );
    webpackConfig.optimization.minimizer.push(new CssMinimizerPlugin());

    // Set terser-webpack-plugin
    webpackConfig.plugins.push(
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // drop console.log()
          },
        },
      }),
    );
    // others..
  }

  return webpackConfig;
};
