const { MongoClient } = require('mongodb');
const { config } = require('dotenv');
const path = require('path');

// Load environment variables
config({ path: path.join(__dirname, '..', '.env.local') });

/**
 * Import sample data from Database/mongodb-sample-data.js
 * This script converts the MongoDB shell commands to MongoDB Node.js driver operations
 */

async function importSampleData() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    const db = client.db();
    
    console.log('📦 Starting data import...');

    // 1. Categories
    console.log('📁 Importing categories...');
    const categories = [
      { _id: 1, name: 'Thời trang nam', slug: 'thoi-trang-nam', createdAt: new Date() },
      { _id: 2, name: 'Thời trang nữ', slug: 'thoi-trang-nu', createdAt: new Date() },
      { _id: 3, name: 'Giày dép', slug: 'giay-dep', createdAt: new Date() },
      { _id: 4, name: 'Điện tử', slug: 'dien-tu', createdAt: new Date() },
      { _id: 5, name: 'Phụ kiện', slug: 'phu-kien', createdAt: new Date() },
      { _id: 6, name: 'Thể thao', slug: 'the-thao', createdAt: new Date() },
      { _id: 7, name: 'Làm đẹp', slug: 'lam-dep', createdAt: new Date() },
      { _id: 8, name: 'Gia dụng', slug: 'gia-dung', createdAt: new Date() },
    ];
    
    await db.collection('categories').deleteMany({});
    await db.collection('categories').insertMany(categories);
    console.log(`✅ Imported ${categories.length} categories`);

    // 2. Brands
    console.log('🏷️ Importing brands...');
    const brands = [
      { _id: 1, name: 'Nike', logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png', createdAt: new Date() },
      { _id: 2, name: 'Adidas', logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png', createdAt: new Date() },
      { _id: 3, name: 'Apple', logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png', createdAt: new Date() },
      { _id: 4, name: 'Samsung', logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png', createdAt: new Date() },
      { _id: 5, name: 'Zara', logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/Zara-Logo.png', createdAt: new Date() },
      { _id: 6, name: 'H&M', logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/HM-Logo.png', createdAt: new Date() },
      { _id: 7, name: 'Uniqlo', logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/Uniqlo-Logo.png', createdAt: new Date() },
      { _id: 8, name: 'Local Brand', logoUrl: null, createdAt: new Date() },
    ];
    
    await db.collection('brands').deleteMany({});
    await db.collection('brands').insertMany(brands);
    console.log(`✅ Imported ${brands.length} brands`);

    // 3. Users
    console.log('👥 Importing users...');
    const users = [
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
    ];
    
    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany(users);
    console.log(`✅ Imported ${users.length} users`);

    // 4. Products (with variants and images)
    console.log('🛍️ Importing products...');
    const products = [
      // Nike T-shirt
      {
        _id: 'prod-1001-nike-tshirt-classic',
        name: 'Áo thun Nike Classic',
        slug: 'ao-thun-nike-classic',
        description: 'Áo thun Nike nam chất liệu cotton cao cấp, thoáng mát, phù hợp cho hoạt động thể thao và hàng ngày.',
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
            imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/sportswear-dri-fit-t-shirt-d0ftlq.png',
          },
          {
            _id: 'var-1001-black-m',
            color: 'Đen',
            size: 'M',
            stock: 30,
            priceOverride: null,
            imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/sportswear-dri-fit-t-shirt-d0ftlq.png',
          },
          {
            _id: 'var-1001-white-m',
            color: 'Trắng',
            size: 'M',
            stock: 22,
            priceOverride: null,
            imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40ecb6564ea7/sportswear-dri-fit-t-shirt-d0ftlq.png',
          },
        ],
        images: [
          {
            _id: 'img-1001-1',
            imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/sportswear-dri-fit-t-shirt-d0ftlq.png',
            alt: 'Nike Classic T-shirt - Front view',
          },
          {
            _id: 'img-1001-2',
            imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/12345-back-view/sportswear-dri-fit-t-shirt-d0ftlq.png',
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
        description: 'Váy nữ Zara thiết kế thanh lịch, chất liệu voan nhẹ, phù hợp cho mùa hè.',
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
            stock: 15,
            priceOverride: null,
            imageUrl: 'https://static.zara.net/photos///2023/V/0/1/p/6895/144/330/2/w/850/6895144330_6_1_1.jpg',
          },
          {
            _id: 'var-2001-blue-m',
            color: 'Xanh',
            size: 'M',
            stock: 20,
            priceOverride: null,
            imageUrl: 'https://static.zara.net/photos///2023/V/0/1/p/6895/144/330/2/w/850/6895144330_6_1_1.jpg',
          },
          {
            _id: 'var-2001-red-s',
            color: 'Đỏ',
            size: 'S',
            stock: 12,
            priceOverride: null,
            imageUrl: 'https://static.zara.net/photos///2023/V/0/1/p/6895/144/600/2/w/850/6895144600_6_1_1.jpg',
          },
        ],
        images: [
          {
            _id: 'img-2001-1',
            imageUrl: 'https://static.zara.net/photos///2023/V/0/1/p/6895/144/330/2/w/850/6895144330_6_1_1.jpg',
            alt: 'Zara Summer Dress - Blue',
          },
          {
            _id: 'img-2001-2',
            imageUrl: 'https://static.zara.net/photos///2023/V/0/1/p/6895/144/600/2/w/850/6895144600_6_1_1.jpg',
            alt: 'Zara Summer Dress - Red',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // iPhone 14
      {
        _id: 'prod-3001-iphone-14-pro',
        name: 'iPhone 14 Pro',
        slug: 'iphone-14-pro',
        description: 'iPhone 14 Pro với chip A16 Bionic, camera 48MP Pro, màn hình Super Retina XDR 6.1 inch.',
        price: 29990000,
        isFeatured: true,
        isNew: true,
        categoryId: 4,
        brandId: 3,
        variants: [
          {
            _id: 'var-3001-purple-128gb',
            color: 'Tím',
            size: '128GB',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-deep-purple-select?wid=940&hei=1112&fmt=png-alpha&.v=1663220016',
          },
          {
            _id: 'var-3001-gold-256gb',
            color: 'Vàng',
            size: '256GB',
            stock: 5,
            priceOverride: 33990000,
            imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-gold-select?wid=940&hei=1112&fmt=png-alpha&.v=1663220016',
          },
        ],
        images: [
          {
            _id: 'img-3001-1',
            imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-deep-purple-select?wid=940&hei=1112&fmt=png-alpha&.v=1663220016',
            alt: 'iPhone 14 Pro - Deep Purple',
          },
          {
            _id: 'img-3001-2',
            imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-gold-select?wid=940&hei=1112&fmt=png-alpha&.v=1663220016',
            alt: 'iPhone 14 Pro - Gold',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    
    await db.collection('products').deleteMany({});
    await db.collection('products').insertMany(products);
    console.log(`✅ Imported ${products.length} products`);

    // 5. Empty carts (structure only)
    console.log('🛒 Setting up carts collection...');
    await db.collection('carts').deleteMany({});
    console.log('✅ Carts collection ready');

    // 6. Sample orders
    console.log('📋 Importing sample orders...');
    const orders = [
      {
        _id: 'order-001-20250729-001',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        items: [
          {
            productId: 'prod-1001-nike-tshirt-classic',
            variantId: 'var-1001-black-m',
            quantity: 2,
            price: 450000,
            total: 900000,
          },
        ],
        subtotal: 900000,
        shippingFee: 30000,
        total: 930000,
        status: 'DELIVERED',
        paymentMethod: 'COD',
        shippingAddress: {
          name: 'Nguyễn Văn A',
          phone: '0987654321',
          address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
        },
        createdAt: new Date('2025-07-25'),
        updatedAt: new Date('2025-07-26'),
      },
      {
        _id: 'order-002-20250729-002',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        items: [
          {
            productId: 'prod-2001-zara-dress-summer',
            variantId: 'var-2001-blue-m',
            quantity: 1,
            price: 750000,
            total: 750000,
          },
        ],
        subtotal: 750000,
        shippingFee: 30000,
        total: 780000,
        status: 'SHIPPING',
        paymentMethod: 'MOMO',
        shippingAddress: {
          name: 'Trần Thị B',
          phone: '0909123456',
          address: '456 Lê Lợi, Quận 3, TP.HCM',
        },
        createdAt: new Date('2025-07-28'),
        updatedAt: new Date('2025-07-29'),
      },
    ];
    
    await db.collection('orders').deleteMany({});
    await db.collection('orders').insertMany(orders);
    console.log(`✅ Imported ${orders.length} orders`);

    // 7. Enums
    console.log('🏷️ Importing enums...');
    const enums = [
      { name: 'ORDER_STATUS', values: ['PENDING', 'PREPARING', 'SHIPPING', 'DELIVERED', 'CANCELLED'] },
      { name: 'PAYMENT_METHOD', values: ['MOMO', 'STRIPE', 'COD'] },
      { name: 'USER_ROLE', values: ['ADMIN', 'USER'] },
      { name: 'SIZE', values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    ];
    
    await db.collection('enums').deleteMany({});
    await db.collection('enums').insertMany(enums);
    console.log(`✅ Imported ${enums.length} enum collections`);

    // Create indexes for better performance
    console.log('📊 Creating database indexes...');
    
    // Users indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ role: 1 });
    
    // Products indexes
    await db.collection('products').createIndex({ slug: 1 }, { unique: true });
    await db.collection('products').createIndex({ categoryId: 1 });
    await db.collection('products').createIndex({ brandId: 1 });
    await db.collection('products').createIndex({ isFeatured: 1 });
    await db.collection('products').createIndex({ isNew: 1 });
    await db.collection('products').createIndex({ name: 'text', description: 'text' });
    
    // Categories & Brands indexes
    await db.collection('categories').createIndex({ slug: 1 }, { unique: true });
    await db.collection('brands').createIndex({ name: 1 });
    
    // Carts indexes
    await db.collection('carts').createIndex({ userId: 1 }, { unique: true });
    
    // Orders indexes
    await db.collection('orders').createIndex({ userId: 1 });
    await db.collection('orders').createIndex({ status: 1 });
    await db.collection('orders').createIndex({ createdAt: -1 });
    
    console.log('✅ Database indexes created');

    // Final summary
    console.log('\n🎉 Data import completed successfully!');
    console.log('📊 Collections summary:');
    console.log(`   - categories: ${await db.collection('categories').countDocuments()}`);
    console.log(`   - brands: ${await db.collection('brands').countDocuments()}`);
    console.log(`   - users: ${await db.collection('users').countDocuments()}`);
    console.log(`   - products: ${await db.collection('products').countDocuments()}`);
    console.log(`   - carts: ${await db.collection('carts').countDocuments()}`);
    console.log(`   - orders: ${await db.collection('orders').countDocuments()}`);
    console.log(`   - enums: ${await db.collection('enums').countDocuments()}`);

    console.log('\n✅ Sample data ready for development!');
    
  } catch (error) {
    console.error('❌ Error importing sample data:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the import
importSampleData();
