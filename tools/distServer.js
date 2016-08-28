var express = require('express');
var path = require('path');
var compression = require('compression');

/* eslint-disable no-console */

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 8080 : process.env.PORT;
var app = express();

app.use(compression());
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
