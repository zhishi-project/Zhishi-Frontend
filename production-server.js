var path = require('path');
var express  = require('express');
var webpack  = require('webpack');
var webpackMiddleware  = require('webpack-dev-middleware');
var webpackHotMiddleware  = require('webpack-hot-middleware');
var config  = require('./webpack.config.js');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 8080 : process.env.PORT;
var app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  var fs = require('fs')

  app.use(express.static(path.join(__dirname, 'build')))

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    // res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    res.write(fs.readFileSync(path.join(__dirname, 'build/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, 'build')))
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
