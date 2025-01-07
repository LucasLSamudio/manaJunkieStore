var express = require('express');
var router = express.Router();

const registerController = require('../controller/registerController');

/* GET home page. */
router.get('/', registerController.index);

module.exports = router;
