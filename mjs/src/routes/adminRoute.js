var express = require('express');
var router = express.Router();

const adminController = require('../controller/adminController');
const adminCheck = require('../middlewares/adminCheck');

/* GET home page. */
router.get('/', adminCheck, adminController.index)

module.exports = router;