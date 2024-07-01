const Order = require('../models/order');

class OrderService {
    constructor() {
        // Any other dependencies can be injected here
    }

    async createOrder(orderData) {
        const order = new Order(orderData);
        await order.save();
        return order;
    }

    async getOrdersByUserId(userId) {
        return await Order.find({ user: userId }).populate('products');
    }

    async getOrderById(orderId) {
        return await Order.findById(orderId).populate('products');
    }
}

module.exports = OrderService;
