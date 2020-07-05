// production config
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');
const { resolve } = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: resolve(__dirname, '../src/index.tsx'),
  devtool: 'inline-source-map',

  /** Output files */
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js',
    // chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    compress: true,
    port: 9000,
    hot: true
  },

  /** Performance of development build */
  performance: {
    hints: false,
  },

  /** Aliases to resolve */
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    }
  },
  plugins: [
    /** Hot Module Replacement Plugin*/
    new webpack.HotModuleReplacementPlugin(),
  ],
});