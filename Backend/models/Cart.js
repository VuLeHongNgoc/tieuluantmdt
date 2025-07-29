const mongoose = require('mongoose');

// Cart Item Schema (embedded)
const cartItemSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => require('crypto').randomUUID(),
    },
    variantId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// Cart Schema
const cartSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => require('crypto').randomUUID(),
    },
    userId: {
      type: String,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
    _id: false,
  }
);

// Indexes
cartSchema.index({ userId: 1 }, { unique: true });

// Virtual for total items count
cartSchema.virtual('totalItems').get(function () {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Method to add item to cart
cartSchema.methods.addItem = function (variantId, productId, quantity = 1) {
  const existingItem = this.items.find(item => item.variantId === variantId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({
      _id: require('crypto').randomUUID(),
      variantId,
      productId,
      quantity,
      addedAt: new Date(),
    });
  }

  return this.save();
};

// Method to remove item from cart
cartSchema.methods.removeItem = function (itemId) {
  this.items = this.items.filter(item => item._id !== itemId);
  return this.save();
};

// Method to update item quantity
cartSchema.methods.updateItemQuantity = function (itemId, quantity) {
  const item = this.items.find(item => item._id === itemId);
  if (item) {
    if (quantity <= 0) {
      return this.removeItem(itemId);
    }
    item.quantity = quantity;
    return this.save();
  }
  throw new Error('Item not found in cart');
};

// Method to clear cart
cartSchema.methods.clearCart = function () {
  this.items = [];
  return this.save();
};

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
