const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

// Brand Schema
const brandSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

// Indexes
categorySchema.index({ slug: 1 }, { unique: true });
brandSchema.index({ name: 1 });

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);
const Brand = mongoose.models.Brand || mongoose.model('Brand', brandSchema);

module.exports = { Category, Brand };
