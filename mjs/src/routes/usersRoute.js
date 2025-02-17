const express = require('express');
const router = express.Router();


const userController = require('../controller/userController');
const userSessionCheck = require('../middlewares/userSessionCheck');
const upload = require('../middlewares/uploadFile');

// localhost:3001/users/...

router.get('/login', userController.login);
router.post('/processLogin', userController.processLogin);

router.get('/register', userController.register);
router.post('/processRegister', userController.processRegister);

router.get('/profile/:id',userSessionCheck, userController.profile);
router.put('/update/:id', userSessionCheck, upload.single('avatar'), userController.update);

router.get('/logout', userController.logout);


router.get('/a',userController.cookiePrueba);

module.exports = router;