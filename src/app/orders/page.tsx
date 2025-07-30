'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface OrderItem {
  id: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
  imageUrl?: string;
}

interface Order {
  id: string;
  status: 'PENDING' | 'PREPARING' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';
  total: number;
  items: OrderItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentMethod: 'MOMO' | 'STRIPE' | 'COD';
  createdAt: string;
  updatedAt: string;
}

// Sample data - sẽ được thay thế bằng API call
const sampleOrders: Order[] = [
  {
    id: 'order-001',
    status: 'DELIVERED',
    total: 3300000,
    items: [
      {
        id: 'order-item-001',
        productName: 'Áo thun Nike Classic',
        color: 'Đen',
        size: 'M',
        quantity: 2,
        unitPrice: 450000,
        imageUrl: '/images/product/product-1.jpg',
      },
      {
        id: 'order-item-002',
        productName: 'Nike Air Max 90',
        color: 'Đen',
        size: '40',
        quantity: 1,
        unitPrice: 2850000,
        imageUrl: '/images/product/product-2.jpg',
      },
    ],
    customerInfo: {
      name: 'Nguyễn Văn A',
      email: 'user1@gmail.com',
      phone: '0987654321',
      address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    },
    paymentMethod: 'MOMO',
    createdAt: '2025-07-23T10:30:00Z',
    updatedAt: '2025-07-25T14:20:00Z',
  },
  {
    id: 'order-002',
    status: 'SHIPPING',
    total: 33740000,
    items: [
      {
        id: 'order-item-003',
        productName: 'Váy Zara Summer Collection',
        color: 'Xanh',
        size: 'S',
        quantity: 1,
        unitPrice: 750000,
        imageUrl: '/images/product/product-3.jpg',
      },
      {
        id: 'order-item-004',
        productName: 'iPhone 15 Pro Max',
        color: 'Đen Titanium',
        size: '128GB',
        quantity: 1,
        unitPrice: 32990000,
        imageUrl: '/images/product/product-4.jpg',
      },
    ],
    customerInfo: {
      name: 'Trần Thị B',
      email: 'user2@gmail.com',
      phone: '0909123456',
      address: '456 Lê Lợi, Quận 3, TP.HCM',
    },
    paymentMethod: 'STRIPE',
    createdAt: '2025-07-28T15:45:00Z',
    updatedAt: '2025-07-29T09:15:00Z',
  },
];

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [orders] = useState<Order[]>(sampleOrders); // Sẽ được thay thế bằng API call

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Vui lòng đăng nhập</h1>
          <p className="text-gray-600">Bạn cần đăng nhập để xem đơn hàng của mình.</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      PENDING: { text: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800' },
      PREPARING: { text: 'Đang chuẩn bị', color: 'bg-blue-100 text-blue-800' },
      SHIPPING: { text: 'Đang giao', color: 'bg-purple-100 text-purple-800' },
      DELIVERED: { text: 'Đã giao', color: 'bg-green-100 text-green-800' },
      CANCELLED: { text: 'Đã hủy', color: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredOrders = selectedStatus === 'ALL' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Đơn hàng của tôi</h1>
            <p className="text-gray-600">Theo dõi và quản lý các đơn hàng của bạn</p>
          </div>

          {/* Status Filter */}
          <div className="px-6 py-4">
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'ALL', label: 'Tất cả' },
                { value: 'PENDING', label: 'Chờ xác nhận' },
                { value: 'PREPARING', label: 'Đang chuẩn bị' },
                { value: 'SHIPPING', label: 'Đang giao' },
                { value: 'DELIVERED', label: 'Đã giao' },
                { value: 'CANCELLED', label: 'Đã hủy' },
              ].map((status) => (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedStatus === status.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
              <p className="text-gray-600 mb-6">Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!</p>
              <a
                href="/shop"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Bắt đầu mua sắm
              </a>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm">
                {/* Order Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="mt-2 sm:mt-0 text-sm text-gray-600">
                      <p>Đặt hàng: {formatDate(order.createdAt)}</p>
                      <p>Cập nhật: {formatDate(order.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.productName}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">No Image</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.color} • {item.size} • x{item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-600">
                      <p>Thanh toán: {order.paymentMethod === 'MOMO' ? 'MoMo' : order.paymentMethod === 'STRIPE' ? 'Thẻ tín dụng' : 'COD'}</p>
                      <p>Giao đến: {order.customerInfo.address}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Tổng cộng</p>
                        <p className="text-lg font-bold text-gray-900">{formatPrice(order.total)}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                          Chi tiết
                        </button>
                        {order.status === 'DELIVERED' && (
                          <button className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark">
                            Mua lại
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê đơn hàng</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
              <div className="text-sm text-gray-600">Tổng đơn hàng</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'DELIVERED').length}
              </div>
              <div className="text-sm text-gray-600">Đã giao</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'SHIPPING').length}
              </div>
              <div className="text-sm text-gray-600">Đang giao</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(orders.reduce((sum, order) => sum + order.total, 0))}
              </div>
              <div className="text-sm text-gray-600">Tổng chi tiêu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
