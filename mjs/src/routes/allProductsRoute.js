var express = require('express');
var router = express.Router();

const allProductsController = require('../controller/allProductsController')

/* GET home page. */
router.get('/', allProductsController.index)

module.exports = router;
