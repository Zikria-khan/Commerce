const Product = require('../models/productSchema');
const ReviewModel = require('../models/reviewSchema'); // Import the Review model
const mongoose = require('mongoose');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).json({ message: "Failed to add product.", error: error.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = category === 'all'
      ? await Product.find()
      : await Product.find({ category });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category.' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Failed to fetch products.", error: error.message });
  }
};

// Get product by name
exports.getProductByName = async (req, res) => {
  const { name } = req.params;

  try {
    const product = await Product.findOne({ name: new RegExp(`^${name}$`, 'i'), isActive: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by name:", error);
    res.status(500).json({ message: "Failed to fetch product.", error: error.message });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product by ID:", error);
    res.status(500).json({ message: "Failed to update product.", error: error.message });
  }
};

// Get product details by ID (including reviews)
exports.getproductId = async (req, res) => {
  const { productId } = req.params;
console.log(productId)
  try {
    // Fetch the product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    // Fetch associated reviews
    const reviews = await ReviewModel.find({ productId });
    console.log(product,reviews,"pro")

    res.status(200).json({
      product,
      reviews: reviews || [], // Return an empty array if no reviews
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Failed to fetch product details.", error: error.message });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product.", error: error.message });
  }
};
