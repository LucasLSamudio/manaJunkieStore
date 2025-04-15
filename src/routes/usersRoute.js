const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const userSessionCheck = require('../middlewares/userSessionCheck');
const upload = require('../middlewares/uploadFile');

const loginUserValidator = require('../middlewares/loginUserValidator')
const registerUserValidator = require('../middlewares/registerUserValidator')


// localhost:3001/users/...

router.get('/login', userController.login);
router.post('/processLogin', loginUserValidator, userController.processLogin);

router.get('/register', userController.register);
router.post('/processRegister', registerUserValidator, userController.processRegister);

router.get('/profile',userSessionCheck, userController.profile);
router.put('/update/:id', userSessionCheck, upload.single('avatar'), registerUserValidator, userController.update);

router.get('/logout', userController.logout);


router.get('/a',userController.cookiePrueba);

module.exports = router;