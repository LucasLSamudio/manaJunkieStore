const express = require('express');
const router = express.Router();

const productsController = require('../controller/productsController');
const userSessionCheck = require('../middlewares/userSessionCheck');
const uploadFile = require('../middlewares/uploadFile');

// localhost:3000/products/...

router.get('/', productsController.list);
router.get('/create',userSessionCheck, productsController.create);
router.get('/:id', productsController.detail);

router.post('/add', userSessionCheck, uploadFile.array('productImage'), productsController.add);

router.get('/edit/:id', userSessionCheck, productsController.edit);

router.put('/update/:id', userSessionCheck, uploadFile.array('productImage'),productsController.update);

router.delete('/delete/:id', userSessionCheck, productsController.delete);

router.get('/search',productsController.search);

module.exports = router;