var express = require('express');
var router = express.Router();
const objTienda = require('../db/logo')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: objTienda.name,
    foto: objTienda.foto,
    carousel: objTienda.carousel
  });
});

module.exports = router;
