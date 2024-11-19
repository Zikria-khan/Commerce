const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const requireRole = require('../middleware/roleMiddleware');

// Route to add a new product (admin only)
router.post('/products', productController.addProduct);

// Route to update a product by ID (admin only)
router.put('/products/:id', requireRole('admin'), productController.updateProductById);

// Route to delete a product by ID (admin only)
router.delete('/products/:id', requireRole('admin'), productController.deleteProductById);

// Route to get products by category (accessible to all users)
router.get('/products/category/:category', productController.getProductsByCategory);

// Route to get a product by name (accessible to all users)
router.get('/products/name/:name', productController.getProductByName);

// Route to get product details by ID (accessible to all users)
router.get('/products/:productId', productController.getproductId);

module.exports = router;
