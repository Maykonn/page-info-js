const webpack = require('webpack');
const path = require('path');
require("es6-shim");

/**
 * Webpack configuration
 *
 * @author Maykonn Welington Candido<maykonn@outlook.com>
 */

module.exports = {
  entry: {
    'PageInfo': ['es6-shim', './index.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    library: "page-info-js",
    libraryTarget: "umd",
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  'targets': {
                    'browsers': ['>= 1%', 'IE >= 9'],
                  },
                },
              ],
            ],
          },
        },
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    })
  ]
}