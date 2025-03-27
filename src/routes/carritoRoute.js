const express = require('express');
const router = express.Router();

const carritoController = require('../controller/carritoController');
const userSessionCheck = require('../middlewares/userSessionCheck');

router.get('/', userSessionCheck, carritoController.index);

module.exports = router;
