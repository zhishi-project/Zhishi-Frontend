var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    // 'webpack-dev-server/client?http://localhost:8000',
    path.resolve(__dirname, './app/js/app.js')
  ],
  devServer: {
    inline: true
  },
  output: {
    path: '/',
    filename: 'bundle.js',
    public_path: '/'
  },

  module: {
    loaders: [
      {
        test: /app\/js\/.+.js$/,
        exclude: /node_modules/,
        loader: 'babel'
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
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },

  plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
  ]

};
