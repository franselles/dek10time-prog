const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api/routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create link to Angular build directory
const distDir = __dirname + '/dist/';
app.use(express.static(distDir));

// CORS on ExpressJS
// Allow CORS with localhost in Chrome

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With'
  );
  next();
});

app.use('/api', api);

module.exports = app;
