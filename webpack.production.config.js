var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'build');
var entryPath = path.resolve(__dirname, 'app', 'js', 'index.js');
require('dotenv').config();

let GLOBALS = {};
Object.keys(process.env).forEach(name => {
  GLOBALS['process.env.' + name] = JSON.stringify(process.env[name]);
});
var config = {
  entry: entryPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /app\/js\/.+.js$/,
        loader: 'babel',
        exclude: [nodeModulesPath]
      },
      // SASS
      {
        test: /css\/.+.(scss|css)$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=25000'
      },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new Webpack.DefinePlugin(GLOBALS)
  ]

};

module.exports = config;
