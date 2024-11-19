const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Review schema
const reviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewText: {
        type: String,
        required: true,
        trim: true,
        default: "No review provided"
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('Review', reviewSchema);
