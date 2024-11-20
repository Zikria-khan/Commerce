const Review = require('../Models/reviewSchema');
const Product = require('../Models/productSchema');
const mongoose = require("mongoose");

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, reviewText, userId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create a new review
    const newReview = new Review({
      productId,
      userId,
      rating,
      reviewText,
    });
    console.log(newReview,req.body)

    // Save review
    await newReview.save();

    // Return the created review
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews for a product
exports.getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch reviews from your database for the given productId

    const reviews = await Review.find({ productId })
      .populate("userId", "name email") // Populate user fields like name and email
      .populate("productId", "name description price"); // Populate product fields


      return res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get average rating for a product
exports.getAverageRating = async (req, res) => {
  try {
    const { productId } = req.params;

    // Calculate average rating
    const reviews = await Review.find({ productId });
    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }

    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    res.status(200).json({ averageRating: averageRating.toFixed(1) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
