'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  textPosition?: 'left' | 'center' | 'right';
  overlay?: boolean;
}

interface HeroBannersProps {
  banners?: Banner[];
  layout?: 'single' | 'double' | 'triple';
}

export default function HeroBanners({
  banners = [
    {
      id: '1',
      title: 'Summer Collection 2025',
      subtitle: 'Bộ sưu tập mùa hè',
      description: 'Khám phá những xu hướng thời trang mới nhất cho mùa hè này với những thiết kế tươi mới và phong cách.',
      image: '/images/banners/summer-collection.jpg',
      buttonText: 'Khám phá ngay',
      buttonLink: '/shop?collection=summer',
      textPosition: 'left',
      overlay: true
    },
    {
      id: '2',
      title: 'Sale up to 50%',
      subtitle: 'Giảm giá đến 50%',
      description: 'Cơ hội vàng để sở hữu những món đồ yêu thích với mức giá ưu đãi nhất.',
      image: '/images/banners/sale-banner.jpg',
      buttonText: 'Mua ngay',
      buttonLink: '/shop?sale=true',
      textPosition: 'center',
      overlay: true
    }
  ],
  layout = 'double'
}: HeroBannersProps) {

  const getLayoutClasses = () => {
    switch (layout) {
      case 'single':
        return 'grid-cols-1';
      case 'double':
        return 'grid-cols-1 lg:grid-cols-2';
      case 'triple':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default:
        return 'grid-cols-1 lg:grid-cols-2';
    }
  };

  const getTextPositionClasses = (position: 'left' | 'center' | 'right') => {
    switch (position) {
      case 'left':
        return 'justify-start text-left';
      case 'center':
        return 'justify-center text-center';
      case 'right':
        return 'justify-end text-right';
      default:
        return 'justify-start text-left';
    }
  };

  if (!banners || banners.length === 0) return null;

  return (
    <div className="py-8">
      <div className="ps-container">
        <div className={`grid gap-6 ${getLayoutClasses()}`}>
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`group relative overflow-hidden rounded-lg bg-gray-100 ${
                layout === 'single' ? 'aspect-[2/1]' : 
                layout === 'triple' ? 'aspect-[4/5]' : 
                'aspect-[3/2]'
              }`}
            >
              {/* Background Image */}
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority={index === 0}
              />

              {/* Overlay */}
              {banner.overlay && (
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300" />
              )}

              {/* Content */}
              <div className={`absolute inset-0 flex flex-col ${getTextPositionClasses(banner.textPosition || 'left')} p-6 md:p-8 lg:p-12`}>
                <div className="text-white max-w-lg">
                  {banner.subtitle && (
                    <p className="text-sm md:text-base font-light mb-2 opacity-90">
                      {banner.subtitle}
                    </p>
                  )}
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-4 leading-tight">
                    {banner.title}
                  </h2>
                  
                  {banner.description && (
                    <p className="text-sm md:text-base mb-6 opacity-90 leading-relaxed">
                      {banner.description}
                    </p>
                  )}
                  
                  {banner.buttonText && banner.buttonLink && (
                    <Link
                      href={banner.buttonLink}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full group-hover:scale-105"
                    >
                      {banner.buttonText}
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Small Banners */}
        {layout === 'double' && banners.length >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="relative z-10">
                <h3 className="text-lg font-medium mb-2">Miễn phí vận chuyển</h3>
                <p className="text-sm opacity-90 mb-3">Cho đơn hàng từ 500.000đ</p>
                <Link href="/shipping" className="text-sm underline hover:no-underline">
                  Tìm hiểu thêm
                </Link>
              </div>
              <div className="absolute bottom-0 right-0 opacity-20">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
            </div>

            <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
              <div className="relative z-10">
                <h3 className="text-lg font-medium mb-2">Đổi trả 30 ngày</h3>
                <p className="text-sm opacity-90 mb-3">Chính sách đổi trả linh hoạt</p>
                <Link href="/returns" className="text-sm underline hover:no-underline">
                  Xem chi tiết
                </Link>
              </div>
              <div className="absolute bottom-0 right-0 opacity-20">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>

            <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
              <div className="relative z-10">
                <h3 className="text-lg font-medium mb-2">Hỗ trợ 24/7</h3>
                <p className="text-sm opacity-90 mb-3">Luôn sẵn sàng hỗ trợ bạn</p>
                <Link href="/support" className="text-sm underline hover:no-underline">
                  Liên hệ ngay
                </Link>
              </div>
              <div className="absolute bottom-0 right-0 opacity-20">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
