const Category = require('../models/categoryModel');

class CategoryController {

    async createCategory(req, res) {

        try {
            const { title, description, ownerId} = req.body;

            const categoryExists = await Category.findOne({
                title: title,
                description: description,
                ownerId: ownerId,
            });

            if(categoryExists) {
                return res.status(409).json({
                    message: 'Category already exists',
                    data: categoryExists
                });
            }

            const newCategory = await Category.create({
                id: Math.floor(Math.random() * 100000) + 1,
                title,
                description,
                ownerId
            });

            return res.status(201).json({
                message: 'Created',
                data: await Category.findOne({ id: newCategory.id})
            });

        } catch(err){
            res.status(500).json({
                message: 'Internal Server Error',
                error: err 
            })
        }
    }

    async updateCategory(req, res) {
        
        try {
            const id = req.params.id;
            const update = req.body;

            const categoryToUpdate = await Category.findOne({ id: id });

            if(!categoryToUpdate) {
                return res.status(404).json({
                    message: 'Category not found'
                });
            }

            await Category.updateOne({ id: id }, { $set: update });

            return res.status(200).json({
                category: await Category.findOne({ id: id })
            });

        } catch(err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        }
    }

    async getAllCategories(req, res) {
        
        try {

            const categoryList = await Category.find({});

            if(!categoryList) {
                return res.status(404).json({
                    message: 'Categories not found'
                });
            }

            return res.status(200).json({
                categories: categoryList
            })
        } catch(err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        }

    }

    async removeCategory(req, res) {

        try {

            const id = req.params.id;

            const category = await Category.deleteOne({ id: id });

            if(category.deletedCount <= 0) { 
                return res.status(404).json({
                    message: 'Could not delete',
                })
            }

            return res.status(204);

        } catch(err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        }
    }
}

module.exports = new CategoryController();