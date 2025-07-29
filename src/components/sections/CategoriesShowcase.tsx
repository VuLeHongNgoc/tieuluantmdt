'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  image: string;
  productCount?: number;
  link: string;
  description?: string;
}

interface CategoriesShowcaseProps {
  categories?: Category[];
  title?: string;
  subtitle?: string;
}

export default function CategoriesShowcase({
  categories = [
    {
      id: '1',
      name: 'Thời trang Nam',
      image: '/images/categories/men-fashion.jpg',
      productCount: 156,
      link: '/shop?category=men',
      description: 'Phong cách hiện đại cho nam giới'
    },
    {
      id: '2',
      name: 'Thời trang Nữ',
      image: '/images/categories/women-fashion.jpg',
      productCount: 234,
      link: '/shop?category=women',
      description: 'Thời trang nữ tính và thanh lịch'
    },
    {
      id: '3',
      name: 'Giày dép',
      image: '/images/categories/shoes.jpg',
      productCount: 89,
      link: '/shop?category=shoes',
      description: 'Bộ sưu tập giày đa dạng'
    },
    {
      id: '4',
      name: 'Phụ kiện',
      image: '/images/categories/accessories.jpg',
      productCount: 67,
      link: '/shop?category=accessories',
      description: 'Phụ kiện thời trang cao cấp'
    },
    {
      id: '5',
      name: 'Túi xách',
      image: '/images/categories/bags.jpg',
      productCount: 45,
      link: '/shop?category=bags',
      description: 'Túi xách thời trang và tiện dụng'
    },
    {
      id: '6',
      name: 'Đồng hồ',
      image: '/images/categories/watches.jpg',
      productCount: 32,
      link: '/shop?category=watches',
      description: 'Đồng hồ sang trọng và chính xác'
    }
  ],
  title = 'Danh mục sản phẩm',
  subtitle = 'Khám phá các danh mục thời trang đa dạng của chúng tôi'
}: CategoriesShowcaseProps) {

  return (
    <div className="py-16 bg-white">
      <div className="ps-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.link}
              className="group relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div 
                className={`relative ${
                  index < 2 ? 'aspect-[4/5]' : 'aspect-square'
                } overflow-hidden`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-medium mb-2">
                      {category.name}
                    </h3>
                    
                    {category.productCount && (
                      <p className="text-sm opacity-90 mb-2">
                        {category.productCount} sản phẩm
                      </p>
                    )}
                    
                    {category.description && (
                      <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {category.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">Khám phá ngay</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Alternative Layout for smaller screens */}
        <div className="block md:hidden mt-8">
          <div className="grid grid-cols-2 gap-4">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={`mobile-${category.id}`}
                href={category.link}
                className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-3">
                  <div className="text-white">
                    <h4 className="font-medium text-sm mb-1">
                      {category.name}
                    </h4>
                    {category.productCount && (
                      <p className="text-xs opacity-90">
                        {category.productCount} sản phẩm
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {categories.length > 4 && (
            <div className="text-center mt-6">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                Xem tất cả danh mục
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-8 bg-gray-50 rounded-lg p-6">
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Không tìm thấy sản phẩm phù hợp?
              </h3>
              <p className="text-gray-600 text-sm">
                Liên hệ với chúng tôi để được tư vấn cá nhân hóa
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
