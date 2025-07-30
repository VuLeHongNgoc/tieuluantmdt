/**
 * Example component demonstrating API client usage
 */
'use client';

import { Product } from '@/lib/api';
import { useApiGet, useApiMutation } from '@/lib/api-hooks';
import { useState } from 'react';

export default function ProductListingExample() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useApiGet<{ products: Product[], total: number }>(
    '/products',
    { page: String(page), limit: '6' }
  );
  
  const { mutate: addToCart, isLoading: addingToCart } = useApiMutation(
    'post',
    '/cart/items'
  );
  
  const handleAddToCart = async (productId: string) => {
    const result = await addToCart({ productId, quantity: 1 });
    if (result.success) {
      alert('Sản phẩm đã được thêm vào giỏ hàng!');
    } else {
      alert(`Lỗi: ${result.error?.message}`);
    }
  };
  
  if (isLoading) {
    return <div className="text-center py-8">Đang tải sản phẩm...</div>;
  }
  
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Lỗi: {error.message}
        <button 
          onClick={() => refetch()} 
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Thử lại
        </button>
      </div>
    );
  }
  
  const products = data?.products || [];
  const totalItems = data?.total || 0;
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Sản phẩm nổi bật</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-8">Không có sản phẩm nào</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg p-4 shadow-sm">
              <div className="relative h-48 mb-4">
                <img 
                  src={(product.images && product.images.length > 0) ? product.images[0].imageUrl : '/images/product/placeholder.jpg'} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded"
                />
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                    Mới
                  </span>
                )}
                {product.isHot && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                    Hot
                  </span>
                )}
              </div>
              
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-xl font-bold text-red-600">
                    {product.salePrice 
                      ? `${product.salePrice.toLocaleString('vi-VN')}đ` 
                      : `${product.price.toLocaleString('vi-VN')}đ`}
                  </div>
                  
                  {product.salePrice && (
                    <div className="text-sm text-gray-500 line-through">
                      {product.price.toLocaleString('vi-VN')}đ
                    </div>
                  )}
                </div>
                
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span 
                      key={index}
                      className={`text-${index < (product.rating || 0) ? 'yellow' : 'gray'}-400`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => handleAddToCart(product._id)}
                disabled={addingToCart}
                className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                {addingToCart ? 'Đang thêm...' : 'Thêm vào giỏ'}
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 flex justify-between items-center">
        <div>
          Hiển thị {products.length} / {totalItems} sản phẩm
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Trước
          </button>
          
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={products.length < 6}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Tiếp
          </button>
        </div>
      </div>
    </div>
  );
}
