// Script to add 16 more products to the MongoDB database
// Run this script with Node.js to add mock products

const { MongoClient } = require('mongodb');

// MongoDB connection string - replace with your actual connection string from .env.local
const uri = 'mongodb+srv://nhatdang082000:hkVhYpHo7jAw1oNv@tmdt.shm3cnx.mongodb.net/?retryWrites=true&w=majority&appName=TMDT';

async function addMockProducts() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('ecommerce'); // Update if your database name is different
    const productsCollection = database.collection('products');

    // Check current highest product ID
    const currentProductCount = await productsCollection.countDocuments();
    console.log(`Current product count: ${currentProductCount}`);

    // Mock products data - updated from bangtinh.csv
    const mockProducts = [
      // H&M - Oversized Teddy Fleece Vest - Dark brown
      {
        _id: 'prod-hm-001-vest-brown',
        name: 'Oversized Teddy Fleece Vest',
        slug: 'oversized-teddy-fleece-vest-dark-brown',
        description: 'Oversized vest in soft teddy fleece with narrow binding at edges. V-neck, snap fasteners at front, and diagonal welt front pockets.',
        price: 445000,
        isFeatured: true,
        isNew: true,
        categoryId: 1, // Assuming shirt is in category 1
        brandId: 6, // Assuming H&M is brand 6
        variants: [
          {
            _id: 'var-hm-001-brown-s',
            color: 'Dark brown',
            size: 'S',
            stock: 15,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/ed/f7/edf7af47614bc75801da882fb47ee4e8a7f326a1.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-001-brown-m',
            color: 'Dark brown',
            size: 'M',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/ed/f7/edf7af47614bc75801da882fb47ee4e8a7f326a1.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-001-brown-l',
            color: 'Dark brown',
            size: 'L',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/ed/f7/edf7af47614bc75801da882fb47ee4e8a7f326a1.jpg?imwidth=1260',
          }
        ],
        images: [
          {
            _id: 'img-hm-001-1',
            imageUrl: 'https://image.hm.com/assets/hm/ed/f7/edf7af47614bc75801da882fb47ee4e8a7f326a1.jpg?imwidth=1260',
            alt: 'Oversized Teddy Fleece Vest - Front'
          },
          {
            _id: 'img-hm-001-2',
            imageUrl: 'https://image.hm.com/assets/hm/22/0b/220b056c4f4107713fbc3bf84093b62bf8c76a2f.jpg?imwidth=1260',
            alt: 'Oversized Teddy Fleece Vest - Back'
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // H&M - Oversized Teddy Fleece Vest - White
      {
        _id: 'prod-hm-002-vest-white',
        name: 'Oversized Teddy Fleece Vest',
        slug: 'oversized-teddy-fleece-vest-white',
        description: 'Oversized vest in soft teddy fleece with narrow binding at edges. V-neck, snap fasteners at front, and diagonal welt front pockets.',
        price: 445000,
        isFeatured: false,
        isNew: true,
        categoryId: 1,
        brandId: 6,
        variants: [
          {
            _id: 'var-hm-002-white-s',
            color: 'White',
            size: 'S',
            stock: 12,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/ca/09/ca0956853811fd09c808d14bc68f752e4371c644.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-002-white-m',
            color: 'White',
            size: 'M',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/ca/09/ca0956853811fd09c808d14bc68f752e4371c644.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-002-white-l',
            color: 'White',
            size: 'L',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/ca/09/ca0956853811fd09c808d14bc68f752e4371c644.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-002-1',
            imageUrl: 'https://image.hm.com/assets/hm/ca/09/ca0956853811fd09c808d14bc68f752e4371c644.jpg?imwidth=1260',
            alt: 'Oversized Teddy Fleece Vest - White - Front',
          },
          {
            _id: 'img-hm-002-2',
            imageUrl: 'https://image.hm.com/assets/hm/1f/2f/1f2f8dd22f085a997fef4980a630f74caaa7bbe8.jpg?imwidth=1260',
            alt: 'Oversized Teddy Fleece Vest - White - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Váy H&M - Thời trang nữ (Category 2, Brand 6) 
      // H&M - Glittery Bouclé Dress
      {
        _id: 'prod-hm-003-boucle-dress',
        name: 'Glittery Bouclé Dress',
        slug: 'glittery-boucle-dress',
        description: 'Short dress in bouclé jersey with glittery thread. Low-cut V-neck, decorative button placket at front, and 3/4-length sleeves. Flared skirt.',
        price: 1100000,
        isFeatured: true,
        isNew: true,
        categoryId: 2, // dress category
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-003-black-s',
            color: 'Black',
            size: 'S',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/f5/ee/f5ee210dbeea75690b63e2d2774bcdbf2db7b6a3.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-003-black-m',
            color: 'Black',
            size: 'M',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/f5/ee/f5ee210dbeea75690b63e2d2774bcdbf2db7b6a3.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-003-black-l',
            color: 'Black',
            size: 'L',
            stock: 5,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/f5/ee/f5ee210dbeea75690b63e2d2774bcdbf2db7b6a3.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-003-1',
            imageUrl: 'https://image.hm.com/assets/hm/f5/ee/f5ee210dbeea75690b63e2d2774bcdbf2db7b6a3.jpg?imwidth=1260',
            alt: 'Glittery Bouclé Dress - Front',
          },
          {
            _id: 'img-hm-003-2',
            imageUrl: 'https://image.hm.com/assets/hm/51/85/51857fba88989cf9ecbf13a36992442f19a6db10.jpg?imwidth=1260',
            alt: 'Glittery Bouclé Dress - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // H&M - Pleated Mesh Skirt
      {
        _id: 'prod-hm-004-pleated-skirt',
        name: 'Pleated Mesh Skirt',
        slug: 'pleated-mesh-skirt',
        description: 'A-line, calf-length skirt in pleated mesh. Waistband with covered elastic, laser-cut hem, and jersey lining.',
        price: 890000,
        isFeatured: false,
        isNew: true,
        categoryId: 2, // Assuming skirts are in category 2 as well
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-004-beige-s',
            color: 'Beige/leopard print',
            size: 'S',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/74/2b/742bb06ce61ad462fbf4911480932529dc7ddba0.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-004-beige-m',
            color: 'Beige/leopard print',
            size: 'M',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/74/2b/742bb06ce61ad462fbf4911480932529dc7ddba0.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-004-beige-l',
            color: 'Beige/leopard print',
            size: 'L',
            stock: 5,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/74/2b/742bb06ce61ad462fbf4911480932529dc7ddba0.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-004-1',
            imageUrl: 'https://image.hm.com/assets/hm/74/2b/742bb06ce61ad462fbf4911480932529dc7ddba0.jpg?imwidth=1260',
            alt: 'Pleated Mesh Skirt - Front',
          },
          {
            _id: 'img-hm-004-2',
            imageUrl: 'https://image.hm.com/assets/hm/d8/51/d851e799d1ef41988bd3b5c77252c2332fe2dcea.jpg?imwidth=1260',
            alt: 'Pleated Mesh Skirt - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Giày Adidas - Giày dép (Category 3, Brand 2)
      // H&M - Chain-Detail Long-Sleeved Top - White
      {
        _id: 'prod-hm-005-chain-top-white',
        name: 'Chain-Detail Long-Sleeved Top',
        slug: 'chain-detail-long-sleeved-top-white',
        description: 'Short, fitted top in soft jersey. Round, low-cut neckline at front and back, decorative chain at front edge of neckline, and long sleeves.',
        price: 235000,
        isFeatured: true,
        isNew: true,
        categoryId: 1, // shirt category
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-005-white-s',
            color: 'White',
            size: 'S',
            stock: 12,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/f7/ed/f7ed3859e6330b7c450d4fcf451a194a3f21b709.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-005-white-m',
            color: 'White',
            size: 'M',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/f7/ed/f7ed3859e6330b7c450d4fcf451a194a3f21b709.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-005-white-l',
            color: 'White',
            size: 'L',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/f7/ed/f7ed3859e6330b7c450d4fcf451a194a3f21b709.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-005-1',
            imageUrl: 'https://image.hm.com/assets/hm/f7/ed/f7ed3859e6330b7c450d4fcf451a194a3f21b709.jpg?imwidth=1260',
            alt: 'Chain-Detail Long-Sleeved Top - White - Front',
          },
          {
            _id: 'img-hm-005-2',
            imageUrl: 'https://image.hm.com/assets/hm/b4/c6/b4c67ea73b24474c04000ea8fa4fc62b92e96d95.jpg?imwidth=1260',
            alt: 'Chain-Detail Long-Sleeved Top - White - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Giày cao gót Gucci - Giày dép (Category 3, Brand 4)
      // H&M - Chain-Detail Long-Sleeved Top - Black
      {
        _id: 'prod-hm-006-chain-top-black',
        name: 'Chain-Detail Long-Sleeved Top',
        slug: 'chain-detail-long-sleeved-top-black',
        description: 'Short, fitted top in soft jersey. Round, low-cut neckline at front and back, decorative chain at front edge of neckline, and long sleeves.',
        price: 313000,
        isFeatured: true,
        isNew: false,
        categoryId: 1, // shirt category
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-006-black-s',
            color: 'Black',
            size: 'S',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/b3/8c/b38c46c3b1636572cb6b80651c629a93cfa5d9db.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-006-black-m',
            color: 'Black',
            size: 'M',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/b3/8c/b38c46c3b1636572cb6b80651c629a93cfa5d9db.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-006-black-l',
            color: 'Black',
            size: 'L',
            stock: 5,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/b3/8c/b38c46c3b1636572cb6b80651c629a93cfa5d9db.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-006-1',
            imageUrl: 'https://image.hm.com/assets/hm/b3/8c/b38c46c3b1636572cb6b80651c629a93cfa5d9db.jpg?imwidth=1260',
            alt: 'Chain-Detail Long-Sleeved Top - Black - Front',
          },
          {
            _id: 'img-hm-006-2',
            imageUrl: 'https://image.hm.com/assets/hm/d4/e6/d4e64e579b9c106d82a8637d70d6311e9c70d9ae.jpg?imwidth=1260',
            alt: 'Chain-Detail Long-Sleeved Top - Black - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Samsung Galaxy S24 - Điện tử (Category 4, Brand 4)
      // H&M - Organza Skirt
      {
        _id: 'prod-hm-007-organza-skirt',
        name: 'Organza Skirt',
        slug: 'organza-skirt',
        description: 'Calf-length skirt in sheer organza with a slight sheen. Regular waist, shaping darts at back, and a concealed zipper at one side with hook-and-eye fastener. Slit at one side of hem. Short liner skirt.',
        price: 1300000,
        isFeatured: true,
        isNew: true,
        categoryId: 2, // skirt category
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-007-gray-s',
            color: 'Gray',
            size: 'S',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/d2/06/d20644a5f962771007e5f59c0b4728814d2e9ed0.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-007-gray-m',
            color: 'Gray',
            size: 'M',
            stock: 6,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/d2/06/d20644a5f962771007e5f59c0b4728814d2e9ed0.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-007-gray-l',
            color: 'Gray',
            size: 'L',
            stock: 4,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/d2/06/d20644a5f962771007e5f59c0b4728814d2e9ed0.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-007-1',
            imageUrl: 'https://image.hm.com/assets/hm/d2/06/d20644a5f962771007e5f59c0b4728814d2e9ed0.jpg?imwidth=1260',
            alt: 'Organza Skirt - Front',
          },
          {
            _id: 'img-hm-007-2',
            imageUrl: 'https://image.hm.com/assets/hm/e9/2f/e92f91d432470cc8d0d2e0f4dc105495d5600d0d.jpg?imwidth=1260',
            alt: 'Organza Skirt - Detail',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Tai nghe Apple AirPods Pro - Phụ kiện (Category 5, Brand 3)
      // H&M - Flared Crushed-Velour Leggings - Orange
      {
        _id: 'prod-hm-008-velour-leggings-orange',
        name: 'Flared Crushed-Velour Leggings',
        slug: 'flared-crushed-velour-leggings-orange',
        description: 'Leggings in crushed velour. Concealed elasticized waistband and flared hems.',
        price: 670000,
        isFeatured: false,
        isNew: false,
        categoryId: 2, // pants category (assuming it's within women's category)
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-008-orange-s',
            color: 'Orange',
            size: 'S',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/8e/07/8e07c8b455756ca16e71465e818c73776cfe8b2a.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-008-orange-m',
            color: 'Orange',
            size: 'M',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/8e/07/8e07c8b455756ca16e71465e818c73776cfe8b2a.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-008-orange-l',
            color: 'Orange',
            size: 'L',
            stock: 5,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/8e/07/8e07c8b455756ca16e71465e818c73776cfe8b2a.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-008-1',
            imageUrl: 'https://image.hm.com/assets/hm/8e/07/8e07c8b455756ca16e71465e818c73776cfe8b2a.jpg?imwidth=1260',
            alt: 'Flared Crushed-Velour Leggings - Orange - Front',
          },
          {
            _id: 'img-hm-008-2',
            imageUrl: 'https://image.hm.com/assets/hm/37/92/37922f933ec1a3d51316a7bc952b91b0ee204870.jpg?imwidth=1260',
            alt: 'Flared Crushed-Velour Leggings - Orange - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ví Gucci - Phụ kiện (Category 5, Brand 4)
      // H&M - Flared Crushed-Velour Leggings - Dark brown
      {
        _id: 'prod-hm-009-velour-leggings-brown',
        name: 'Flared Crushed-Velour Leggings',
        slug: 'flared-crushed-velour-leggings-dark-brown',
        description: 'Leggings in crushed velour. Concealed elasticized waistband and flared hems.',
        price: 670000,
        isFeatured: true,
        isNew: false,
        categoryId: 2, // pants category (assuming it's within women's category)
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-009-brown-s',
            color: 'Dark brown',
            size: 'S',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/22/d5/22d5577dd4f5e3120520ef4f80716169f75f6a54.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-009-brown-m',
            color: 'Dark brown',
            size: 'M',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/22/d5/22d5577dd4f5e3120520ef4f80716169f75f6a54.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-009-brown-l',
            color: 'Dark brown',
            size: 'L',
            stock: 5,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/22/d5/22d5577dd4f5e3120520ef4f80716169f75f6a54.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-009-1',
            imageUrl: 'https://image.hm.com/assets/hm/22/d5/22d5577dd4f5e3120520ef4f80716169f75f6a54.jpg?imwidth=1260',
            alt: 'Flared Crushed-Velour Leggings - Dark brown - Front',
          },
          {
            _id: 'img-hm-009-2',
            imageUrl: 'https://image.hm.com/assets/hm/1a/73/1a73ce4de70a02e757060f5e3ca92030a2be81fe.jpg?imwidth=1260',
            alt: 'Flared Crushed-Velour Leggings - Dark brown - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Bóng đá Nike - Thể thao (Category 6, Brand 1)
      // H&M - Crushed Velour Top - Orange
      {
        _id: 'prod-hm-010-velour-top-orange',
        name: 'Crushed Velour Top',
        slug: 'crushed-velour-top-orange',
        description: 'Fitted top in crushed velour. Round neckline and long sleeves.',
        price: 670000,
        isFeatured: false,
        isNew: true,
        categoryId: 1, // shirt category
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-010-orange-s',
            color: 'Orange',
            size: 'S',
            stock: 12,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/b1/e0/b1e07182ecd48e866ad1e118001cf5384d70d3fd.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-010-orange-m',
            color: 'Orange',
            size: 'M',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/b1/e0/b1e07182ecd48e866ad1e118001cf5384d70d3fd.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-010-orange-l',
            color: 'Orange',
            size: 'L',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/b1/e0/b1e07182ecd48e866ad1e118001cf5384d70d3fd.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-010-1',
            imageUrl: 'https://image.hm.com/assets/hm/b1/e0/b1e07182ecd48e866ad1e118001cf5384d70d3fd.jpg?imwidth=1260',
            alt: 'Crushed Velour Top - Orange - Front',
          },
          {
            _id: 'img-hm-010-2',
            imageUrl: 'https://image.hm.com/assets/hm/ec/a5/eca509ff218cae6b9939d61012ef101516cdbd2d.jpg?imwidth=1260',
            alt: 'Crushed Velour Top - Orange - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Máy tập thể hình Adidas - Thể thao (Category 6, Brand 2)
      // H&M - Crushed Velour Top - Dark brown
      {
        _id: 'prod-hm-011-velour-top-brown',
        name: 'Crushed Velour Top',
        slug: 'crushed-velour-top-dark-brown',
        description: 'Fitted top in crushed velour. Round neckline and long sleeves.',
        price: 670000,
        isFeatured: false,
        isNew: false,
        categoryId: 1, // shirt category
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-011-brown-s',
            color: 'Dark brown',
            size: 'S',
            stock: 12,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/55/dc/55dca9f11dfd90e380beedd526aadba856213a0f.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-011-brown-m',
            color: 'Dark brown',
            size: 'M',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/55/dc/55dca9f11dfd90e380beedd526aadba856213a0f.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-011-brown-l',
            color: 'Dark brown',
            size: 'L',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/55/dc/55dca9f11dfd90e380beedd526aadba856213a0f.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-011-1',
            imageUrl: 'https://image.hm.com/assets/hm/55/dc/55dca9f11dfd90e380beedd526aadba856213a0f.jpg?imwidth=1260',
            alt: 'Crushed Velour Top - Dark brown - Front',
          },
          {
            _id: 'img-hm-011-2',
            imageUrl: 'https://image.hm.com/assets/hm/da/f2/daf2ccca73055594853d4274a8aee418f634e4ec.jpg?imwidth=1260',
            alt: 'Crushed Velour Top - Dark brown - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Son môi Chanel - Làm đẹp (Category 7, Brand 7)
      // H&M - Ruffle-Trimmed One-Shoulder Dress
      {
        _id: 'prod-hm-012-ruffle-dress',
        name: 'Ruffle-Trimmed One-Shoulder Dress',
        slug: 'ruffle-trimmed-one-shoulder-dress',
        description: 'Short, fitted, sleeveless one-shoulder dress in woven stretch fabric. Wide ruffle trim and narrow elastic at upper edge. Unlined.',
        price: 520000,
        isFeatured: true,
        isNew: true,
        categoryId: 2, // dress category
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-012-black-s',
            color: 'Black',
            size: 'S',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/6d/00/6d0044f5f40eba8a441ed2c903ea62dc7db34051.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-012-black-m',
            color: 'Black',
            size: 'M',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/6d/00/6d0044f5f40eba8a441ed2c903ea62dc7db34051.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-012-black-l',
            color: 'Black',
            size: 'L',
            stock: 5,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/6d/00/6d0044f5f40eba8a441ed2c903ea62dc7db34051.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-012-1',
            imageUrl: 'https://image.hm.com/assets/hm/6d/00/6d0044f5f40eba8a441ed2c903ea62dc7db34051.jpg?imwidth=1260',
            alt: 'Ruffle-Trimmed One-Shoulder Dress - Front',
          },
          {
            _id: 'img-hm-012-2',
            imageUrl: 'https://image.hm.com/assets/hm/46/d0/46d00bdf13d6b70cd3988085714b22de67263fed.jpg?imwidth=1260',
            alt: 'Ruffle-Trimmed One-Shoulder Dress - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Nước hoa Chanel - Làm đẹp (Category 7, Brand 7)
      // H&M - Tie-Neck Mini Dress
      {
        _id: 'prod-hm-013-tie-neck-dress',
        name: 'Tie-Neck Mini Dress',
        slug: 'tie-neck-mini-dress',
        description: 'Oversized mini dress in woven fabric. Stand-up collar with long ties, V-shaped opening at front, dropped shoulders, and long, voluminous balloon sleeves with elasticized cuffs. Unlined.',
        price: 1890000,
        isFeatured: true,
        isNew: false,
        categoryId: 2, // dress category
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-013-beige-s',
            color: 'Beige/leopard print',
            size: 'S',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/93/9a/939a94b9235cf64e9361656479b877fb991a4619.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-013-beige-m',
            color: 'Beige/leopard print',
            size: 'M',
            stock: 6,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/93/9a/939a94b9235cf64e9361656479b877fb991a4619.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-013-beige-l',
            color: 'Beige/leopard print',
            size: 'L',
            stock: 4,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/93/9a/939a94b9235cf64e9361656479b877fb991a4619.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-013-1',
            imageUrl: 'https://image.hm.com/assets/hm/93/9a/939a94b9235cf64e9361656479b877fb991a4619.jpg?imwidth=1260',
            alt: 'Tie-Neck Mini Dress - Front',
          },
          {
            _id: 'img-hm-013-2',
            imageUrl: 'https://image.hm.com/assets/hm/3f/99/3f99584a59a6ac64c33332224806030041cb3e2e.jpg?imwidth=1260',
            alt: 'Tie-Neck Mini Dress - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Laptop Apple MacBook - Điện tử (Category 4, Brand 3)
      // H&M - Cape Dress
      {
        _id: 'prod-hm-014-cape-dress',
        name: 'Cape Dress',
        slug: 'cape-dress',
        description: 'Elegant cape dress in soft fabric with flowing silhouette. Perfect for special occasions with its distinctive cape overlay design.',
        price: 1445000,
        isFeatured: true,
        isNew: true,
        categoryId: 2, // dress category
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-014-black-s',
            color: 'Black',
            size: 'S',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/33/65/3365021f2b2810654c1e8a93949d47c5d8830e45.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-014-black-m',
            color: 'Black',
            size: 'M',
            stock: 6,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/33/65/3365021f2b2810654c1e8a93949d47c5d8830e45.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-014-black-l',
            color: 'Black',
            size: 'L',
            stock: 4,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/33/65/3365021f2b2810654c1e8a93949d47c5d8830e45.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-014-1',
            imageUrl: 'https://image.hm.com/assets/hm/33/65/3365021f2b2810654c1e8a93949d47c5d8830e45.jpg?imwidth=1260',
            alt: 'Cape Dress - Front',
          },
          {
            _id: 'img-hm-014-2',
            imageUrl: 'https://image.hm.com/assets/hm/e8/69/e869d1fd0387d630eaffca8000a345a916733869.jpg?imwidth=1260',
            alt: 'Cape Dress - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Smart Watch Apple - Phụ kiện (Category 5, Brand 3)
      // H&M - Chain-Detail Mini Skort
      {
        _id: 'prod-hm-015-chain-skort',
        name: 'Chain-Detail Mini Skort',
        slug: 'chain-detail-mini-skort',
        description: 'Fitted mini skort in woven fabric. Double layers at front with visible seams. Regular waist with a decorative double-chain detail at front. Covered elastic and a concealed zipper at back.',
        price: 260000,
        isFeatured: true,
        isNew: true,
        categoryId: 2, // skirt category
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-015-black-s',
            color: 'Black',
            size: 'S',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/de/ae/deae475398687d928a6146b32debe75262e11a0a.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-015-black-m',
            color: 'Black',
            size: 'M',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/de/ae/deae475398687d928a6146b32debe75262e11a0a.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-015-black-l',
            color: 'Black',
            size: 'L',
            stock: 5,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/de/ae/deae475398687d928a6146b32debe75262e11a0a.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-015-1',
            imageUrl: 'https://image.hm.com/assets/hm/de/ae/deae475398687d928a6146b32debe75262e11a0a.jpg?imwidth=1260',
            alt: 'Chain-Detail Mini Skort - Front',
          },
          {
            _id: 'img-hm-015-2',
            imageUrl: 'https://image.hm.com/assets/hm/14/df/14df02296b2261b65f72bd76386004cc108a1c0a.jpg?imwidth=1260',
            alt: 'Chain-Detail Mini Skort - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Quần thể thao Nike - Thể thao (Category 6, Brand 1)
      // H&M - Regular Fit Textured Overshirt
      {
        _id: 'prod-hm-016-textured-overshirt',
        name: 'Regular Fit Textured Overshirt',
        slug: 'regular-fit-textured-overshirt',
        description: 'Regular-fit overshirt in woven, textured cotton with a comfortable, classic silhouette. Turn-down collar, buttons without placket, an open chest pocket, and yoke at back. Long sleeves, adjustable cuffs with button, and sleeve placket. Straight-cut hem.',
        price: 890000,
        isFeatured: false,
        isNew: false,
        categoryId: 1, // shirt category
        brandId: 6, // H&M brand
        variants: [
          {
            _id: 'var-hm-016-beige-s',
            color: 'Beige',
            size: 'S',
            stock: 12,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/a1/75/a17586a1cd4609a1f35fb3d96610261519a557af.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-016-beige-m',
            color: 'Beige',
            size: 'M',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/a1/75/a17586a1cd4609a1f35fb3d96610261519a557af.jpg?imwidth=1260',
          },
          {
            _id: 'var-hm-016-beige-l',
            color: 'Beige',
            size: 'L',
            stock: 8,
            priceOverride: null,
            imageUrl: 'https://image.hm.com/assets/hm/a1/75/a17586a1cd4609a1f35fb3d96610261519a557af.jpg?imwidth=1260',
          },
        ],
        images: [
          {
            _id: 'img-hm-016-1',
            imageUrl: 'https://image.hm.com/assets/hm/a1/75/a17586a1cd4609a1f35fb3d96610261519a557af.jpg?imwidth=1260',
            alt: 'Regular Fit Textured Overshirt - Front',
          },
          {
            _id: 'img-hm-016-2',
            imageUrl: 'https://image.hm.com/assets/hm/7e/58/7e58c5a4b09e8bd213942bcba2f31d71583a1f53.jpg?imwidth=1260',
            alt: 'Regular Fit Textured Overshirt - Back',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Túi xách Gucci - Phụ kiện (Category 5, Brand 4) 
      {
        _id: 'prod-5017-gucci-bag',
        name: 'Túi xách Gucci GG Marmont',
        slug: 'tui-xach-gucci-gg-marmont',
        description: 'Túi xách nữ Gucci GG Marmont bằng da cao cấp, logo GG đặc trưng, thiết kế sang trọng, tinh tế.',
        price: 45000000,
        isFeatured: true,
        isNew: false,
        categoryId: 5,
        brandId: 4,
        variants: [
          {
            _id: 'var-5017-black-one',
            color: 'Đen',
            size: 'Medium',
            stock: 5,
            priceOverride: null,
            imageUrl: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1633026306/443497_DTDIT_1000_001_060_0000_Light-GG-Marmont-medium-tote.jpg',
          },
        ],
        images: [
          {
            _id: 'img-5017-1',
            imageUrl: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1633026306/443497_DTDIT_1000_001_060_0000_Light-GG-Marmont-medium-tote.jpg',
            alt: 'Túi xách Gucci GG Marmont',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Áo khoác Zara - Thời trang nữ (Category 2, Brand 5)
      {
        _id: 'prod-5018-zara-jacket',
        name: 'Áo khoác Zara Oversized',
        slug: 'ao-khoac-zara-oversized',
        description: 'Áo khoác nữ Zara kiểu dáng oversized, chất liệu denim cao cấp, phong cách hiện đại.',
        price: 1850000,
        isFeatured: true,
        isNew: true,
        categoryId: 2,
        brandId: 5,
        variants: [
          {
            _id: 'var-5018-blue-s',
            color: 'Xanh',
            size: 'S',
            stock: 12,
            priceOverride: null,
            imageUrl: 'https://static.zara.net/photos///2024/V/0/1/p/6688/053/406/2/w/750/6688053406_1_1_1.jpg',
          },
          {
            _id: 'var-5018-blue-m',
            color: 'Xanh',
            size: 'M',
            stock: 15,
            priceOverride: null,
            imageUrl: 'https://static.zara.net/photos///2024/V/0/1/p/6688/053/406/2/w/750/6688053406_1_1_1.jpg',
          },
        ],
        images: [
          {
            _id: 'img-5018-1',
            imageUrl: 'https://static.zara.net/photos///2024/V/0/1/p/6688/053/406/2/w/750/6688053406_1_1_1.jpg',
            alt: 'Áo khoác Zara Oversized - Mặt trước',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Quần Jeans Levi's - Thời trang nam (Category 1, Brand 8)
      {
        _id: 'prod-5019-levis-jeans',
        name: 'Quần Jeans Levi\'s 501',
        slug: 'quan-jeans-levis-501',
        description: 'Quần jeans nam Levi\'s 501 chính hãng, form classic, chất liệu denim cao cấp, bền đẹp theo thời gian.',
        price: 1950000,
        isFeatured: false,
        isNew: false,
        categoryId: 1,
        brandId: 8, // Levi's brand ID (assuming it's 8)
        variants: [
          {
            _id: 'var-5019-blue-30',
            color: 'Xanh đậm',
            size: '30',
            stock: 20,
            priceOverride: null,
            imageUrl: 'https://lsco.scene7.com/is/image/lsco/501-original-fit-jeans-005011891-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800',
          },
          {
            _id: 'var-5019-blue-32',
            color: 'Xanh đậm',
            size: '32',
            stock: 15,
            priceOverride: null,
            imageUrl: 'https://lsco.scene7.com/is/image/lsco/501-original-fit-jeans-005011891-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800',
          },
          {
            _id: 'var-5019-blue-34',
            color: 'Xanh đậm',
            size: '34',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://lsco.scene7.com/is/image/lsco/501-original-fit-jeans-005011891-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800',
          },
        ],
        images: [
          {
            _id: 'img-5019-1',
            imageUrl: 'https://lsco.scene7.com/is/image/lsco/501-original-fit-jeans-005011891-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800',
            alt: 'Quần Jeans Levi\'s 501 - Mặt trước',
          },
          {
            _id: 'img-5019-2',
            imageUrl: 'https://lsco.scene7.com/is/image/lsco/501-original-fit-jeans-005011891-back-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800',
            alt: 'Quần Jeans Levi\'s 501 - Mặt sau',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Áo Polo Lacoste - Thời trang nam (Category 1, Brand 8) 
      {
        _id: 'prod-5020-lacoste-polo',
        name: 'Áo Polo Lacoste Classic Fit',
        slug: 'ao-polo-lacoste-classic-fit',
        description: 'Áo polo nam Lacoste Classic Fit chính hãng, chất liệu cotton cao cấp, logo cá sấu đặc trưng.',
        price: 2250000,
        isFeatured: true,
        isNew: false,
        categoryId: 1,
        brandId: 8, // Lacoste brand ID (assuming it's 8 or another)
        variants: [
          {
            _id: 'var-5020-white-2',
            color: 'Trắng',
            size: '2',
            stock: 12,
            priceOverride: null,
            imageUrl: 'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dw82e2ba79/L1212_001_20.jpg',
          },
          {
            _id: 'var-5020-white-3',
            color: 'Trắng',
            size: '3',
            stock: 15,
            priceOverride: null,
            imageUrl: 'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dw82e2ba79/L1212_001_20.jpg',
          },
          {
            _id: 'var-5020-navy-3',
            color: 'Xanh Navy',
            size: '3',
            stock: 10,
            priceOverride: null,
            imageUrl: 'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dwd9e2324a/L1212_166_20.jpg',
          },
        ],
        images: [
          {
            _id: 'img-5020-1',
            imageUrl: 'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dw82e2ba79/L1212_001_20.jpg',
            alt: 'Áo Polo Lacoste Classic Fit - Trắng',
          },
          {
            _id: 'img-5020-2',
            imageUrl: 'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dwd9e2324a/L1212_166_20.jpg',
            alt: 'Áo Polo Lacoste Classic Fit - Xanh Navy',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    console.log(`Inserting ${mockProducts.length} mock products...`);
    
    // Insert all mock products
    const result = await productsCollection.insertMany(mockProducts);
    
    console.log(`Successfully inserted ${result.insertedCount} mock products.`);
    console.log(`Total products in database: ${await productsCollection.countDocuments()}`);

  } catch (error) {
    console.error('Error adding mock products:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Run the function to add mock products
addMockProducts().catch(console.error);
