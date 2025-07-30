// Script to add categories to the MongoDB database
// Run this script with Node.js

const { MongoClient } = require('mongodb');

// MongoDB connection string - using the same connection string as add-mock-products.js
const uri = 'mongodb+srv://nhatdang082000:hkVhYpHo7jAw1oNv@tmdt.shm3cnx.mongodb.net/?retryWrites=true&w=majority&appName=TMDT';

async function addCategories() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('ecommerce'); // Using the same database as products
    const categoriesCollection = database.collection('categories');

    // Check if categories already exist
    const existingCategoriesCount = await categoriesCollection.countDocuments();
    console.log(`Current category count: ${existingCategoriesCount}`);

    // If categories already exist, you might want to clear them before adding new ones
    if (existingCategoriesCount > 0) {
      const confirmDeleteCategories = true; // Set to false if you don't want to delete existing categories
      if (confirmDeleteCategories) {
        await categoriesCollection.deleteMany({});
        console.log('Existing categories deleted.');
      }
    }

    // Define categories based on your Category.js model structure
    const categories = [
      {
        _id: 1,
        name: 'Men\'s Clothing',
        slug: 'mens-clothing',
        description: 'Clothing items designed for men including shirts, pants, and outerwear.',
        parent: null,
        image: 'https://image.hm.com/assets/hm/00/78/00782618c785acb59ba9178ad4b3065a53c491bc.jpg?imwidth=1260',
        isFeatured: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 2,
        name: 'Women\'s Clothing',
        slug: 'womens-clothing',
        description: 'Clothing items designed for women including dresses, skirts, and tops.',
        parent: null,
        image: 'https://image.hm.com/assets/hm/f5/ee/f5ee210dbeea75690b63e2d2774bcdbf2db7b6a3.jpg?imwidth=1260',
        isFeatured: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 3,
        name: 'Shoes',
        slug: 'shoes',
        description: 'Footwear for all occasions including casual, formal, and athletic shoes.',
        parent: null,
        image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/645a596a311b498b9273af1600c98e19_9366/Giay_Ultraboost_Light_Mau_xanh_da_troi_HQ6351_01_standard.jpg',
        isFeatured: true,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 4,
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices including smartphones, laptops, and accessories.',
        parent: null,
        image: 'https://images.samsung.com/is/image/samsung/p6pim/vn/2402/gallery/vn-galaxy-s24-ultra-s928-sm-s928bzkcxxv-thumb-536818679',
        isFeatured: true,
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 5,
        name: 'Accessories',
        slug: 'accessories',
        description: 'Fashion accessories including bags, wallets, watches, and jewelry.',
        parent: null,
        image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1683301216/456126_CAO0G_1000_001_080_0000_Light-GG-Marmont-card-case-wallet.jpg',
        isFeatured: true,
        order: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 6,
        name: 'Sports & Fitness',
        slug: 'sports-fitness',
        description: 'Sports equipment and fitness gear for various activities.',
        parent: null,
        image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0a9454fe-8940-46c1-9d5a-4f9f63ec32fd/premier-league-flight-football-pMfGLm.png',
        isFeatured: true,
        order: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 7,
        name: 'Beauty & Cosmetics',
        slug: 'beauty-cosmetics',
        description: 'Beauty products and cosmetics including makeup, skincare, and fragrances.',
        parent: null,
        image: 'https://www.chanel.com/images/t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.2/w_620/rouge-allure-luminous-intense-lip-colour-p174812-8830463279134.jpg',
        isFeatured: true,
        order: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Sub-categories for Men's Clothing
      {
        _id: 101,
        name: 'Men\'s Shirts',
        slug: 'mens-shirts',
        description: 'Shirts for men including t-shirts, dress shirts, and casual shirts.',
        parent: 1,
        image: 'https://image.hm.com/assets/hm/a1/75/a17586a1cd4609a1f35fb3d96610261519a557af.jpg?imwidth=1260',
        isFeatured: false,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 102,
        name: 'Men\'s Pants',
        slug: 'mens-pants',
        description: 'Pants for men including jeans, trousers, and shorts.',
        parent: 1,
        image: 'https://image.hm.com/assets/hm/22/d5/22d5577dd4f5e3120520ef4f80716169f75f6a54.jpg?imwidth=1260',
        isFeatured: false,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 103,
        name: 'Men\'s Outerwear',
        slug: 'mens-outerwear',
        description: 'Outerwear for men including jackets, coats, and sweaters.',
        parent: 1,
        image: 'https://image.hm.com/assets/hm/ed/f7/edf7af47614bc75801da882fb47ee4e8a7f326a1.jpg?imwidth=1260',
        isFeatured: false,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Sub-categories for Women's Clothing
      {
        _id: 201,
        name: 'Women\'s Tops',
        slug: 'womens-tops',
        description: 'Tops for women including t-shirts, blouses, and shirts.',
        parent: 2,
        image: 'https://image.hm.com/assets/hm/f7/ed/f7ed3859e6330b7c450d4fcf451a194a3f21b709.jpg?imwidth=1260',
        isFeatured: false,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 202,
        name: 'Women\'s Dresses',
        slug: 'womens-dresses',
        description: 'Dresses for women including casual, formal, and evening dresses.',
        parent: 2,
        image: 'https://image.hm.com/assets/hm/33/65/3365021f2b2810654c1e8a93949d47c5d8830e45.jpg?imwidth=1260',
        isFeatured: false,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 203,
        name: 'Women\'s Skirts',
        slug: 'womens-skirts',
        description: 'Skirts for women including mini skirts, midi skirts, and maxi skirts.',
        parent: 2,
        image: 'https://image.hm.com/assets/hm/d2/06/d20644a5f962771007e5f59c0b4728814d2e9ed0.jpg?imwidth=1260',
        isFeatured: false,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 204,
        name: 'Women\'s Pants',
        slug: 'womens-pants',
        description: 'Pants for women including jeans, trousers, and leggings.',
        parent: 2,
        image: 'https://image.hm.com/assets/hm/82/e4/82e4993929e434d96980a6a598ba4dfda1787066.jpg?imwidth=1260',
        isFeatured: false,
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Insert the categories
    const result = await categoriesCollection.insertMany(categories);
    console.log(`${result.insertedCount} categories were inserted.`);

    console.log('Categories added successfully.');
  } catch (error) {
    console.error('Error adding categories:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

// Run the function to add categories
addCategories().catch(console.error);
