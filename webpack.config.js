const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = dotenv.config().parsed;

const envKeys = env
  ? Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {})
  : {};

module.exports = (env, options) => {
  return {
    entry: ['@babel/polyfill', path.resolve(__dirname, './src/index.js')],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
      chunkFilename: '[name].[contenthash].js',
      publicPath: envKeys.LOCAL === 'true' ? './' : '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.module.s(a|c)ss$/,
          loader: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: options.mode === 'development',
                reloadAll: options.mode === 'development'
              }
            },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.scss']
    },
    devServer: {
      contentBase: path.resolve(__dirname, './src'),
      historyApiFallback: true,
      port: 3000
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false
      }),
      new webpack.DefinePlugin(envKeys)
    ]
  };
};
