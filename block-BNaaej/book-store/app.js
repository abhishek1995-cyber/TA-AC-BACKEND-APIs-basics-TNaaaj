var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
const booksv2Router = require("./routes/booksv2");
const booksv3Router = require("./routes/booksv3");

mongoose.connect('mongodb://localhost/book-store',(err)=>{
  console.log(err ? err : "Connected");
})

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/books', booksRouter);
app.use("/api/v2/books", booksv2Router);
app.use("/api/v3/books", booksv3Router);


module.exports = app;
