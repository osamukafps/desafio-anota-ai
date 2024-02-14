const Category = require('../models/categoryModel');

class CategoryController {

    async createCategory(req, res) {

        try {
            const { title, description, ownerId} = req.body;
            const newCategory = Category.create({
                id: Math.floor(Math.random() * 100000) + 1,
                title,
                description,
                ownerId
            });

            res.status(201).json(newCategory);

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
            const udpdate = req.body;

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
}

module.exports = new CategoryController();