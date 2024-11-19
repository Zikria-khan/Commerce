const express = require('express');
const router = express.Router();
const orderHistoryController = require('../controllers/orderController');

// Route to create order history
router.post('/order-history', orderHistoryController.createOrderHistory);

// Route to update order history status (shipped, delivered, etc.)
router.put('/order-history/:orderHistoryId', orderHistoryController.updateOrderHistoryStatus);

// Route to get order history for a specific user
router.get('/order-history/:userId', orderHistoryController.getOrderHistoryByUserId);

// New route to get all orders (for admin or authorized users)
router.get('/order-history', orderHistoryController.getAllOrderHistory);

module.exports = router;
