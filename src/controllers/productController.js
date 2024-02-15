const Product = require('../models/productModel');

class ProductController {
    
    async createProduct(req, res){
        
        try {
            const { title, description, price, category, ownerId } = req.body;

            var productExists = await Product.findOne({
                title: title,
                description: description,
                ownerId: ownerId,
            });

            console.log(productExists);

            if(productExists) {
                return res.status(409).json({
                    message: 'Product already exists!'
                })
            }

            const newProduct = await Product.create({
                id: Math.floor(Math.random() * 100000) + 1,
                title,
                description,
                price,
                category,
                ownerId
            });

            return res.status(201).json(newProduct);
        } catch(err)
        {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        }
    }

    async getProducts(req, res) {
        try {

            const products = await Product.find({});

            if(!products) {
                return res.status(404).json({
                    message: 'Product not found!'
                })
            }

            return res.status(200).json({
                products
            });

        } catch (err) {          
            return res.status(500).json({ 
                message: 'Internal server error',
                error: err.message
            });
        }
    }

    async associateCategory(req, res) {
        try {
            const { id, category } = req.body;       

            const filter = { id: id }
            const setUpdate = { $set: { category: category } };

            const update = await Product.updateOne(filter, setUpdate);

            if(update.matchedCount === 0) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            
            return res.status(200).json({
                product: await Product.findOne(filter)
            });

        } catch (err) {          
            return res.status(500).json({ 
                message: 'Internal server error',
                error: err.message
            });
        }
    }

    async updateProduct(req, res) {
        
        try {
            const id = req.params.id;
            const update = req.body;

            const productToUpdate = await Product.findOne({ id: id});

            if(!productToUpdate) {
                res.status(404).json({
                    message: 'Product not found'
                })
            }

            await Product.updateOne({ id: id}, { $set: update });

            return res.status(200).json({
                product: await Product.findOne({ id: id })
            });
            
        } catch(err) {
            return res.status(500).json({
                message: 'Error when updating...',
                error: err.message
            });
        }
    }

    async removeProduct(req, res) {

        try {

            const id = req.params.id;

            const product = await Product.deleteOne({ id: id });

            if(product.deletedCount <= 0) {
                return res.status(404).json({
                    message: 'Could not delete'
                });
            }

            return res.status(204).json({});

        } catch(err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        }
    }
}

module.exports = new ProductController();