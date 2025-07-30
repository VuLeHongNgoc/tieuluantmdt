'use client';

import BreadcrumbMinimal from '@/components/ui/BreadcrumbMinimal';
import { formatCurrency } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// Type definitions
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface AddressFormData {
  firstName: string;
  lastName: string;
  company?: string;
  country: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
}

interface CheckoutFormData {
  billingAddress: AddressFormData;
  shippingAddress: AddressFormData;
  sameAsShipping: boolean;
  paymentMethod: 'cod' | 'vnpay' | 'momo' | 'bank-transfer';
  orderNotes?: string;
}

const CheckoutPage = () => {
  // State for cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for form data
  const emptyAddress: AddressFormData = {
    firstName: '',
    lastName: '',
    company: '',
    country: 'vietnam',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: ''
  };
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    billingAddress: { ...emptyAddress },
    shippingAddress: { ...emptyAddress },
    sameAsShipping: true,
    paymentMethod: 'vnpay',
    orderNotes: ''
  });
  
  // Validation state
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  // Fetch cart data and redirect if needed
  React.useEffect(() => {
    async function fetchCart() {
      try {
        setIsLoading(true);
        // Lấy session trước để lấy userId
        const sessionRes = await fetch('/api/auth/session');
        const session = await sessionRes.json();
        
        if (!session?.user?.id) {
          throw new Error('Bạn cần đăng nhập để tiếp tục thanh toán.');
        }
        
        // Thêm userId vào URL params khi gọi API cart
        const response = await fetch(`/api/cart?userId=${session.user.id}`);
        
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu giỏ hàng');
        }
        
        const data = await response.json();
        
        if (data.success && data.cart?.items) {
          console.log('Cart items received:', data.cart.items);
          // Transform API cart items to match CartItem interface
          const formattedItems = data.cart.items.map((item: any) => ({
            id: item._id || '',
            title: item.product?.name || 'Sản phẩm không xác định',
            price: item.price || 0,
            quantity: item.quantity || 0,
            image: item.product?.imageUrl || item.product?.image || '/images/product/placeholder.jpg'
          }));
          
          console.log('Formatted items:', formattedItems);
          setCartItems(formattedItems);
          
          // Kiểm tra giỏ hàng trống sau khi tải dữ liệu
          if (formattedItems.length === 0) {
            window.location.href = '/cart';
          }
        } else {
          console.error('Invalid cart data structure:', data);
          throw new Error('Dữ liệu giỏ hàng không hợp lệ');
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
        const errorMessage = err instanceof Error ? err.message : 'Có lỗi khi lấy dữ liệu giỏ hàng';
        setError(errorMessage);
        
        // Nếu lỗi liên quan đến đăng nhập, chuyển hướng sau 2 giây
        if (errorMessage.includes('đăng nhập')) {
          setTimeout(() => {
            window.location.href = '/login?redirect=/checkout';
          }, 2000);
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCart();
  }, []);

  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 30000; // Fixed shipping fee
  const total = subtotal + shipping;
  
  // Show loading or error state
  if (isLoading) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Đang tải dữ liệu giỏ hàng...</h2>
        <p>Vui lòng đợi trong giây lát</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Đã xảy ra lỗi</h2>
        <p>{error}</p>
        <button 
          className="btn btn-solid-default mt-4" 
          onClick={() => window.location.href = '/cart'}
        >
          Quay lại giỏ hàng
        </button>
      </div>
    );
  }

  // Handle input change for billing address
  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      billingAddress: {
        ...prevData.billingAddress,
        [name]: value
      }
    }));
  };

  // Handle input change for shipping address
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      shippingAddress: {
        ...prevData.shippingAddress,
        [name]: value
      }
    }));
  };

  // Handle checkbox for same as shipping
  const handleSameAsShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFormData(prevData => ({
      ...prevData,
      sameAsShipping: isChecked,
      billingAddress: isChecked ? { ...prevData.shippingAddress } : { ...prevData.billingAddress }
    }));
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method: 'cod' | 'vnpay' | 'bank-transfer') => {
    setFormData(prevData => ({
      ...prevData,
      paymentMethod: method
    }));
  };

  // Handle order notes change
  const handleOrderNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prevData => ({
      ...prevData,
      orderNotes: e.target.value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    
    // Validate form
    const {
      firstName, lastName, country, streetAddress, city, state, zipCode, phone, email
    } = formData.shippingAddress;

    const errors = [];

    if (!firstName || !lastName) {
      errors.push('Vui lòng điền đầy đủ họ và tên.');
    }

    if (!country) {
      errors.push('Vui lòng chọn quốc gia.');
    }

    if (!streetAddress) {
      errors.push('Vui lòng điền địa chỉ giao hàng.');
    }

    if (!city || !state) {
      errors.push('Vui lòng điền đầy đủ tỉnh/thành phố và quận/huyện.');
    }

    if (!zipCode) {
      errors.push('Vui lòng điền mã bưu điện.');
    }

    if (!phone) {
      errors.push('Vui lòng điền số điện thoại.');
    } else if (!/^[0-9]{10,11}$/.test(phone)) {
      errors.push('Số điện thoại không hợp lệ.');
    }

    if (!email) {
      errors.push('Vui lòng điền địa chỉ email.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Địa chỉ email không hợp lệ.');
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Start submission
    setIsSubmitting(true);
    
    try {
      // Validate cart first
      const validationResponse = await fetch('/api/cart/validate');
      const validationResult = await validationResponse.json();
      
      if (!validationResponse.ok) {
        throw new Error(validationResult.message || 'Có lỗi xảy ra khi xác thực giỏ hàng.');
      }
      
      // Create a new order
      const { sameAsShipping, paymentMethod, orderNotes, shippingAddress } = formData;
      const billingAddress = sameAsShipping ? shippingAddress : formData.billingAddress;
      
      // Format order data
      const orderData = {
        paymentMethod: paymentMethod.toUpperCase(),
        customerInfo: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email: shippingAddress.email,
          phone: shippingAddress.phone,
          address: `${shippingAddress.streetAddress}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.country}`,
        },
        billingInfo: {
          name: `${billingAddress.firstName} ${billingAddress.lastName}`,
          email: billingAddress.email,
          phone: billingAddress.phone,
          address: `${billingAddress.streetAddress}, ${billingAddress.city}, ${billingAddress.state}, ${billingAddress.country}`,
        },
        notes: orderNotes
      };
      
      // Submit the order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Có lỗi xảy ra khi tạo đơn hàng.');
      }
      
      // Order created successfully
      const orderId = result.order._id;
      
      // Handle payment method
      if (paymentMethod === 'vnpay') {
        // Redirect to payment gateway
        router.push(`/api/payment/vnpay?orderId=${orderId}`);
      } else if (paymentMethod === 'momo') {
        // Redirect to momo payment
        router.push(`/api/payment/momo?orderId=${orderId}`);
      } else {
        // COD - go to confirmation page
        router.push(`/orders/${orderId}/confirmation`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setValidationErrors([error instanceof Error ? error.message : 'Có lỗi xảy ra trong quá trình đặt hàng.']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <BreadcrumbMinimal
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giỏ hàng', href: '/cart' },
          { label: 'Thanh toán', href: '#', active: true }
        ]}
      />

      <div className="ps-content pt-80 pb-80">
        <div className="ps-container">
          <form className="ps-checkout" onSubmit={handleSubmit}>
            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-medium">Vui lòng kiểm tra lại thông tin</h3>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-8/12">
                <div className="bg-white p-6 border rounded-md shadow-sm mb-6">
                  <h3 className="text-xl font-bold mb-6 pb-2 border-b">Thông tin giao hàng</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-2">Họ <span className="text-red-500">*</span></label>
                      <input 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
                        type="text" 
                        name="firstName"
                        value={formData.shippingAddress.firstName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-2">Tên <span className="text-red-500">*</span></label>
                      <input 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
                        type="text" 
                        name="lastName"
                        value={formData.shippingAddress.lastName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group mb-4 mt-4">
                    <label className="block text-sm font-medium mb-2">Công ty (tùy chọn)</label>
                    <input 
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
                      type="text" 
                      name="company"
                      value={formData.shippingAddress.company}
                      onChange={handleShippingChange}
                    />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium mb-2">Quốc gia <span className="text-red-500">*</span></label>
                    <select 
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
                      name="country"
                      value={formData.shippingAddress.country}
                      onChange={handleShippingChange}
                      required
                    >
                      <option value="vietnam">Việt Nam</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium mb-2">Địa chỉ <span className="text-red-500">*</span></label>
                    <input 
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition mb-3" 
                      type="text" 
                      placeholder="Số nhà và tên đường" 
                      name="streetAddress"
                      value={formData.shippingAddress.streetAddress}
                      onChange={handleShippingChange}
                      required
                    />
                    <input 
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
                      type="text" 
                      placeholder="Căn hộ, tòa nhà, tầng (tùy chọn)" 
                      name="apartment"
                      value={formData.shippingAddress.apartment}
                      onChange={handleShippingChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-2">Tỉnh/Thành phố <span className="text-red-500">*</span></label>
                      <input 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"  
                        type="text" 
                        name="city"
                        value={formData.shippingAddress.city}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-2">Quận/Huyện <span className="text-red-500">*</span></label>
                      <input 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
                        type="text" 
                        name="state"
                        value={formData.shippingAddress.state}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-2">Mã bưu điện <span className="text-red-500">*</span></label>
                      <input 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
                        type="text" 
                        name="zipCode"
                        value={formData.shippingAddress.zipCode}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-2">Điện thoại <span className="text-red-500">*</span></label>
                      <input 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
                        type="text" 
                        name="phone"
                        value={formData.shippingAddress.phone}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
                      <input 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
                        type="email" 
                        name="email"
                        value={formData.shippingAddress.email}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group mt-6 flex items-center">
                    <input 
                      className="mr-2 h-4 w-4" 
                      type="checkbox" 
                      id="same-as-shipping" 
                      checked={formData.sameAsShipping}
                      onChange={handleSameAsShippingChange}
                    />
                    <label htmlFor="same-as-shipping" className="text-sm">Địa chỉ thanh toán giống địa chỉ giao hàng?</label>
                  </div>

                  {!formData.sameAsShipping && (
                    <div className="ps-checkout__billing">
                      <h3 className="ps-checkout__heading">Thông tin thanh toán</h3>
                      
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label>Họ <span className="required">*</span></label>
                            <input 
                              className="form-control" 
                              type="text" 
                              name="firstName"
                              value={formData.billingAddress.firstName}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label>Tên <span className="required">*</span></label>
                            <input 
                              className="form-control" 
                              type="text" 
                              name="lastName"
                              value={formData.billingAddress.lastName}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>Công ty (tùy chọn)</label>
                        <input 
                          className="form-control" 
                          type="text" 
                          name="company"
                          value={formData.billingAddress.company}
                          onChange={handleBillingChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Quốc gia <span className="required">*</span></label>
                        <select 
                          className="form-control" 
                          name="country"
                          value={formData.billingAddress.country}
                          onChange={handleBillingChange}
                          required
                        >
                          <option value="vietnam">Việt Nam</option>
                          <option value="other">Khác</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Địa chỉ <span className="required">*</span></label>
                        <input 
                          className="form-control mb-20" 
                          type="text" 
                          placeholder="Số nhà và tên đường" 
                          name="streetAddress"
                          value={formData.billingAddress.streetAddress}
                          onChange={handleBillingChange}
                          required
                        />
                        <input 
                          className="form-control" 
                          type="text" 
                          placeholder="Căn hộ, tòa nhà, tầng (tùy chọn)" 
                          name="apartment"
                          value={formData.billingAddress.apartment}
                          onChange={handleBillingChange}
                        />
                      </div>
                      
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <label>Tỉnh/Thành phố <span className="required">*</span></label>
                            <input 
                              className="form-control" 
                              type="text" 
                              name="city"
                              value={formData.billingAddress.city}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <label>Quận/Huyện <span className="required">*</span></label>
                            <input 
                              className="form-control" 
                              type="text" 
                              name="state"
                              value={formData.billingAddress.state}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <label>Mã bưu điện <span className="required">*</span></label>
                            <input 
                              className="form-control" 
                              type="text" 
                              name="zipCode"
                              value={formData.billingAddress.zipCode}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label>Điện thoại <span className="required">*</span></label>
                            <input 
                              className="form-control" 
                              type="text" 
                              name="phone"
                              value={formData.billingAddress.phone}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label>Email <span className="required">*</span></label>
                            <input 
                              className="form-control" 
                              type="email" 
                              name="email"
                              value={formData.billingAddress.email}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="form-group mt-6">
                    <label className="block text-sm font-medium mb-2">Ghi chú đơn hàng (tùy chọn)</label>
                    <textarea 
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
                      rows={5} 
                      placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết." 
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleOrderNotesChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="md:w-4/12">
                <div className="bg-gray-100 p-6 border rounded-md shadow-sm">
                  <h3 className="text-xl font-bold mb-4 pb-2 border-b">Đơn hàng của bạn</h3>
                  
                  <div className="mb-6">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3">Sản phẩm</th>
                          <th className="text-right py-3">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100">
                            <td className="py-3">
                              <span className="font-medium">{item.title}</span> 
                              <span className="text-gray-500 ml-1">× {item.quantity}</span>
                            </td>
                            <td className="text-right py-3 font-medium">{formatCurrency(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                        <tr className="border-b border-gray-100">
                          <td className="py-3 text-gray-600">Tạm tính</td>
                          <td className="text-right py-3 font-medium">{formatCurrency(subtotal)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 text-gray-600">Phí vận chuyển</td>
                          <td className="text-right py-3 font-medium">{formatCurrency(shipping)}</td>
                        </tr>
                        <tr className="font-bold">
                          <td className="py-3 text-lg">Tổng cộng</td>
                          <td className="text-right py-3 text-lg">{formatCurrency(total)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-3 pt-3 border-t">Phương thức thanh toán</h3>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <input 
                          className="mr-2 h-4 w-4" 
                          type="radio" 
                          id="cod" 
                          name="payment-method"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => handlePaymentMethodChange('cod')}
                        />
                        <label htmlFor="cod" className="font-medium">Thanh toán khi nhận hàng (COD)</label>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">Thanh toán tiền mặt khi nhận được hàng.</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <input 
                          className="mr-2 h-4 w-4" 
                          type="radio" 
                          id="vnpay" 
                          name="payment-method"
                          checked={formData.paymentMethod === 'vnpay'}
                          onChange={() => handlePaymentMethodChange('vnpay')}
                        />
                        <label htmlFor="vnpay" className="font-medium">Thanh toán qua VNPAY</label>
                      </div>
                      <div className="ml-6">
                        <img src="/images/payment/vnpay.png" alt="VNPAY" className="h-10" />
                        <p className="text-sm text-gray-600 mt-1">Thanh toán an toàn với VNPAY.</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <input 
                          className="mr-2 h-4 w-4" 
                          type="radio" 
                          id="bank-transfer" 
                          name="payment-method"
                          checked={formData.paymentMethod === 'bank-transfer'}
                          onChange={() => handlePaymentMethodChange('bank-transfer')}
                        />
                        <label htmlFor="bank-transfer" className="font-medium">Chuyển khoản ngân hàng</label>
                      </div>
                      <div className="ml-6 text-sm text-gray-600">
                        <p className="mb-2">
                          Thực hiện thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ được giao sau khi tiền đã được chuyển vào tài khoản của chúng tôi.
                        </p>
                        <div className="bg-gray-50 p-3 rounded-md mt-2">
                          <p className="font-medium mb-1">Thông tin tài khoản:</p>
                          <p className="mb-0">Ngân hàng: Vietcombank</p>
                          <p className="mb-0">STK: 1234567890</p>
                          <p className="mb-0">Chủ TK: Công ty TNHH Thương Mại Điện Tử</p>
                          <p className="mb-0">Chi nhánh: TP.HCM</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button 
                        type="submit" 
                        className="ps-btn w-full p-3 bg-blue-600 hover:bg-blue-700 text-black font-medium rounded-md transition duration-200 flex justify-center items-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang xử lý...
                          </>
                        ) : (
                          'Đặt hàng'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
