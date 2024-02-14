const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    ownerId: {
        type: Number,
        require: true
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;