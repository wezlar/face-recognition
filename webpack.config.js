
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const PUBLIC_URL = '';
const ENV = process.env.production ? JSON.stringify('production') : JSON.stringify('development');

console.log('path: ' + path.join(__dirname, 'public'));

module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname, 'src', 'index.js')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 8080,
    publicPath: 'http://localhost:8080/',
    hotOnly: true,
  },
  node: {
    fs: 'empty',
  },
  devtool: 'source-map',
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
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
        use: [{
          loader: 'url-loader',
          options: { 
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'img/[hash]-[name].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(PUBLIC_URL),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
  ],
};
