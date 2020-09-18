var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require("dotenv");
var cors = require("cors");
var bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todosRouter = require('./routes/todos');

dotenv.config();

const auth = require("./config/auth");

var app = express();

//Set up mongoose connection
var mongoose = require("mongoose");

var mongoDB =
  "mongodb://user:" +
  process.env.MONGODB_PASSWORD +
  "@cluster0-shard-00-00.zxjpq.mongodb.net:27017,cluster0-shard-00-01.zxjpq.mongodb.net:27017,cluster0-shard-00-02.zxjpq.mongodb.net:27017/test?ssl=true&replicaSet=atlas-pqsmc6-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth.getToken);
app.use(express.static(path.join(__dirname, "client/build")));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todos', todosRouter);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error');
});

module.exports = app;
