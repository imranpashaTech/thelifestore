var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const fileUpload = require('express-fileupload');
// const history = require('connect-history-api-fallback');

const secure = require('./const/secure');
const globalConst = require('./const/globalConst');

// var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');

var app = express();

app.use(express.static('./public'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // res.header('Content-Disposition', 'attachment');

  next();
});

// const staticFileMiddleware = express.static(__dirname);
// app.use(staticFileMiddleware);
// app.use(history({
//   disableDotRule: true,
//   verbose: true
// }));
// app.use(staticFileMiddleware);

const SESS_LIFETIME =1000*60*60*24;
const SESS_NAME = secure.SESS.NAME;
const SESS_SECRET = secure.SESS.SECRET; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,//can be true
    cookie: { 
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: false //true in production 
    }
  }));

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use(globalConst.path.root+'/', indexRouter);
app.use(globalConst.path.root+'/users', usersRouter);
app.use(globalConst.path.root+'/products', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.redirect('/');

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
