var express = require('express');
var router = express.Router();

const productEditController = require('../controller/productEditController');

/* GET home page. */
router.get('/', productEditController.index);

module.exports = router;
