'use client';

import BreadcrumbMinimal from '@/components/ui/BreadcrumbMinimal';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

// Type definitions
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

const CartPage = () => {
  // Mock data - trong thực tế sẽ được fetch từ API hoặc state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'Áo Thun Minimalist Typography',
      price: 390000,
      quantity: 2,
      image: '/images/product/product-1.jpg',
      size: 'M',
      color: 'Đen'
    },
    {
      id: '2',
      title: 'Quần Jean Slim Fit',
      price: 550000,
      quantity: 1,
      image: '/images/product/product-2.jpg',
      size: 'L',
      color: 'Xanh đậm'
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // Tính tổng giá trị giỏ hàng
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = couponApplied ? subtotal * 0.1 : 0; // Giảm 10% nếu có mã giảm giá
  const shipping = shippingMethod === 'express' ? 50000 : 30000;
  const total = subtotal - discount + shipping;

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Áp dụng mã giảm giá
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'SALE10') {
      setCouponApplied(true);
      alert('Đã áp dụng mã giảm giá thành công!');
    } else {
      alert('Mã giảm giá không hợp lệ!');
    }
  };

  return (
    <div className="cart-page">
      <BreadcrumbMinimal
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giỏ hàng', href: '#', active: true }
        ]}
      />

      <div className="ps-content pt-80 pb-80">
        <div className="ps-container">
          <div className="ps-cart">
            <div className="ps-cart__header">
              <h3>Giỏ hàng của bạn</h3>
            </div>

            {cartItems.length === 0 ? (
              <div className="ps-cart__content">
                <div className="ps-cart__empty">
                  <h4>Giỏ hàng của bạn đang trống</h4>
                  <p>Khám phá các sản phẩm của chúng tôi và thêm vào giỏ hàng.</p>
                  <Link href="/shop" className="ps-btn">
                    Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="ps-cart__content">
                  <div className="table-responsive">
                    <table className="table ps-cart__table">
                      <thead>
                        <tr>
                          <th>Sản phẩm</th>
                          <th>Giá</th>
                          <th>Số lượng</th>
                          <th>Thành tiền</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <div className="ps-product--cart">
                                <div className="ps-product__thumbnail">
                                  <Link href={`/product/${item.id}`}>
                                    <Image 
                                      src={item.image} 
                                      alt={item.title}
                                      width={100}
                                      height={100}
                                      style={{objectFit: 'cover'}}
                                    />
                                  </Link>
                                </div>
                                <div className="ps-product__content">
                                  <Link href={`/product/${item.id}`} className="ps-product__title">
                                    {item.title}
                                  </Link>
                                  {item.size && <p><small>Kích cỡ: {item.size}</small></p>}
                                  {item.color && <p><small>Màu: {item.color}</small></p>}
                                </div>
                              </div>
                            </td>
                            <td>{formatCurrency(item.price)}</td>
                            <td>
                              <div className="form-group--number">
                                <button 
                                  className="minus"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  <span>-</span>
                                </button>
                                <input 
                                  className="form-control"
                                  type="number" 
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                />
                                <button 
                                  className="plus"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <span>+</span>
                                </button>
                              </div>
                            </td>
                            <td>{formatCurrency(item.price * item.quantity)}</td>
                            <td>
                              <button 
                                className="ps-remove"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="ps-cart__actions">
                  <div className="ps-cart__promotion">
                    <div className="ps-cart__coupon">
                      <form onSubmit={handleApplyCoupon}>
                        <div className="form-group">
                          <input 
                            className="form-control" 
                            type="text" 
                            placeholder="Nhập mã giảm giá" 
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                          <button type="submit" className="ps-btn ps-btn--sm">Áp dụng</button>
                        </div>
                      </form>
                    </div>
                    <div className="ps-cart__actions-btn">
                      <Link href="/shop" className="ps-btn ps-btn--outline">
                        <i className="fa fa-arrow-left mr-2"></i> Tiếp tục mua sắm
                      </Link>
                      <button className="ps-btn" onClick={() => setCartItems([])}>
                        <i className="fa fa-refresh mr-2"></i> Xóa giỏ hàng
                      </button>
                    </div>
                  </div>

                  <div className="ps-cart__total">
                    <h3>Tổng giỏ hàng</h3>
                    <div className="ps-cart__total-body">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="ps-cart__shipping">
                            <h4>Phương thức vận chuyển</h4>
                            <div className="form-group">
                              <div className="radio">
                                <input 
                                  type="radio" 
                                  name="shipping" 
                                  id="shipping-standard" 
                                  checked={shippingMethod === 'standard'}
                                  onChange={() => setShippingMethod('standard')}
                                />
                                <label htmlFor="shipping-standard">
                                  Tiêu chuẩn - {formatCurrency(30000)}
                                </label>
                              </div>
                              <div className="radio">
                                <input 
                                  type="radio" 
                                  name="shipping" 
                                  id="shipping-express"
                                  checked={shippingMethod === 'express'}
                                  onChange={() => setShippingMethod('express')} 
                                />
                                <label htmlFor="shipping-express">
                                  Nhanh - {formatCurrency(50000)}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="ps-cart__summary">
                            <div className="ps-cart__row">
                              <span>Tạm tính</span>
                              <span>{formatCurrency(subtotal)}</span>
                            </div>
                            {couponApplied && (
                              <div className="ps-cart__row">
                                <span>Giảm giá (10%)</span>
                                <span>-{formatCurrency(discount)}</span>
                              </div>
                            )}
                            <div className="ps-cart__row">
                              <span>Phí vận chuyển</span>
                              <span>{formatCurrency(shipping)}</span>
                            </div>
                            <div className="ps-cart__row">
                              <span>Tổng cộng</span>
                              <span className="ps-cart__total-amount">{formatCurrency(total)}</span>
                            </div>
                          </div>
                          <Link href="/checkout" className="ps-btn ps-btn--fullwidth">
                            Tiến hành thanh toán
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
