/*eslint-disable no-console, no-var */
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')
var compiler = webpack(WebpackConfig);

var app = express()
var port = process.env.PORT || 8080;

app.use(webpackDevMiddleware(compiler, {
  publicPath: WebpackConfig.output.public_path,
  // noInfo: true,
  // quiet: true,
  stats: {
    colors: true
  }
}));

app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log
}));


var fs = require('fs')
var path = require('path')

// serve static assets normally
app.use(express.static(path.join(__dirname, 'build')))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})


app.listen(port, function () {
  console.log("Server started at " + port + ", Ctrl+C to stop: ")
})
