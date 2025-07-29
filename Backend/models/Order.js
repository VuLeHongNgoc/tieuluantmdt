const mongoose = require('mongoose');

// Order Item Schema (embedded)
const orderItemSchema = new mongoose.Schema(
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
      required: true,
    },
    productName: {
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
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

// Customer Info Schema (embedded)
const customerInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => require('crypto').randomUUID(),
    },
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'PREPARING', 'SHIPPING', 'DELIVERED', 'CANCELLED'],
      default: 'PENDING',
    },
    paymentMethod: {
      type: String,
      enum: ['MOMO', 'STRIPE', 'COD'],
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    items: [orderItemSchema],
    customerInfo: customerInfoSchema,
  },
  {
    timestamps: true,
    _id: false,
  }
);

// Indexes
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'customerInfo.email': 1 });

// Virtual for total items count
orderSchema.virtual('totalItems').get(function () {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for calculated total (for verification)
orderSchema.virtual('calculatedTotal').get(function () {
  return this.items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0
  );
});

// Method to update order status
orderSchema.methods.updateStatus = function (newStatus) {
  const validTransitions = {
    PENDING: ['PREPARING', 'CANCELLED'],
    PREPARING: ['SHIPPING', 'CANCELLED'],
    SHIPPING: ['DELIVERED'],
    DELIVERED: [],
    CANCELLED: [],
  };

  if (validTransitions[this.status].includes(newStatus)) {
    this.status = newStatus;
    return this.save();
  }

  throw new Error(
    `Invalid status transition from ${this.status} to ${newStatus}`
  );
};

// Static method to get orders by status
orderSchema.statics.findByStatus = function (status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to get user orders
orderSchema.statics.findByUser = function (userId) {
  return this.find({ userId }).sort({ createdAt: -1 });
};

// Static method for sales analytics
orderSchema.statics.getSalesAnalytics = async function (startDate, endDate) {
  const pipeline = [
    {
      $match: {
        status: { $in: ['DELIVERED'] },
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
        totalRevenue: { $sum: '$total' },
        totalOrders: { $sum: 1 },
        totalItems: { $sum: { $sum: '$items.quantity' } },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];

  return this.aggregate(pipeline);
};

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
