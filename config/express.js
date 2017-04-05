var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var env = process.env.NODE_ENV || 'development';
    var config = require('../utilities/rootPath')[env];


module.exports = function(app) {
    //app.set('view engine', 'jade');
    app.set('views', config.rootPath + 'views');
    console.log(config.rootPath + 'views');
    //app.set('views', path.join(__dirname, 'views'));
    //app.set('views', '../views');
    app.set('view engine', 'pug');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded( {extended: true} ));
    app.use(session({secret: '56950fe494af8e88204adf6d', resave: true, saveUninitialized: true}));

    app.use(passport.initialize());
    app.use(passport.session());
    //app.use(express.static(config.rootPath + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));


}
