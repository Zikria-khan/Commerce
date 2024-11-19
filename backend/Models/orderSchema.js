const mongoose = require('mongoose');

const orderHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid', 'refunded'],
      default: 'unpaid'
    },
    paymentMethod: {
      type: String,
      enum: ['credit card', 'paypal', 'bank transfer', 'cash on delivery'],
      default: 'credit card'
    },
    shippingAddress: {
      fullName: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      phone: String
    },
    trackingNumber: {
      type: String,
      default: null
    },
    shippedDate: {
      type: Date,
      default: null
    },
    deliveryDate: {
      type: Date,
      default: null
    },
    cancellationReason: {
      type: String,
      default: null
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        totalItemPrice: {
          type: Number,
          required: true
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OrderHistory', orderHistorySchema);
