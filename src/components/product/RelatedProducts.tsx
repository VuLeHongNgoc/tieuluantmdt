'use client';

import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, currentProductId }) => {
  // Giả lập dữ liệu sản phẩm liên quan
  // Trong ứng dụng thực tế, sẽ fetch từ API dựa trên category và loại trừ currentProductId
  const relatedProducts = [
    {
      id: 'product-1',
      title: 'Áo Thun Basic Logo',
      price: 350000,
      image: '/images/product/product-4.jpg',
      category: 'Áo thun',
      isNew: true,
      isHot: false,
      discount: 0
    },
    {
      id: 'product-2',
      title: 'Áo Polo Minimalist',
      price: 450000,
      image: '/images/product/product-5.jpg',
      category: 'Áo thun',
      isNew: false,
      isHot: true,
      discount: 15
    },
    {
      id: 'product-3',
      title: 'Áo Thun Unisex',
      price: 320000,
      image: '/images/product/product-6.jpg',
      category: 'Áo thun',
      isNew: false,
      isHot: false,
      discount: 0
    },
    {
      id: 'product-4',
      title: 'Áo Thun Graphic',
      price: 380000,
      originalPrice: 450000,
      image: '/images/product/product-7.jpg',
      category: 'Áo thun',
      isNew: false,
      isHot: false,
      discount: 10
    }
  ].filter(product => product.id !== currentProductId);

  return (
    <div className="related-products-minimal container mx-auto px-4 py-12">
      <h2 className="text-2xl font-medium mb-8 text-center">Sản phẩm liên quan</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {relatedProducts.map(product => (
          <div key={product.id} className="product-card-minimal group">
            <Link href={`/product/${product.id}`} className="block">
              <div className="relative overflow-hidden bg-gray-100 aspect-square mb-3">
                {/* Product badges */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-black text-white">
                      Mới
                    </span>
                  )}
                  {product.isHot && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-red-500 text-white">
                      Hot
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-500 text-white">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Product image */}
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Quick actions */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex flex-col">
              <Link href={`/product/${product.id}`} className="text-sm font-medium text-gray-900 hover:underline">
                {product.title}
              </Link>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.discount > 0 && (
                  <span className="ml-2 text-xs text-gray-500 line-through">
                    {formatCurrency(product.originalPrice || product.price * (100 / (100 - product.discount)))}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
