// MongoDB Collections Schema for ECOM2 Database
// Generated for MongoDB Atlas - July 28, 2025

// Collection: users
const usersSchema = {
  _id: 'ObjectId or String (UUID)',
  email: 'String (unique)',
  password: 'String (hashed)',
  name: 'String',
  phone: 'String',
  address: 'String',
  avatar: 'String (URL)',
  role: 'String (ADMIN|USER)',
  createdAt: 'Date',
  updatedAt: 'Date',
};

// Collection: categories
const categoriesSchema = {
  _id: 'ObjectId or Number',
  name: 'String',
  slug: 'String (unique)',
  createdAt: 'Date',
};

// Collection: brands
const brandsSchema = {
  _id: 'ObjectId or Number',
  name: 'String',
  logoUrl: 'String',
  createdAt: 'Date',
};

// Collection: products
const productsSchema = {
  _id: 'String (UUID) or ObjectId',
  name: 'String',
  slug: 'String (unique)',
  description: 'String',
  price: 'Number',
  isFeatured: 'Boolean',
  isNew: 'Boolean',
  categoryId: 'Number or ObjectId (reference)',
  brandId: 'Number or ObjectId (reference)',

  // Embedded variants (denormalized)
  variants: [
    {
      _id: 'String (UUID)',
      color: 'String',
      size: 'String',
      stock: 'Number',
      priceOverride: 'Number',
      imageUrl: 'String',
    },
  ],

  // Embedded images
  images: [
    {
      _id: 'String (UUID)',
      imageUrl: 'String',
      alt: 'String',
    },
  ],

  createdAt: 'Date',
  updatedAt: 'Date',
};

// Collection: carts
const cartsSchema = {
  _id: 'String (UUID) or ObjectId',
  userId: 'String (UUID) or ObjectId',
  items: [
    {
      _id: 'String (UUID)',
      variantId: 'String (UUID)',
      productId: 'String (UUID)', // for easier lookup
      quantity: 'Number',
      addedAt: 'Date',
    },
  ],
  createdAt: 'Date',
  updatedAt: 'Date',
};

// Collection: orders
const ordersSchema = {
  _id: 'String (UUID) or ObjectId',
  userId: 'String (UUID) or ObjectId',
  status: 'String (PENDING|PREPARING|SHIPPING|DELIVERED|CANCELLED)',
  paymentMethod: 'String (MOMO|STRIPE|COD)',
  total: 'Number',

  // Embedded order items
  items: [
    {
      _id: 'String (UUID)',
      variantId: 'String (UUID)',
      productId: 'String (UUID)',
      productName: 'String', // denormalized for performance
      color: 'String',
      size: 'String',
      quantity: 'Number',
      unitPrice: 'Number',
    },
  ],

  // Customer info snapshot
  customerInfo: {
    name: 'String',
    email: 'String',
    phone: 'String',
    address: 'String',
  },

  createdAt: 'Date',
  updatedAt: 'Date',
};

// Collection: enums (for reference)
const enumsSchema = {
  _id: 'ObjectId',
  name: 'String',
  values: ['Array of possible values'],
};

module.exports = {
  usersSchema,
  categoriesSchema,
  brandsSchema,
  productsSchema,
  cartsSchema,
  ordersSchema,
  enumsSchema,
};
