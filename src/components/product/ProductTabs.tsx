'use client';

import React, { useState } from 'react';

interface ProductTabsProps {
  description: string;
  details: {
    material: string;
    origin: string;
    washingInstructions: string;
    model: string;
    [key: string]: string;
  };
  reviews: {
    id: string;
    user: string;
    rating: number;
    date: string;
    content: string;
  }[];
}

const ProductTabs: React.FC<ProductTabsProps> = ({ description, details, reviews }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="product-tabs-minimal container mx-auto px-4 py-12">
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {['description', 'details', 'reviews'].map(tab => (
            <button
              key={tab}
              className={`py-4 px-8 font-medium text-sm focus:outline-none whitespace-nowrap
                ${activeTab === tab 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'description' && 'Mô tả'}
              {tab === 'details' && 'Chi tiết sản phẩm'}
              {tab === 'reviews' && `Đánh giá (${reviews.length})`}
            </button>
          ))}
        </div>
      </div>
      
      <div className="py-8">
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p>{description}</p>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(details).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                      {key === 'washingInstructions' ? 'Hướng dẫn giặt' :
                       key === 'material' ? 'Chất liệu' :
                       key === 'origin' ? 'Xuất xứ' :
                       key === 'model' ? 'Thông tin người mẫu' : key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">{review.user}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <time className="text-sm text-gray-500" dateTime={review.date}>
                        {new Date(review.date).toLocaleDateString('vi-VN')}
                      </time>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
            )}

            <div className="mt-8">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Viết đánh giá
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
