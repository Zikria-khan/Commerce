const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      value: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        required: true,
        default: "USD",
      },
    },
    discount: {
      percentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      validUntil: {
        type: Date,
      },
    },
    stock: {
      quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
      },
      warehouseLocation: {
        type: String,
        trim: true,
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
          trim: true,
        },
        altText: {
          type: String,
          trim: true,
        },
        position: {
          type: Number,
          default: 1,
        },
      },
    ],
    specifications: [
      {
        key: {
          type: String,
          required: true,
          trim: true,
        },
        value: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    dimensions: {
      weight: {
        type: Number,
        min: 0,
      },
      length: {
        type: Number,
        min: 0,
      },
      width: {
        type: Number,
        min: 0,
      },
      height: {
        type: Number,
        min: 0,
      },
      unit: {
        type: String,
        default: "cm",
      },
    },
    tags: {
      type: [String],
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Middleware to capitalize product name before saving
ProductSchema.pre('save', function (next) {
  this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
  next();
});

// Method to apply discount and get final price
ProductSchema.methods.getDiscountedPrice = function () {
  if (this.discount && this.discount.percentage > 0) {
    return this.price.value * (1 - this.discount.percentage / 100);
  }
  return this.price.value;
};

module.exports = mongoose.model('Product', ProductSchema);
