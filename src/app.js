require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const multer = require('multer');

const fs = require('fs') // 

/* RUTAS CONST */

const indexRouter = require('./routes/indexRoute');
const usersRouter = require('./routes/usersRoute');
const productsRouter = require('./routes/productsRoute');
const adminRouter = require('./routes/adminRoute');
const carritoRouter = require('./routes/carritoRoute');
const categoryRouter = require('./routes/categoriesRoute');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
  secret : 'miSecreto',
  resave : true,
  saveUninitialized : true
}));

app.use((req, res, next) => {
  res.locals.usuarioLogueado = req.session.user || null;
  next();
});

/* RUTAS USE */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/admin',adminRouter);
app.use('/carrito',carritoRouter);
app.use('/categorias',categoryRouter);


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
  res.render('error');
});

console.log(`Página corriendo en: http://localhost:${process.env.PORT}`);


module.exports = app;