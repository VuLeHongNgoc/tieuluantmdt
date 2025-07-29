const mongoose = require('mongoose');

// Product Variant Schema (embedded)
const variantSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    priceOverride: {
      type: Number,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

// Product Image Schema (embedded)
const imageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

// Product Schema
const productSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
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
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: Number,
      ref: 'Category',
      required: true,
    },
    brandId: {
      type: Number,
      ref: 'Brand',
      required: true,
    },
    variants: [variantSchema],
    images: [imageSchema],
  },
  {
    timestamps: true,
    _id: false,
  }
);

// Indexes
productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ categoryId: 1 });
productSchema.index({ brandId: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isNew: 1 });
productSchema.index({ name: 'text', description: 'text' });

// Virtual for total stock
productSchema.virtual('totalStock').get(function () {
  return this.variants.reduce((total, variant) => total + variant.stock, 0);
});

// Method to find variant by ID
productSchema.methods.findVariant = function (variantId) {
  return this.variants.find(variant => variant._id === variantId);
};

// Method to update variant stock
productSchema.methods.updateVariantStock = function (variantId, newStock) {
  const variant = this.findVariant(variantId);
  if (variant) {
    variant.stock = newStock;
    return this.save();
  }
  throw new Error('Variant not found');
};

module.exports =
  mongoose.models.Product || mongoose.model('Product', productSchema);
