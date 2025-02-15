const express = require('express');
const router = express.Router();
const session = require('express-session')

const userController = require('../controller/userController');

router.get('/login', userController.login);
router.post('/processLogin', userController.processLogin);

router.get('/register', userController.register);
router.post('/processRegister', userController.processRegister);

router.get('/profile', userController.profile);
router.put('/update', userController.update);
router.get('/logout', userController.logout);

router.get('/a',userController.cookiePrueba);


module.exports = router;
