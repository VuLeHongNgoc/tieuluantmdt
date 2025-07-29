'use client';

import BreadcrumbMinimal from '@/components/ui/BreadcrumbMinimal';
import { formatCurrency } from '@/lib/utils';
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
  paymentMethod: 'cod' | 'vnpay' | 'bank-transfer';
  orderNotes?: string;
}

const CheckoutPage = () => {
  // Mock cart data
  const cartItems: CartItem[] = [
    {
      id: '1',
      title: 'Áo Thun Minimalist Typography',
      price: 390000,
      quantity: 2,
      image: '/images/product/product-1.jpg'
    },
    {
      id: '2',
      title: 'Quần Jean Slim Fit',
      price: 550000,
      quantity: 1,
      image: '/images/product/product-2.jpg'
    }
  ];

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

  // State for form data
  const [formData, setFormData] = useState<CheckoutFormData>({
    billingAddress: { ...emptyAddress },
    shippingAddress: { ...emptyAddress },
    sameAsShipping: true,
    paymentMethod: 'vnpay',
    orderNotes: ''
  });

  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 30000; // Fixed shipping fee
  const total = subtotal + shipping;

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
    
    // Validate form
    const {
      firstName, lastName, country, streetAddress, city, state, zipCode, phone, email
    } = formData.shippingAddress;

    if (!firstName || !lastName || !country || !streetAddress || !city || !state || !zipCode || !phone || !email) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng.');
      return;
    }

    // In a real application, you would submit this data to your API
    console.log('Order submitted:', formData);
    alert('Đặt hàng thành công! Bạn sẽ được chuyển hướng đến trang thanh toán.');
    
    // Redirect to payment gateway if using VNPAY
    if (formData.paymentMethod === 'vnpay') {
      // window.location.href = '/api/payment/create-vnpay-url';
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
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div className="ps-checkout__billing">
                  <h3 className="ps-checkout__heading">Thông tin giao hàng</h3>
                  
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label>Họ <span className="required">*</span></label>
                        <input 
                          className="form-control" 
                          type="text" 
                          name="firstName"
                          value={formData.shippingAddress.firstName}
                          onChange={handleShippingChange}
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
                          value={formData.shippingAddress.lastName}
                          onChange={handleShippingChange}
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
                      value={formData.shippingAddress.company}
                      onChange={handleShippingChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Quốc gia <span className="required">*</span></label>
                    <select 
                      className="form-control" 
                      name="country"
                      value={formData.shippingAddress.country}
                      onChange={handleShippingChange}
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
                      value={formData.shippingAddress.streetAddress}
                      onChange={handleShippingChange}
                      required
                    />
                    <input 
                      className="form-control" 
                      type="text" 
                      placeholder="Căn hộ, tòa nhà, tầng (tùy chọn)" 
                      name="apartment"
                      value={formData.shippingAddress.apartment}
                      onChange={handleShippingChange}
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
                          value={formData.shippingAddress.city}
                          onChange={handleShippingChange}
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
                          value={formData.shippingAddress.state}
                          onChange={handleShippingChange}
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
                          value={formData.shippingAddress.zipCode}
                          onChange={handleShippingChange}
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
                          value={formData.shippingAddress.phone}
                          onChange={handleShippingChange}
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
                          value={formData.shippingAddress.email}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <div className="ps-checkbox">
                      <input 
                        className="form-control" 
                        type="checkbox" 
                        id="same-as-shipping" 
                        checked={formData.sameAsShipping}
                        onChange={handleSameAsShippingChange}
                      />
                      <label htmlFor="same-as-shipping">Địa chỉ thanh toán giống địa chỉ giao hàng?</label>
                    </div>
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
                  
                  <div className="form-group">
                    <label>Ghi chú đơn hàng (tùy chọn)</label>
                    <textarea 
                      className="form-control" 
                      rows={5} 
                      placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết." 
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleOrderNotesChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div className="ps-checkout__order">
                  <header>
                    <h3>Đơn hàng của bạn</h3>
                  </header>
                  <div className="content">
                    <table className="table ps-checkout__products">
                      <thead>
                        <tr>
                          <th className="text-left">Sản phẩm</th>
                          <th className="text-right">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              {item.title} <span>× {item.quantity}</span>
                            </td>
                            <td className="text-right">{formatCurrency(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td>Tạm tính</td>
                          <td className="text-right">{formatCurrency(subtotal)}</td>
                        </tr>
                        <tr>
                          <td>Phí vận chuyển</td>
                          <td className="text-right">{formatCurrency(shipping)}</td>
                        </tr>
                        <tr className="total">
                          <td>Tổng cộng</td>
                          <td className="text-right">{formatCurrency(total)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <footer>
                    <h3>Phương thức thanh toán</h3>
                    <div className="form-group paypal">
                      <div className="ps-radio ps-radio--inline">
                        <input 
                          className="form-control" 
                          type="radio" 
                          id="cod" 
                          name="payment-method"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => handlePaymentMethodChange('cod')}
                        />
                        <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
                      </div>
                      <p>Thanh toán tiền mặt khi nhận được hàng.</p>
                    </div>
                    <div className="form-group paypal">
                      <div className="ps-radio ps-radio--inline">
                        <input 
                          className="form-control" 
                          type="radio" 
                          id="vnpay" 
                          name="payment-method"
                          checked={formData.paymentMethod === 'vnpay'}
                          onChange={() => handlePaymentMethodChange('vnpay')}
                        />
                        <label htmlFor="vnpay">Thanh toán qua VNPAY</label>
                      </div>
                      <div className="ps-checkout__vnpay">
                        <img src="/images/payment/vnpay.png" alt="VNPAY" />
                        <p>Thanh toán an toàn với VNPAY.</p>
                      </div>
                    </div>
                    <div className="form-group cheque">
                      <div className="ps-radio">
                        <input 
                          className="form-control" 
                          type="radio" 
                          id="bank-transfer" 
                          name="payment-method"
                          checked={formData.paymentMethod === 'bank-transfer'}
                          onChange={() => handlePaymentMethodChange('bank-transfer')}
                        />
                        <label htmlFor="bank-transfer">Chuyển khoản ngân hàng</label>
                      </div>
                      <p>
                        Thực hiện thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ được giao sau khi tiền đã được chuyển vào tài khoản của chúng tôi.
                      </p>
                      <p>
                        <strong>Thông tin tài khoản:</strong><br />
                        Ngân hàng: Vietcombank<br />
                        STK: 1234567890<br />
                        Chủ TK: Công ty TNHH Thương Mại Điện Tử<br />
                        Chi nhánh: TP.HCM
                      </p>
                    </div>
                    <div className="form-group submit">
                      <button type="submit" className="ps-btn ps-btn--fullwidth">Đặt hàng</button>
                    </div>
                  </footer>
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
