const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.removeCategory);

module.exports = router;