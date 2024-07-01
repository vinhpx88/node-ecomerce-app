const Product = require('../models/product');

class ProductService {
    constructor() {
        // Any other dependencies can be injected here
    }

    async createProduct(productData) {
        const product = new Product(productData);
        await product.save();
        return product;
    }

    async getAllProducts() {
        return await Product.find();
    }

    async getProductById(productId) {
        return await Product.findById(productId);
    }
}

module.exports = ProductService;
