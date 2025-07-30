'use client';

import { useCart } from '@/components/providers/CartProvider';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ProductDetailProps {
  product: {
    id?: string;
    _id?: string;
    title: string;
    price: number;
    rating: number;
    reviewCount: number;
    description: string;
    shortDescription: string;
    colors: string[];
    sizes: string[];
    images: {
      _id: string;
      imageUrl: string;
      alt?: string;
    }[];
    category: string;
    brand: string;
    sku: string;
    inStock: boolean;
  };
}

// Add to Cart Button Component
const AddToCartButton: React.FC<{ 
  product: ProductDetailProps['product']; 
  quantity: number; 
  selectedSize: string; 
  selectedColor: string;
}> = ({ product, quantity, selectedSize, selectedColor }) => {
  const { addToCart, loading } = useCart();

  const handleAddToCart = async () => {
    try {
      // Convert id to _id format if needed - our API expects _id
      const productId = product._id || product.id || '';
      
      if (!productId) {
        toast.error('Sản phẩm không hợp lệ');
        return;
      }
      
      await addToCart(
        productId,
        quantity,
        {
          size: selectedSize,
          color: selectedColor
        }
      );
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      toast.error('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.');
    }
  };

  return (
    <button 
      className="w-full py-3 bg-black text-white font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
      disabled={!product.inStock || loading}
      onClick={handleAddToCart}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
      ) : null}
      {product.inStock ? (loading ? 'Đang thêm...' : 'Thêm vào giỏ hàng') : 'Hết hàng'}
    </button>
  );
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]); // Default to Medium
  const [quantity, setQuantity] = useState(1);

  // Function to get color class based on color name
  const getColorClass = (color: string) => {
    switch (color) {
      case 'black': return 'bg-black';
      case 'white': return 'bg-white border border-gray-300';
      case 'navy': return 'bg-blue-900';
      case 'gray': return 'bg-gray-400';
      case 'red': return 'bg-red-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="product-detail-minimal container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row -mx-4">
        {/* Product Images */}
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <div className="product-gallery">
            {/* Main Image */}
            <div className="mb-4 relative h-[500px] bg-gray-50 flex items-center justify-center overflow-hidden">
              <Image
                src={(product.images && product.images.length > activeImage) ? product.images[activeImage].imageUrl : '/images/product/placeholder.jpg'}
                alt={(product.images && product.images.length > activeImage && product.images[activeImage].alt) ? product.images[activeImage].alt : product.title}
                width={500}
                height={500}
                className="object-contain max-h-[500px] transition-all duration-300"
                priority
              />
              {/* Zoom button */}
              <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail w-20 h-20 bg-gray-50 cursor-pointer border-2 ${activeImage === index ? 'border-black' : 'border-transparent'}`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image.imageUrl || '/images/product/placeholder.jpg'}
                    alt={image.alt || `${product.title} - thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-3xl font-medium mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600">({product.reviewCount} đánh giá)</span>
            </div>
          </div>

          <div className="text-2xl font-medium mb-6 text-gray-900">
            {formatCurrency(product.price)}
          </div>

          <div className="mb-6">
            <p className="text-gray-700">{product.shortDescription}</p>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-900 mb-2">Màu sắc</h2>
            <div className="flex space-x-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full ${getColorClass(color)} ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-900 mb-2">Kích cỡ</h2>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`min-w-[40px] h-10 px-3 border ${selectedSize === size 
                    ? 'border-black bg-black text-white' 
                    : 'border-gray-300 text-gray-900 hover:border-gray-700'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-900 mb-2">Số lượng</h2>
            <div className="flex border border-gray-300 w-32">
              <button 
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100" 
                onClick={decreaseQuantity}
              >
                -
              </button>
              <input 
                type="text" 
                className="w-12 h-10 text-center border-x border-gray-300" 
                value={quantity}
                readOnly
              />
              <button 
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100" 
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex flex-col space-y-3 mb-6">
            <AddToCartButton 
              product={product}
              quantity={quantity}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
            />
            <button className="w-full py-3 border border-black text-black font-medium hover:bg-gray-100 transition-colors">
              Mua ngay
            </button>
          </div>

          {/* Product Meta */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-1 text-sm text-gray-500">
              <p><span className="font-medium text-gray-700">SKU:</span> {product.sku}</p>
              <p><span className="font-medium text-gray-700">Danh mục:</span> {product.category}</p>
              <p><span className="font-medium text-gray-700">Thương hiệu:</span> {product.brand}</p>
            </div>
          </div>

          {/* Share Links */}
          <div className="mt-6 flex items-center">
            <span className="text-sm text-gray-700 mr-3">Chia sẻ:</span>
            <div className="flex space-x-2">
              {['facebook', 'twitter', 'instagram'].map(platform => (
                <a key={platform} href="#" className="text-gray-400 hover:text-gray-700">
                  <span className="sr-only">{platform}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
