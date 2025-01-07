var express = require('express');
var router = express.Router();

const carritoController = require('../controller/carritoController')
/* GET home page. */
router.get('/', carritoController.index);

module.exports = router;
