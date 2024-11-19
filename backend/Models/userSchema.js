const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create a schema for the User
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/, 'Please enter a valid email'],
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, 'Please enter a valid phone number'],
      index: true,
    },
    address: {
      type: String,
      required: true,
    },
    // New online status field
    isOnline: {
      type: Boolean,
      default: false,
    },
    // Optional last active timestamp
    lastActive: {
      type: Date,
      default: Date.now,
    },
    // Additional fields
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    profilePicture: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    history: [
      {
        order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Order',
        },
        date: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ['placed', 'shipped', 'delivered', 'cancelled'],
          default: 'placed',
        },
      },
    ],
    reports: [
      {
        title: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ['general', 'error'],
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare hashed password during login
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);
