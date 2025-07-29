// MongoDB Sample Data for ECOM2 Database
// Use this script in MongoDB Compass or MongoDB Shell
// Generated on July 28, 2025

// =======================
// 1. CATEGORIES
// =======================
db.categories.insertMany([
  {
    _id: 1,
    name: 'Thời trang nam',
    slug: 'thoi-trang-nam',
    createdAt: new Date(),
  },
  {
    _id: 2,
    name: 'Thời trang nữ',
    slug: 'thoi-trang-nu',
    createdAt: new Date(),
  },
  {
    _id: 3,
    name: 'Giày dép',
    slug: 'giay-dep',
    createdAt: new Date(),
  },
  {
    _id: 4,
    name: 'Điện tử',
    slug: 'dien-tu',
    createdAt: new Date(),
  },
  {
    _id: 5,
    name: 'Phụ kiện',
    slug: 'phu-kien',
    createdAt: new Date(),
  },
  {
    _id: 6,
    name: 'Thể thao',
    slug: 'the-thao',
    createdAt: new Date(),
  },
  {
    _id: 7,
    name: 'Làm đẹp',
    slug: 'lam-dep',
    createdAt: new Date(),
  },
  {
    _id: 8,
    name: 'Gia dụng',
    slug: 'gia-dung',
    createdAt: new Date(),
  },
]);

// =======================
// 2. BRANDS
// =======================
db.brands.insertMany([
  {
    _id: 1,
    name: 'Nike',
    logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png',
    createdAt: new Date(),
  },
  {
    _id: 2,
    name: 'Adidas',
    logoUrl:
      'https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png',
    createdAt: new Date(),
  },
  {
    _id: 3,
    name: 'Apple',
    logoUrl:
      'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png',
    createdAt: new Date(),
  },
  {
    _id: 4,
    name: 'Samsung',
    logoUrl:
      'https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png',
    createdAt: new Date(),
  },
  {
    _id: 5,
    name: 'Zara',
    logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/Zara-Logo.png',
    createdAt: new Date(),
  },
  {
    _id: 6,
    name: 'H&M',
    logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/HM-Logo.png',
    createdAt: new Date(),
  },
  {
    _id: 7,
    name: 'Uniqlo',
    logoUrl:
      'https://logos-world.net/wp-content/uploads/2020/04/Uniqlo-Logo.png',
    createdAt: new Date(),
  },
  {
    _id: 8,
    name: 'Local Brand',
    logoUrl: null,
    createdAt: new Date(),
  },
]);

