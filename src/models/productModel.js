const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    ownerId: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;