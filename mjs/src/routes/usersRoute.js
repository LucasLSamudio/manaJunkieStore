var express = require('express');
var router = express.Router();


const userController = require('../controller/userController')

router.get('/login', userController.login);

router.get('/register', userController.register);

module.exports = router;
