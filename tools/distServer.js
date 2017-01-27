var express = require('express');
var path = require('path');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var environment = require('../app/js/config/environment/index.js');
var CVar = require('../app/js/config/CookieVariables.js');
var Raven = require('raven');

/* eslint-disable no-console */

var isDeveloping = (
  process.env.NODE_ENV !== 'production' &&
  process.env.NODE_ENV !== 'staging'
);

// Just to make a change

var port = isDeveloping ? 8080 : (process.env.PORT || 8080);
var app = express();

app.use(compression());

if (!isDeveloping) {
  app.use((req, res, next) => {
    if (!req.headers.host.match(/andela.co/) && !process.env.VALID_COOKIE) {
      return res.redirect(environment.zhishiPermanentSite + req.url);
    }
    next();
  });
}

app.use(cookieParser());
app.use((req, res, next) => {
  res.cookie(CVar.apiUrl, process.env.ENGINE_HOST);
  next();
});

app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port: ${port}`);
  }
});
