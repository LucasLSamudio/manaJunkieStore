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

const upload = multer({
  dest: 'public/images/users',
  // fileFilter: ff
}
  // (req: express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback): void
);


// FUNCIONA GRACIAS A POSTMAN Y NO GRACIAS A THUNDER CLIENT

app.post('/images/single', upload.single('imagenPerfil'), (req, res) => {
  console.log(req.file);
  saveImage(req.file);
  res.send('No sé cómo pero funcioné.')
})

app.post('/images/multi', upload.array('photos', 5), (req, res) => {
  req.files.map(saveImage);
  res.send('No se como pero funcioné x2 (ahora en multi)')
})

// function ff (req, res, cb){
//   const filtro = /\.(jpg|jpeg|png|gif)$/;
//   if(filtro.test(req.files.originalname)){
//     console.log(filtro.test(req.files.originalname));
//     cb(null, true);
//   }else{
//     console.log(filtro.test(req.files.originalname));
//     req.errorValidationImage = "No se acepta este formato de imagenes."
//     cb(null, false);
//   }
// }

function saveImage (file) {
  const newPath = `public/images/users/${file.originalname}`;
  fs.renameSync(file.path, newPath);
  return newPath;
}



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
  resave : false,
  saveUninitialized : true
}));

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

let puerto = "http://localhost:3001/"
console.log(`Página corriendo en: ${puerto}`);


module.exports = app;