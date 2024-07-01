const express = require('express');
const router = express.Router();
const DIContainer = require('../diContainer');
const authMiddleware = require('../middleware/authMiddleware');

const orderController = DIContainer.get('OrderController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       500:
 *         description: Some server error
 */
router.post('/', authMiddleware, orderController.createOrder.bind(orderController));

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of orders for the user
 *       404:
 *         description: Orders not found
 *       500:
 *         description: Some server error
 */
router.get('/user/:userId', authMiddleware, orderController.getOrdersByUserId.bind(orderController));

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order description by ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', authMiddleware, orderController.getOrderById.bind(orderController));

module.exports = router;
