'use client';

import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isOnSale?: boolean;
  rating?: number;
}

interface FeaturedProductsProps {
  products?: Product[];
}

export default function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  // Default products nếu không có props
  const defaultProducts: Product[] = [
    {
      id: '1',
      name: 'Black leather handbag',
      price: 725.00,
      originalPrice: 1250.00,
      image: '/images/shop/metro-1.jpg',
      isNew: true,
      rating: 5
    },
    {
      id: '2', 
      name: 'White cotton t-shirt',
      price: 45.00,
      image: '/images/shop/metro-2.jpg',
      isOnSale: true,
      rating: 4
    },
    {
      id: '3',
      name: 'Denim blue jeans',
      price: 89.00,
      originalPrice: 120.00,
      image: '/images/shop/metro-3.jpg',
      rating: 5
    },
    {
      id: '4',
      name: 'Brown leather boots',
      price: 199.00,
      image: '/images/shop/metro-4.jpg',
      isNew: true,
      rating: 4
    },
    {
      id: '5',
      name: 'Elegant dress',
      price: 159.00,
      originalPrice: 220.00,
      image: '/images/shop/metro-5.jpg',
      isOnSale: true,
      rating: 5
    },
    {
      id: '6',
      name: 'Casual sneakers',
      price: 79.00,
      image: '/images/shop/metro-6.jpg',
      rating: 4
    }
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`fa ${index < rating ? 'fa-star' : 'fa-star-o'}`}
      />
    ));
  };

  return (
    <div className="ps-section--home-6-features-product">
      <div className="ps-container-fluid">
        <div className="ps-section__header text-center">
          <h3 className="ps-heading">Shop Featured Products</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed
            fermentum nibh, vel aliquet massa. Etiam in magna id risus lacinia
            luctus eget eu est.
          </p>
        </div>
        
        <div
          className="masonry-wrapper"
          data-col-md="4"
          data-col-sm="3"
          data-col-xs="1"
          data-gap="20"
          data-radio="4:3"
        >
          <div className="ps-masonry">
            <div className="grid-sizer"></div>
            
            {displayProducts.map((product, index) => (
              <div key={product.id} className="grid-item">
                <div className="grid-item__content-wrapper">
                  <div className="ps-product--metro">
                    <div className="ps-product__thumbnail">
                      {/* Product Badges */}
                      {product.isNew && (
                        <div className="ps-badge ps-badge--new">
                          <span>New</span>
                        </div>
                      )}
                      {product.isOnSale && (
                        <div className="ps-badge ps-badge--sale">
                          <span>Sale</span>
                        </div>
                      )}
                      
                      {/* Product Image */}
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                      
                      {/* Add to Cart Button */}
                      <a
                        className="ps-btn ps-product__shopping"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle add to cart
                          console.log('Add to cart:', product.name);
                        }}
                      >
                        <i className="exist-minicart"></i>Add to cart
                      </a>
                      
                      {/* Product Actions */}
                      <ul className="ps-product__actions">
                        <li>
                          <a
                            href="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Wishlist"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('Add to wishlist:', product.name);
                            }}
                          >
                            <i className="exist-heart"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Quick View"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('Quick view:', product.name);
                            }}
                          >
                            <i className="exist-quickview"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Compare"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('Compare:', product.name);
                            }}
                          >
                            <i className="exist-compare"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Product Content */}
                    <div className="ps-product__content">
                      <a className="ps-product__title" href="#">
                        {product.name}
                      </a>
                      
                      {/* Product Rating */}
                      <select className="ps-rating" data-read-only="true">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value={product.rating || 5} selected>
                          {product.rating || 5}
                        </option>
                      </select>
                      
                      {/* Product Price */}
                      <p className="ps-product__price">
                        ${product.price.toFixed(2)}
                        {product.originalPrice && (
                          <del> ${product.originalPrice.toFixed(2)}</del>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
