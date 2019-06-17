
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const PUBLIC_URL = '';
const ENV = process.env.production ? JSON.stringify('production') : JSON.stringify('development');

const GLOBALS = {
  DEAN: 'dean',
  'process.env': {
    NODE_ENV: ENV,
    PUBLIC_URL,
  },
};

console.log('path: ' + path.join(__dirname, 'assets'));

module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname, 'src', 'index.js')],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: path.join(__dirname, 'assets'),
    filename: 'index.bundle.js',
  },
  node: {
    fs: 'empty',
  },
  devtool: 'source-map',
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },
  module: {
    rules: [
      {
        // this is so that we can compile any React,
        // ES6 and above into normal ES5 syntax
        test: /\.(js|jsx)$/,
        // we do not want anything from node_modules to be compiled
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|styl)$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: [
          {
            loader: 'file-loader', 
          },
          {
            loader: 'raw-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(PUBLIC_URL),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'assets/index.html'),
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL,
    }),
  ],
};
