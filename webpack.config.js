const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { rules } = require('./webpack.opts.rules');

module.exports = {
  devServer: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync('./assets/keys/key.pem'),
      cert: fs.readFileSync('./assets/keys/cert.pem'),
    },
    hot: true,
  },
  devtool: 'source-map',
  entry: {
    index: './src/index.jsx',
  },
  mode: 'development',
  module: {
    rules,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      inject: false,
      template: './index.html',
    }),
  ],
};
