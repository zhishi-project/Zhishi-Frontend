var express = require('express');
var path = require('path');
var open = require('open');
var compression = require('compression');

/* eslint-disable no-console */

const port = 8080;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
    console.log(`Server running on port: ${port}`);
  }
});
