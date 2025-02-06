const express = require('express');
const router = express.Router();

const productsController = require('../co   ntroller/productsController');

// localhost:3000/products/...

router.get('/', productsController.list);
router.get('/create', productsController.create);
router.get('/:id', productsController.detail);

router.post('/',productsController.add);

router.get('/:id/edit', productsController.edit);

router.put('/:id', productsController.edit);

router.delete('/:id', productsController.delete);

module.exports = router;
