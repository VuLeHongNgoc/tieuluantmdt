'use client';

import { useApiGet } from '@/lib/api-hooks';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ErrorDisplay from '../ui/ErrorDisplay';
import LoadingSpinner from '../ui/LoadingSpinner';

// Define product types
interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  images?: {
    _id: string;
    imageUrl: string;
    alt?: string;
  }[];
  category?: string;
  brand?: string;
  isNew?: boolean;
  isHot?: boolean;
  description?: string;
  [key: string]: any;
}

interface ApiResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    totalProducts: number;
    totalPages: number;
  }
}

// Price ranges
const priceRanges = [
  { label: 'All Prices', value: '' },
  { label: 'Under 500,000₫', value: '0-500000' },
  { label: '500,000₫ - 1,000,000₫', value: '500000-1000000' },
  { label: '1,000,000₫ - 2,000,000₫', value: '1000000-2000000' },
  { label: '2,000,000₫ - 5,000,000₫', value: '2000000-5000000' },
  { label: 'Over 5,000,000₫', value: '5000000-999999999' }
];

// Sort options
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A to Z', value: 'name-asc' },
  { label: 'Name: Z to A', value: 'name-desc' }
];

export default function ModernShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get filter values from URL or default values
  const currentCategoryParam = searchParams.get('category') || '';
  // Ensure currentCategory is always a string, not an object
  const currentCategory = typeof currentCategoryParam === 'object' 
    ? (JSON.stringify(currentCategoryParam) !== '{}' ? String(currentCategoryParam) : '') 
    : currentCategoryParam;
    
  const currentBrandParam = searchParams.get('brand') || '';
  // Ensure currentBrand is always a string, not an object  
  const currentBrand = typeof currentBrandParam === 'object'
    ? (JSON.stringify(currentBrandParam) !== '{}' ? String(currentBrandParam) : '')
    : currentBrandParam;
    
  const currentSort = searchParams.get('sort') || 'newest';
  const currentPage = Number(searchParams.get('page') || '1');
  const currentSearch = searchParams.get('search') || '';
  const currentPriceRange = searchParams.get('price') || '';
  
  // Define types for category and brand objects
  type CategoryObject = {
    _id?: string;
    slug?: string;
  };

  type BrandObject = {
    _id?: string;
    slug?: string;
  };

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string | CategoryObject>(currentCategory);
  const [selectedBrand, setSelectedBrand] = useState<string | BrandObject>(currentBrand);
  const [selectedSort, setSelectedSort] = useState(currentSort);
  const [selectedPriceRange, setSelectedPriceRange] = useState(currentPriceRange);
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [page, setPage] = useState(currentPage);
  
  // Fetch categories for filter
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = 
    useApiGet<{categories: {_id: string, name: string, slug: string}[]}>('/categories');
  
  // Fetch brands for filter
  const { data: brandsData, isLoading: brandsLoading, error: brandsError } = 
    useApiGet<{brands: {_id: string, name: string}[]}>('/brands');
  
  // Build API endpoint with filters
  const buildApiUrl = useCallback(() => {
    let url = '/api/products?';
    
    // Add filters to URL if they exist
    if (selectedCategory) {
      const categoryParam = typeof selectedCategory === 'object' 
        ? (selectedCategory?._id?.toString() || selectedCategory?.slug || '') 
        : selectedCategory;
      if (categoryParam) url += `&category=${encodeURIComponent(categoryParam)}`;
    }
    
    if (selectedBrand) {
      const brandParam = typeof selectedBrand === 'object'
        ? (selectedBrand?._id?.toString() || selectedBrand?.slug || '')
        : selectedBrand;
      if (brandParam) url += `&brand=${encodeURIComponent(brandParam)}`;
    }
    
    if (selectedSort) url += `&sort=${selectedSort}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
    if (page > 1) url += `&page=${page}`;
    
    // Add price range if selected
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-');
      if (min) url += `&minPrice=${min}`;
      if (max) url += `&maxPrice=${max}`;
    }
    
    return url;
  }, [selectedCategory, selectedBrand, selectedSort, searchQuery, page, selectedPriceRange]);
  
  // Fetch products with filters
  const { 
    data, 
    isLoading, 
    error,
    refetch
  } = useApiGet<ApiResponse>(buildApiUrl());
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Handle category parameter
    if (selectedCategory) {
      const categoryParam = typeof selectedCategory === 'object' 
        ? (selectedCategory._id?.toString() || selectedCategory.slug || '') 
        : selectedCategory;
      if (categoryParam) params.set('category', categoryParam);
    }
    
    // Handle brand parameter
    if (selectedBrand) {
      const brandParam = typeof selectedBrand === 'object'
        ? (selectedBrand._id?.toString() || selectedBrand.slug || '')
        : selectedBrand;
      if (brandParam) params.set('brand', brandParam);
    }
    
    if (selectedSort && selectedSort !== 'newest') params.set('sort', selectedSort);
    if (selectedPriceRange) params.set('price', selectedPriceRange);
    if (searchQuery) params.set('search', searchQuery);
    if (page > 1) params.set('page', page.toString());
    
    const queryString = params.toString();
    router.push(`/shop${queryString ? '?' + queryString : ''}`);
  }, [selectedCategory, selectedBrand, selectedSort, selectedPriceRange, searchQuery, page, router]);
  
  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedBrand, selectedSort, selectedPriceRange, searchQuery]);
  
  // Handle search input
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };
  
  // Handle filter changes
  const handleCategoryChange = (category: string | CategoryObject) => {
    // Handle comparing when selectedCategory is an object
    const isSelected = typeof selectedCategory === 'object' && typeof category === 'object'
      ? (selectedCategory._id === category._id)
      : typeof selectedCategory === 'string' && typeof category === 'string'
        ? selectedCategory === category
        : false;
    
    setSelectedCategory(isSelected ? '' : category);
  };
  
  const handleBrandChange = (brand: string | BrandObject) => {
    // Handle comparing when selectedBrand is an object
    const isSelected = typeof selectedBrand === 'object' && typeof brand === 'object'
      ? (selectedBrand._id === brand._id)
      : typeof selectedBrand === 'string' && typeof brand === 'string'
        ? selectedBrand === brand
        : false;
    
    setSelectedBrand(isSelected ? '' : brand);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
  };
  
  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(range === selectedPriceRange ? '' : range);
  };
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <nav className="text-sm breadcrumbs mb-4">
            <div className="flex space-x-2 text-gray-600">
              <Link href="/" className="hover:text-blue-600">Home</Link>
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
              
              {/* Search */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Search</h4>
                <form onSubmit={handleSearch}>
                  <div className="flex">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="border border-gray-300 rounded-l px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      type="submit"
                      className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                {categoriesLoading ? (
                  <div className="flex justify-center py-2">
                    <LoadingSpinner className="h-5 w-5" />
                  </div>
                ) : categoriesError ? (
                  <ErrorDisplay message="Failed to load categories" />
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        !selectedCategory
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Categories
                    </button>
                    {categoriesData?.categories?.map((category) => (
                      <button
                        key={category._id}
                        onClick={() => handleCategoryChange(category._id)}
                        className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                          selectedCategory === category._id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Brands</h4>
                {brandsLoading ? (
                  <div className="flex justify-center py-2">
                    <LoadingSpinner className="h-5 w-5" />
                  </div>
                ) : brandsError ? (
                  <ErrorDisplay message="Failed to load brands" />
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedBrand('')}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        !selectedBrand
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Brands
                    </button>
                    {brandsData?.brands?.map((brand) => (
                      <button
                        key={brand._id}
                        onClick={() => handleBrandChange(brand._id)}
                        className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                          selectedBrand === brand._id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => handlePriceRangeChange(range.value)}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedPriceRange === range.value
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {range.label}
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
                {!isLoading && !error && data && (
                  <p className="text-gray-600">
                    Showing {data.products.length} of {data.pagination.totalProducts} products
                  </p>
                )}
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    value={selectedSort}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner className="h-10 w-10" />
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <ErrorDisplay 
                message="Failed to load products" 
                onRetry={() => refetch()}
              />
            )}

            {/* Empty State */}
            {!isLoading && !error && data && data.products.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedBrand('');
                    setSelectedSort('newest');
                    setSelectedPriceRange('');
                    setSearchQuery('');
                    setPage(1);
                  }}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && !error && data && data.products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.products.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                    <Link href={`/product/${product._id}`} className="block relative">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={(product.images && product.images.length > 0) ? product.images[0].imageUrl : '/images/product/placeholder.jpg'}
                          alt={(product.images && product.images.length > 0 && product.images[0].alt) ? product.images[0].alt : product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {product.isNew && (
                        <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium text-white rounded bg-blue-500">
                          New
                        </span>
                      )}
                      {product.isHot && (
                        <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium text-white rounded bg-red-500">
                          Hot
                        </span>
                      )}
                      {product.salePrice && product.salePrice < product.price && (
                        <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium text-white rounded bg-green-500">
                          Sale
                        </span>
                      )}
                    </Link>
                    <div className="p-4">
                      <Link href={`/product/${product._id}`} className="block">
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-semibold text-gray-900">
                          {formatCurrency(product.salePrice || product.price)}
                        </span>
                        {product.salePrice && product.salePrice < product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(product.price)}
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
            )}

            {/* Pagination */}
            {!isLoading && !error && data && data.pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex rounded-md">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      page === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                    // Logic to show pages around current page
                    let pageToShow;
                    if (data.pagination.totalPages <= 5) {
                      pageToShow = i + 1;
                    } else if (page <= 3) {
                      pageToShow = i + 1;
                    } else if (page >= data.pagination.totalPages - 2) {
                      pageToShow = data.pagination.totalPages - 4 + i;
                    } else {
                      pageToShow = page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageToShow}
                        onClick={() => handlePageChange(pageToShow)}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                          page === pageToShow
                            ? 'bg-blue-50 text-blue-700 z-10'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageToShow}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === data?.pagination.totalPages}
                    className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      page === data?.pagination.totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
