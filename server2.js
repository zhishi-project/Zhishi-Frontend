/*eslint-disable no-console, no-var */
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')
var compiler = webpack(WebpackConfig);

var app = express()
var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 8080 : process.env.PORT;

var fs = require('fs')
var path = require('path')

if (!isDeveloping) {
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
