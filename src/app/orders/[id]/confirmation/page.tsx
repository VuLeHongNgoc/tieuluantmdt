'use client';

import BreadcrumbMinimal from '@/components/ui/BreadcrumbMinimal';
import { useApiGet } from '@/lib/api-hooks';
import { formatCurrency } from '@/lib/utils';
import { Order } from '@/types/order';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Order status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'PENDING':
        return 'bg-blue-100 text-blue-800';
      case 'PREPARING':
        return 'bg-yellow-100 text-yellow-800';
      case 'SHIPPING':
        return 'bg-purple-100 text-purple-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'PENDING':
        return 'Chờ xác nhận';
      case 'PREPARING':
        return 'Đang chuẩn bị';
      case 'SHIPPING':
        return 'Đang giao hàng';
      case 'DELIVERED':
        return 'Đã giao hàng';
      case 'CANCELLED':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
      {getStatusText()}
    </span>
  );
};

// Payment method badge component
const PaymentMethodBadge = ({ method }: { method: string }) => {
  const getMethodIcon = () => {
    switch (method) {
      case 'MOMO':
        return '💳';
      case 'STRIPE':
        return '💳';
      case 'COD':
        return '💵';
      default:
        return '💰';
    }
  };

  const getMethodText = () => {
    switch (method) {
      case 'MOMO':
        return 'MoMo';
      case 'STRIPE':
        return 'Thẻ tín dụng';
      case 'COD':
        return 'Thanh toán khi nhận hàng';
      default:
        return method;
    }
  };

  return (
    <span className="flex items-center gap-1 text-sm font-medium">
      <span>{getMethodIcon()}</span>
      <span>{getMethodText()}</span>
    </span>
  );
};

// Order confirmation page
export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  
  // Fetch order details
  const { 
    data: order, 
    isLoading, 
    error 
  } = useApiGet<Order>(`/orders/${id}`);

  // If error, redirect to orders page
  useEffect(() => {
    if (error) {
      router.push('/orders');
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <div className="ps-content pt-80 pb-80">
        <div className="ps-container max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-lg">Đang tải thông tin đơn hàng...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="order-confirmation-page">
      <BreadcrumbMinimal
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Đơn hàng của tôi', href: '/orders' },
          { label: `Đơn hàng #${id.slice(-6).toUpperCase()}`, href: '#', active: true }
        ]}
      />

      <div className="ps-content pt-80 pb-80">
        <div className="ps-container max-w-5xl mx-auto">
          {/* Order confirmation header */}
          <div className="bg-white border rounded-lg p-8 shadow-sm mb-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">Cảm ơn bạn đã đặt hàng!</h1>
              <p className="text-gray-600">
                Đơn hàng #{id.slice(-6).toUpperCase()} của bạn đã được tiếp nhận và đang được xử lý.
              </p>
            </div>

            {/* Order summary */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-xl font-bold">Thông tin đơn hàng</h2>
              <StatusBadge status={order.status} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Order details */}
              <div>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700">Thông tin người nhận</h3>
                  <p className="mb-1">{order.customerInfo.name}</p>
                  <p className="mb-1">{order.customerInfo.email}</p>
                  <p className="mb-1">{order.customerInfo.phone}</p>
                  <p className="mb-1">{order.customerInfo.address}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-700">Phương thức thanh toán</h3>
                  <PaymentMethodBadge method={order.paymentMethod} />
                </div>
              </div>

              {/* Order summary */}
              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="font-semibold mb-4 text-gray-700">Thông tin đơn hàng</h3>
                
                <div className="max-h-60 overflow-y-auto mb-4">
                  {order.items.map((item: any) => (
                    <div key={item._id} className="flex justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">
                          {item.color} / {item.size} x {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">{formatCurrency(item.unitPrice * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between">
                    <p>Tạm tính</p>
                    <p>{formatCurrency(order.total)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Phí vận chuyển</p>
                    <p>Miễn phí</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <p>Tổng cộng</p>
                    <p>{formatCurrency(order.total)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/orders" className="px-6 py-3 bg-blue-500 text-white rounded-md text-center hover:bg-blue-600 transition">
              Xem đơn hàng của tôi
            </Link>
            <Link href="/" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md text-center hover:bg-gray-300 transition">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
