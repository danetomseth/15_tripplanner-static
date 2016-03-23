var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');

var app = express();

// swig rendering boilerplate
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

// logging and body-parsing
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/node_modules'));

// serve static files
app.use(express.static(__dirname + '/public'));

// serve dynamic routes
app.use(require('./routes'));

// failed to catch req above means 404, forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.end();
});

var port = 3000
app.listen(port, function () {
  console.log('The server is listening closely on port', port);
});