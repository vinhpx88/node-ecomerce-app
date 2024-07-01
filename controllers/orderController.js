class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    async createOrder(req, res) {
        try {
            const order = await this.orderService.createOrder(req.body);
            res.status(201).json({ message: 'Order created successfully', order });
        } catch (error) {
            handleError(error, res);
        }
    }

    async getOrdersByUserId(req, res) {
        try {
            const orders = await this.orderService.getOrdersByUserId(req.params.userId);
            res.status(200).json(orders);
        } catch (error) {
            handleError(error, res);
        }
    }

    async getOrderById(req, res) {
        try {
            const order = await this.orderService.getOrderById(req.params.id);
            res.status(200).json(order);
        } catch (error) {
            handleError(error, res);
        }
    }
}

module.exports = OrderController;
