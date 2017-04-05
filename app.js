var express = require('express');
var env = process.env.NODE_ENV || 'development';
var apiRouter = require('./config/routes');
var app = express();
//var config = require('./server/config/config')[env];


//self-executing function
require('./config/express')(app);
require('./config/passport')();

app.use('/api', apiRouter);

app.use(function (req, res, next) {
  if (req.session.error) {
    var msg = req.session.error;
    req.session.error = undefined;
    app.locals.errorMessage = msg;
  }

  else {
    app.locals.errorMessage = undefined;
  }

  next();
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
