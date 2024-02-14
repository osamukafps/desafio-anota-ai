const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.put('/products', productController.associateCategory);
router.put('/products/:id', productController.updateProduct);

module.exports = router;