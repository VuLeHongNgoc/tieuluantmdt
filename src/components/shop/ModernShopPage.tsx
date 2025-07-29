'use client';

import { useState } from 'react';

// Mock data cho sản phẩm
const mockProducts = [
  {
    id: 1,
    name: 'T-shirt with slogan',
    price: 5250000,
    originalPrice: null,
    image: '/images/product/home-1/1.jpg',
    badge: 'Hot',
    badgeColor: 'bg-red-500'
  },
  {
    id: 2,
    name: 'White crossbody bag',
    price: 1250000,
    originalPrice: null,
    image: '/images/product/home-1/2.jpg',
    badge: null,
    badgeColor: ''
  },
  {
    id: 3,
    name: 'Velvet backpack',
    price: 5250000,
    originalPrice: null,
    image: '/images/product/home-1/3.jpg',
    badge: 'New',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 4,
    name: 'Square cream sunglasses',
    price: 5250000,
    originalPrice: 7250000,
    image: '/images/product/home-1/4.jpg',
    badge: 'Sale',
    badgeColor: 'bg-green-500'
  },
  {
    id: 5,
    name: 'Shirt Regular fit',
    price: 950000,
    originalPrice: 1200000,
    image: '/images/product/home-1/5.jpg',
    badge: null,
    badgeColor: ''
  },
  {
    id: 6,
    name: 'T-shirt with slogan',
    price: 1250000,
    originalPrice: null,
    image: '/images/product/home-1/6.jpg',
    badge: null,
    badgeColor: ''
  },
  {
    id: 7,
    name: 'Leather brown belt',
    price: 350000,
    originalPrice: null,
    image: '/images/product/home-1/7.jpg',
    badge: null,
    badgeColor: ''
  },
  {
    id: 8,
    name: 'Denim shorts',
    price: 5250000,
    originalPrice: null,
    image: '/images/product/home-1/8.jpg',
    badge: 'New',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 9,
    name: 'Square cream sunglasses',
    price: 5250000,
    originalPrice: null,
    image: '/images/product/home-1/9.jpg',
    badge: null,
    badgeColor: ''
  }
];

const categories = ['All', 'T-shirts', 'Bags', 'Sunglasses', 'Accessories'];
const priceRanges = ['All', 'Under 1M', '1M - 3M', '3M - 5M', 'Over 5M'];

export default function ModernShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Format price to Vietnamese currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Filter products based on selected criteria
  const filteredProducts = mockProducts.filter(product => {
    let matchesCategory = true;
    let matchesPrice = true;

    if (selectedCategory !== 'All') {
      matchesCategory = product.name.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, -1));
    }

    if (selectedPriceRange !== 'All') {
      switch (selectedPriceRange) {
        case 'Under 1M':
          matchesPrice = product.price < 1000000;
          break;
        case '1M - 3M':
          matchesPrice = product.price >= 1000000 && product.price <= 3000000;
          break;
        case '3M - 5M':
          matchesPrice = product.price > 3000000 && product.price <= 5000000;
          break;
        case 'Over 5M':
          matchesPrice = product.price > 5000000;
          break;
      }
    }

    return matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <nav className="text-sm breadcrumbs mb-4">
            <div className="flex space-x-2 text-gray-600">
              <a href="/" className="hover:text-blue-600">Home</a>
              <span>/</span>
              <span className="text-gray-900">Shop</span>
            </div>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="text-gray-600 mt-2">Discover our amazing collection</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4 w-full">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <button
                      key={range}
                      onClick={() => setSelectedPriceRange(range)}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedPriceRange === range
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 w-full">
            {/* Sort Controls */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600">
                  Showing {sortedProducts.length} of {mockProducts.length} products
                </p>
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium text-white rounded ${product.badgeColor}`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                      <button className="bg-white text-gray-900 px-4 py-2 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                        Quick View
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {sortedProducts.length < mockProducts.length && (
              <div className="text-center mt-8">
                <button className="bg-gray-900 text-white px-8 py-3 rounded font-medium hover:bg-gray-800 transition-colors">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
