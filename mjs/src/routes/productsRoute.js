const express = require('express');
const router = express.Router();

const productsController = require('../controller/productsController');

// localhost:3000/products/...

router.get('/', productsController.list);
router.get('/create', productsController.create);
router.get('/:id', productsController.detail);

router.post('/add',productsController.add);

router.get('/edit/:id', productsController.edit);

router.put('/update/:id', productsController.update);

router.delete('/delete/:id', productsController.delete);

router.get('/search',productsController.search);

module.exports = router;