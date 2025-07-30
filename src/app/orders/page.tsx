'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface OrderItem {
  _id: string;
  productId: string;
  variantId: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
  imageUrl?: string;
}

interface Order {
  _id: string;
  userId: string;
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

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch orders when session is loaded
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      console.log('Orders from API:', data);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load orders when session changes or component mounts
  useEffect(() => {
    if (session) {
      fetchOrders();
    }
  }, [session]);

  if (status === 'loading' || loading) {
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
              <div key={order._id} className="bg-white rounded-lg shadow-sm">
                {/* Order Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold text-gray-900">#{order._id}</h3>
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
                      <div key={item._id} className="flex items-center space-x-4">
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
