'use client';

import { Product } from '@/lib/api';
import { useApiGet } from '@/lib/api-hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ErrorDisplay from '../ui/ErrorDisplay';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function MinimalistHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Fetch featured products from API
  const { 
    data: featuredProductsData, 
    isLoading: isLoadingProducts, 
    error: productsError,
    refetch: refetchProducts
  } = useApiGet<Product[]>('/products/featured');
  
  // Get featured products or empty array if loading/error
  const featuredProducts = featuredProductsData || [];

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slides */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative w-full h-full">
              <Image
                src="/images/herobanner1.png"
                alt="Simple"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl md:text-8xl font-light text-white mb-4">SIMPLE</h1>
                  <p className="text-xl text-white text-opacity-90">Timeless Design</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative w-full h-full">
              <Image
                src="/images/herobanner2.png"
                alt="Clean"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl md:text-8xl font-light text-white mb-4">CLEAN</h1>
                  <p className="text-xl text-white text-opacity-90">Minimal Aesthetics</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative w-full h-full">
              <Image
                src="/images/herobanner3.png"
                alt="Modern"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl md:text-8xl font-light text-white mb-4">MODERN</h1>
                  <p className="text-xl text-white text-opacity-90">Contemporary Living</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-gray-900' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
                Less is More
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe in the power of simplicity. Every item in our collection is carefully selected 
                for its quality, functionality, and timeless design.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From essential clothing to everyday accessories, we focus on what matters most - 
                products that enhance your life without the clutter.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Image
                      src="/images/minimalist.png"
                      alt="Minimalist Showcase"
                      width={500}
                      height={500}
                      className="object-cover square-full"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Featured
            </h2>
            <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carefully curated essentials for the conscious consumer
            </p>
          </div>

          {/* Loading State */}
          {isLoadingProducts && (
            <div className="py-12">
              <LoadingSpinner className="my-16" />
              <p className="text-center text-gray-500 mt-4">Loading featured products...</p>
            </div>
          )}

          {/* Error State */}
          {productsError && (
            <div className="py-6">
              <ErrorDisplay 
                message={productsError.message || "Could not load featured products"} 
                onRetry={refetchProducts}
                className="max-w-md mx-auto" 
              />
            </div>
          )}

          {/* Products Grid */}
          {!isLoadingProducts && !productsError && (
            <>
              {featuredProducts.length === 0 ? (
                <p className="text-center text-gray-500 py-12">No featured products available at the moment.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {featuredProducts.map((product) => (
                    <a href={`/product/${product._id}`} key={product._id} className="group cursor-pointer">
                      <div className="relative aspect-square bg-white mb-4 overflow-hidden">
                        <img
                          src={(product.images && product.images.length > 0) ? product.images[0].imageUrl : '/images/product/placeholder.jpg'}
                          alt={(product.images && product.images.length > 0 && product.images[0].alt) ? product.images[0].alt : product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.isNew && (
                          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">New</span>
                        )}
                        {product.isHot && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Hot</span>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                          {product.category}
                        </p>
                        <h3 className="text-lg font-light text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <div>
                          {product.salePrice ? (
                            <>
                              <p className="text-gray-700 font-medium">
                                {formatPrice(product.salePrice)}
                              </p>
                              <p className="text-gray-500 text-sm line-through">
                                {formatPrice(product.price)}
                              </p>
                            </>
                          ) : (
                            <p className="text-gray-700">
                              {formatPrice(product.price)}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="text-center mt-16">
            <a 
              href="/shop" 
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Every product is crafted with attention to detail and built to last.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">Simplicity</h3>
              <p className="text-gray-600 leading-relaxed">
                Clean designs that focus on function and form in perfect harmony.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-600 leading-relaxed">
                Responsible sourcing and production for a better tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates on new arrivals and exclusive offers.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              <button className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
