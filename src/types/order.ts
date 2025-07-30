
export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface OrderItem {
  _id: string;
  variantId: string;
  productId: string;
  productName: string;
  color: string;
  size?: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  _id: string;
  userId: string;
  status: 'PENDING' | 'PREPARING' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: 'VNPAY' | 'PAYPAL' | 'COD';
  total: number;
  items: OrderItem[];
  customerInfo: CustomerInfo;
  createdAt: string;
  updatedAt: string;
}
