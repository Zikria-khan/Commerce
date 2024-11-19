const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to create or update a cart item (user and product)
router.post('/cart', cartController.createCartItem);

// Route to retrieve a user's cart items by user ID
router.get('/cart/:userId', cartController.getCartItemsByUser);

// Route to update a specific cart item by cart ID (quantity, shipping, totalPrice, etc.)
router.put('/cart/:cartId', cartController.updateCartItem);

// Route to delete a cart item by its ID
router.delete('/cart/:cartId', cartController.deleteCartItem);

// Route to delete a specific product from the user's cart by userId and productId
router.delete('/cart/:userId/product/:productId', cartController.deleteProductFromCart);
// Example Node.js (Express) backend code to create a Stripe session
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your secret key


module.exports = router;