// =======================
// 3. USERS
// =======================
db.users.insertMany([
  {
    _id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'admin@ecom.vn',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    name: 'Admin User',
    phone: '0901234567',
    address: 'Quận 1, TP.HCM',
    avatar: null,
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'user1@gmail.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    name: 'Nguyễn Văn A',
    phone: '0987654321',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    avatar: null,
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '550e8400-e29b-41d4-a716-446655440002',
    email: 'user2@gmail.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    name: 'Trần Thị B',
    phone: '0909123456',
    address: '456 Lê Lợi, Quận 3, TP.HCM',
    avatar: null,
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '550e8400-e29b-41d4-a716-446655440003',
    email: 'user3@gmail.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    name: 'Lê Văn C',
    phone: '0912345678',
    address: '789 Điện Biên Phủ, Quận 10, TP.HCM',
    avatar: null,
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// =======================
// 4. PRODUCTS (with embedded variants and images)
// =======================
db.products.insertMany([
  // Nike T-shirt
  {
    _id: 'prod-1001-nike-tshirt-classic',
    name: 'Áo thun Nike Classic',
    slug: 'ao-thun-nike-classic',
    description:
      'Áo thun Nike nam chất liệu cotton cao cấp, thoáng mát, phù hợp cho hoạt động thể thao và hàng ngày.',
    price: 450000,
    isFeatured: true,
    isNew: false,
    categoryId: 1,
    brandId: 1,
    variants: [
      {
        _id: 'var-1001-black-s',
        color: 'Đen',
        size: 'S',
        stock: 25,
        priceOverride: null,
        imageUrl:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/sportswear-dri-fit-t-shirt-d0ftlq.png',
      },
      {
        _id: 'var-1001-black-m',
        color: 'Đen',
        size: 'M',
        stock: 30,
        priceOverride: null,
        imageUrl:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/sportswear-dri-fit-t-shirt-d0ftlq.png',
      },
      {
        _id: 'var-1001-white-m',
        color: 'Trắng',
        size: 'M',
        stock: 22,
        priceOverride: null,
        imageUrl:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40ecb6564ea7/sportswear-dri-fit-t-shirt-d0ftlq.png',
      },
    ],
    images: [
      {
        _id: 'img-1001-1',
        imageUrl:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/sportswear-dri-fit-t-shirt-d0ftlq.png',
        alt: 'Nike Classic T-shirt - Front view',
      },
      {
        _id: 'img-1001-2',
        imageUrl:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/12345-back-view/sportswear-dri-fit-t-shirt-d0ftlq.png',
        alt: 'Nike Classic T-shirt - Back view',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Zara Summer Dress
  {
    _id: 'prod-2001-zara-dress-summer',
    name: 'Váy Zara Summer Collection',
    slug: 'vay-zara-summer-collection',
    description:
      'Váy nữ Zara thiết kế thanh lịch, chất liệu voan nhẹ, phù hợp cho mùa hè.',
    price: 750000,
    isFeatured: true,
    isNew: true,
    categoryId: 2,
    brandId: 5,
    variants: [
      {
        _id: 'var-2001-blue-s',
        color: 'Xanh',
        size: 'S',
        stock: 12,
        priceOverride: null,
        imageUrl:
          'https://static.zara.net/photos///2024/V/0/1/p/6895/181/400/2/w/850/6895181400_1_1_1.jpg',
      },
      {
        _id: 'var-2001-pink-m',
        color: 'Hồng',
        size: 'M',
        stock: 6,
        priceOverride: null,
        imageUrl:
          'https://static.zara.net/photos///2024/V/0/1/p/6895/181/630/2/w/850/6895181630_1_1_1.jpg',
      },
    ],
    images: [
      {
        _id: 'img-2001-1',
        imageUrl:
          'https://static.zara.net/photos///2024/V/0/1/p/6895/181/400/2/w/850/6895181400_1_1_1.jpg',
        alt: 'Zara Summer Dress - Front view',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Nike Air Max 90
  {
    _id: 'prod-3001-nike-air-max-90',
    name: 'Nike Air Max 90',
    slug: 'nike-air-max-90',
    description:
      'Giày thể thao Nike Air Max 90 với công nghệ đệm khí tiên tiến, phong cách retro.',
    price: 2850000,
    isFeatured: true,
    isNew: false,
    categoryId: 3,
    brandId: 1,
    variants: [
      {
        _id: 'var-3001-black-40',
        color: 'Đen',
        size: '40',
        stock: 8,
        priceOverride: null,
        imageUrl:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/zwxes8uud05rkuei1mpt/air-max-90-shoes-6n3vKB.png',
      },
      {
        _id: 'var-3001-white-41',
        color: 'Trắng',
        size: '41',
        stock: 6,
        priceOverride: null,
        imageUrl:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1ad5ef28-a99b-4190-9dc2-724481a6eae8/air-max-90-shoes-6n3vKB.png',
      },
    ],
    images: [
      {
        _id: 'img-3001-1',
        imageUrl:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/zwxes8uud05rkuei1mpt/air-max-90-shoes-6n3vKB.png',
        alt: 'Nike Air Max 90 - Side view',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // iPhone 15 Pro Max
  {
    _id: 'prod-4001-iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description:
      'iPhone 15 Pro Max với chip A17 Pro, camera 48MP, titanium design.',
    price: 32990000,
    isFeatured: true,
    isNew: true,
    categoryId: 4,
    brandId: 3,
    variants: [
      {
        _id: 'var-4001-black-128gb',
        color: 'Đen Titanium',
        size: '128GB',
        stock: 15,
        priceOverride: 32990000,
        imageUrl:
          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-black-titanium-pdp-image-position-1a_AV1.jpg',
      },
      {
        _id: 'var-4001-blue-256gb',
        color: 'Xanh Titanium',
        size: '256GB',
        stock: 8,
        priceOverride: 36990000,
        imageUrl:
          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-blue-titanium-pdp-image-position-1a_AV1.jpg',
      },
    ],
    images: [
      {
        _id: 'img-4001-1',
        imageUrl:
          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-black-titanium-pdp-image-position-1a_AV1.jpg',
        alt: 'iPhone 15 Pro Max - Front view',
      },
      {
        _id: 'img-4001-2',
        imageUrl:
          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-camera-system_AV1.jpg',
        alt: 'iPhone 15 Pro Max - Camera system',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// =======================
// 5. CARTS
// =======================
db.carts.insertMany([
  {
    _id: 'cart-user-001',
    userId: '550e8400-e29b-41d4-a716-446655440001',
    items: [
      {
        _id: 'cart-item-001',
        variantId: 'var-1001-black-m',
        productId: 'prod-1001-nike-tshirt-classic',
        quantity: 2,
        addedAt: new Date(),
      },
      {
        _id: 'cart-item-002',
        variantId: 'var-3001-black-40',
        productId: 'prod-3001-nike-air-max-90',
        quantity: 1,
        addedAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'cart-user-002',
    userId: '550e8400-e29b-41d4-a716-446655440002',
    items: [
      {
        _id: 'cart-item-003',
        variantId: 'var-4001-black-128gb',
        productId: 'prod-4001-iphone-15-pro-max',
        quantity: 1,
        addedAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// =======================
// 6. ORDERS
// =======================
db.orders.insertMany([
  {
    _id: 'order-001',
    userId: '550e8400-e29b-41d4-a716-446655440001',
    status: 'DELIVERED',
    paymentMethod: 'MOMO',
    total: 3300000,
    items: [
      {
        _id: 'order-item-001',
        variantId: 'var-1001-black-m',
        productId: 'prod-1001-nike-tshirt-classic',
        productName: 'Áo thun Nike Classic',
        color: 'Đen',
        size: 'M',
        quantity: 2,
        unitPrice: 450000,
      },
      {
        _id: 'order-item-002',
        variantId: 'var-3001-black-40',
        productId: 'prod-3001-nike-air-max-90',
        productName: 'Nike Air Max 90',
        color: 'Đen',
        size: '40',
        quantity: 1,
        unitPrice: 2850000,
      },
    ],
    customerInfo: {
      name: 'Nguyễn Văn A',
      email: 'user1@gmail.com',
      phone: '0987654321',
      address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(),
  },
  {
    _id: 'order-002',
    userId: '550e8400-e29b-41d4-a716-446655440002',
    status: 'SHIPPING',
    paymentMethod: 'STRIPE',
    total: 33740000,
    items: [
      {
        _id: 'order-item-003',
        variantId: 'var-2001-blue-s',
        productId: 'prod-2001-zara-dress-summer',
        productName: 'Váy Zara Summer Collection',
        color: 'Xanh',
        size: 'S',
        quantity: 1,
        unitPrice: 750000,
      },
      {
        _id: 'order-item-004',
        variantId: 'var-4001-black-128gb',
        productId: 'prod-4001-iphone-15-pro-max',
        productName: 'iPhone 15 Pro Max',
        color: 'Đen Titanium',
        size: '128GB',
        quantity: 1,
        unitPrice: 32990000,
      },
    ],
    customerInfo: {
      name: 'Trần Thị B',
      email: 'user2@gmail.com',
      phone: '0909123456',
      address: '456 Lê Lợi, Quận 3, TP.HCM',
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(),
  },
]);

// =======================
// 7. ENUMS (for reference)
// =======================
db.enums.insertMany([
  {
    name: 'ORDER_STATUS',
    values: ['PENDING', 'PREPARING', 'SHIPPING', 'DELIVERED', 'CANCELLED'],
  },
  {
    name: 'PAYMENT_METHOD',
    values: ['MOMO', 'STRIPE', 'COD'],
  },
  {
    name: 'USER_ROLE',
    values: ['ADMIN', 'USER'],
  },
  {
    name: 'SIZE',
    values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
]);

// =======================
// CREATE INDEXES for better performance
// =======================

// Users indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });

// Products indexes
db.products.createIndex({ slug: 1 }, { unique: true });
db.products.createIndex({ categoryId: 1 });
db.products.createIndex({ brandId: 1 });
db.products.createIndex({ isFeatured: 1 });
db.products.createIndex({ isNew: 1 });
db.products.createIndex({ name: 'text', description: 'text' }); // for search

// Categories & Brands indexes
db.categories.createIndex({ slug: 1 }, { unique: true });
db.brands.createIndex({ name: 1 });

// Carts indexes
db.carts.createIndex({ userId: 1 }, { unique: true });

// Orders indexes
db.orders.createIndex({ userId: 1 });
db.orders.createIndex({ status: 1 });
db.orders.createIndex({ createdAt: -1 });

print('✅ MongoDB sample data inserted successfully!');
print('📊 Collections created:');
print('   - categories: ' + db.categories.countDocuments());
print('   - brands: ' + db.brands.countDocuments());
print('   - users: ' + db.users.countDocuments());
print('   - products: ' + db.products.countDocuments());
print('   - carts: ' + db.carts.countDocuments());
print('   - orders: ' + db.orders.countDocuments());
print('   - enums: ' + db.enums.countDocuments());
