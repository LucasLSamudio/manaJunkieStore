var express = require('express');
var router = express.Router();

const categoriesController = require('../controller/categoriesController')
/* GET home page. */
router.get('/', categoriesController.index);

module.exports = router;
