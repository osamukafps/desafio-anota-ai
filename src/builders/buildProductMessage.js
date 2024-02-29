// messageBuilder.js

function buildProductMessage(product) {
    return {
        eventType: 'newProductCreated',
        productId: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        ownerId: product.ownerId
    };
}

module.exports = { buildProductMessage };
