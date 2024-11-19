const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Route to create a new review
router.post('/reviews', reviewController.createReview);

// Route to get all reviews for a product
router.get('/reviews/product/:productId', reviewController.getReviewsByProductId);

// Route to get average rating for a product
router.get('/reviews/product/:productId/average-rating', reviewController.getAverageRating);

module.exports = router;
