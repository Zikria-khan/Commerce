const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    reportTitle: {
      type: String,
      required: true, // Title is required
      trim: true, // Automatically trims whitespace
    },
    reportType: {
      type: String,
      enum: ['bug', 'feedback', 'complaint', 'suggestion', 'other'],
      required: true,
    },
    reportDescription: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // This links the report to a specific user
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
