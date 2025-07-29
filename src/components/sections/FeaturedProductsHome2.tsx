'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badges?: Array<{
    type: 'hot' | 'new' | 'sale';
    text: string;
    discount?: string;
  }>;
  rating?: number;
  link: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'T-shirt with slogan',
    price: 5250.00,
    image: '/images/product/home-2/product-1.jpg',
    badges: [
      { type: 'hot', text: 'hot' },
      { type: 'sale', text: '-25%', discount: '-25%' }
    ],
    rating: 5,
    link: '/product/1'
  },
  {
    id: 2,
    name: 'White crossbody bag',
    price: 1250.00,
    image: '/images/product/home-2/product-2.jpg',
    rating: 4,
    link: '/product/2'
  },
  {
    id: 3,
    name: 'Velvet backpack',
    price: 5250.00,
    image: '/images/product/home-2/product-3.jpg',
    badges: [
      { type: 'new', text: 'New' }
    ],
    rating: 5,
    link: '/product/3'
  },
  {
    id: 4,
    name: 'Square cream sunglasses',
    price: 5250.00,
    originalPrice: 725.00,
    image: '/images/product/home-2/product-4.jpg',
    badges: [
      { type: 'new', text: 'New' },
      { type: 'sale', text: '-25%', discount: '-25%' }
    ],
    rating: 4,
    link: '/product/4'
  },
  {
    id: 5,
    name: 'Shirt Regular fit',
    price: 95.00,
    originalPrice: 725.00,
    image: '/images/product/home-2/product-5.jpg',
    rating: 5,
    link: '/product/5'
  },
  {
    id: 6,
    name: 'T-shirt with slogan',
    price: 1250.00,
    originalPrice: 725.00,
    image: '/images/product/home-2/product-6.jpg',
    rating: 3,
    link: '/product/6'
  },
  {
    id: 7,
    name: 'Leather brown belt',
    price: 350.00,
    image: '/images/product/home-2/product-7.jpg',
    rating: 4,
    link: '/product/7'
  },
  {
    id: 8,
    name: 'Denim shorts',
    price: 5250.00,
    image: '/images/product/home-2/product-8.jpg',
    badges: [
      { type: 'new', text: 'New' }
    ],
    rating: 5,
    link: '/product/8'
  }
];

export function FeaturedProductsHome2() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const renderStars = (rating: number = 0) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="ps-section--feature-products-1 py-16 bg-white">
      <div className="ps-container-fluid px-4 md:px-8">
        {/* Section Header */}
        <div className="ps-section__header text-center mb-12">
          <h3 
            className="ps-heading text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            Shop Featured Products
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed 
            fermentum nibh, vel aliquet massa. Etiam in magna id risus lacinia 
            luctus eget eu est.
          </p>
        </div>

        {/* Products Grid */}
        <div className="ps-section__content">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="ps-product--1 group cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Thumbnail */}
                <div className="ps-product__thumbnail relative overflow-hidden rounded-lg bg-gray-100">
                  {/* Badges */}
                  {product.badges && (
                    <div className="absolute top-3 left-3 z-10 space-y-1">
                      {product.badges.map((badge, index) => (
                        <div
                          key={index}
                          className={`ps-badge ps-badge--${badge.type} inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                            badge.type === 'hot' 
                              ? 'bg-red-500 text-white' 
                              : badge.type === 'new'
                              ? 'bg-green-500 text-white'
                              : 'bg-orange-500 text-white'
                          }`}
                        >
                          <span>{badge.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative aspect-square w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className={`
                      ps-btn ps-product__shopping absolute bottom-4 left-1/2 -translate-x-1/2
                      px-6 py-2 bg-[#ca2028] text-white text-sm font-semibold rounded-full
                      transition-all duration-300 transform ${
                        hoveredProduct === product.id
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-4 opacity-0'
                      }
                      hover:bg-[#a01a20] shadow-lg hover:shadow-xl
                    `}
                    onClick={() => window.location.href = product.link}
                  >
                    <i className="exist-minicart mr-2"></i>
                    Add to cart
                  </button>

                  {/* Product Actions */}
                  <ul 
                    className={`
                      ps-product__actions absolute top-3 right-3 space-y-2 transition-all duration-300 ${
                        hoveredProduct === product.id
                          ? 'translate-x-0 opacity-100'
                          : 'translate-x-4 opacity-0'
                      }
                    `}
                  >
                    <li>
                      <button
                        className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center text-gray-600 hover:text-red-500 transition-all duration-200"
                        data-label="Favorite"
                      >
                        <i className="exist-heart"></i>
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-500 transition-all duration-200"
                        data-label="Compare"
                      >
                        <i className="exist-compare"></i>
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center text-gray-600 hover:text-green-500 transition-all duration-200"
                        data-label="Quick View"
                      >
                        <i className="exist-quickview"></i>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Product Content */}
                <div className="ps-product__content pt-4 text-center">
                  <a 
                    className="ps-product__title block text-gray-800 hover:text-[#ca2028] transition-colors duration-200 font-medium mb-2"
                    href={product.link}
                  >
                    {product.name}
                  </a>
                  
                  {/* Rating */}
                  {product.rating && (
                    <div className="mb-2 flex justify-center">
                      {renderStars(product.rating)}
                    </div>
                  )}

                  {/* Price */}
                  <span className="ps-product__price text-lg font-semibold">
                    {formatPrice(product.price)}
                    {product.originalPrice && (
                      <del className="ml-2 text-gray-400 text-sm font-normal">
                        {formatPrice(product.originalPrice)}
                      </del>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="ps-btn ps-btn--black px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
              Load more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
