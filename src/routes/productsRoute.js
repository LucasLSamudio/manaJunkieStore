const express = require('express');
const router = express.Router();

const productsController = require('../controller/productsController');
const userSessionCheck = require('../middlewares/userSessionCheck');
const uploadFile = require('../middlewares/uploadFile');
const addProductValidator = require('../middlewares/validations/addProductValidator')
const editProductValidator = require('../middlewares/validations/editProductValidator')

// localhost:3001/products/...

router.get('/', productsController.list);
router.get('/create',userSessionCheck, productsController.create);
router.get('/:id', productsController.detail);

router.post('/add', userSessionCheck, uploadFile.array('productImage'), addProductValidator, productsController.add);

router.get('/edit/:id', userSessionCheck, productsController.edit);

router.post('/update/:id', userSessionCheck, uploadFile.array('productImage'), productsController.update);

router.delete('/delete/:id', userSessionCheck, productsController.delete);

router.get('/search',productsController.search);

module.exports = router;