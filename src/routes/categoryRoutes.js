const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);

module.exports = router;