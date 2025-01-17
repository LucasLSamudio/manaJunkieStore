var express = require('express');
var router = express.Router();

const productDetailController = require('../controller/productDetailController');

/* GET home page. */
router.get('/', productDetailController.index);

module.exports = router;
