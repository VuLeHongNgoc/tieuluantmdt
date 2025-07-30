'use client';

import { useCart } from '@/components/providers/CartProvider';
import BreadcrumbMinimal from '@/components/ui/BreadcrumbMinimal';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  // Get cart from cart provider
  const { cart, loading, error, updateCartItem, removeFromCart, applyCoupon } = useCart();
  
  const [couponCode, setCouponCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // Tính tổng giá trị giỏ hàng
  console.log('Cart in page:', cart);
  const cartItems = cart?.items || [];
  const subtotal = cartItems.reduce((total: number, item: any) => {
    const itemPrice = item.product?.price || item.price || 0;
    const quantity = item.quantity || 0;
    return total + (itemPrice * quantity);
  }, 0);
  
  const discount = cart?.discount || 0;
  const shipping = shippingMethod === 'express' ? 50000 : 30000;
  const total = subtotal - discount + shipping;

  // Xử lý thay đổi số lượng
  const handleQuantityChange = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(id, newQuantity);
    } catch (error) {
      toast.error('Không thể cập nhật số lượng sản phẩm');
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = async (id: string) => {
    console.log('Removing item with ID:', id);
    if (!id) {
      toast.error('Không thể xóa sản phẩm - ID không hợp lệ');
      return;
    }
    try {
      await removeFromCart(id);
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    } catch (error) {
      toast.error('Không thể xóa sản phẩm');
    }
  };

  // Áp dụng mã giảm giá
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await applyCoupon(couponCode);
      toast.success('Đã áp dụng mã giảm giá thành công!');
    } catch (error) {
      toast.error('Mã giảm giá không hợp lệ!');
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
            <div className="ps-cart__header bg-gray-100 p-4 rounded-t-md border-b">
              <h3 className="text-2xl font-bold">Giỏ hàng của bạn</h3>
              <p className="text-gray-600">{cartItems.length} sản phẩm trong giỏ hàng</p>
            </div>

            {loading ? (
              <div className="ps-cart__content">
                <div className="ps-cart__empty">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto"></div>
                  <p className="mt-4">Đang tải giỏ hàng...</p>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="ps-cart__content bg-white p-8 flex flex-col items-center justify-center border rounded-md shadow-sm">
                <div className="ps-cart__empty text-center py-12">
                  <div className="flex justify-center mb-4">
                    <i className="fa fa-shopping-cart text-6xl text-gray-300"></i>
                  </div>
                  <h4 className="text-2xl font-semibold mb-2">Giỏ hàng của bạn đang trống</h4>
                  <p className="text-gray-500 mb-8">Khám phá các sản phẩm của chúng tôi và thêm vào giỏ hàng.</p>
                  <Link href="/shop" className="ps-btn px-8 py-3">
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
                        {cartItems.map((item: any) => {
                          console.log('Rendering cart item:', item);
                          const product = item.product || {};
                          const productId = product._id || item.productId;
                          
                          // Get image URL from various formats
                          const imageUrl = 
                            product.imageUrl || 
                            (product.images && product.images[0] && (product.images[0].imageUrl || product.images[0])) ||
                            '/images/product/placeholder.jpg';
                            
                          const productName = product.name || product.title || 'Sản phẩm';
                          
                          return (
                            <tr key={item._id || `item-${productId}-${item.quantity}`}>
                              <td>
                                <div className="ps-product--cart">
                                  <div className="ps-product__thumbnail">
                                    <Link href={`/product/${productId}`}>
                                      <Image 
                                        src={imageUrl} 
                                        alt={productName}
                                        width={100}
                                        height={100}
                                        style={{objectFit: 'cover'}}
                                      />
                                    </Link>
                                  </div>
                                  <div className="ps-product__content">
                                    <Link href={`/product/${productId}`} className="ps-product__title">
                                      {productName}
                                    </Link>
                                    {item.variant?.size && <p><small>Kích cỡ: {item.variant.size}</small></p>}
                                    {item.variant?.color && <p><small>Màu: {item.variant.color}</small></p>}
                                </div>
                              </div>
                            </td>
                            <td>{formatCurrency(item.product?.price || 0)}</td>
                            <td>
                              <div className="form-group--number">
                                <button 
                                  className="minus"
                                  onClick={() => handleQuantityChange(item._id || `${productId}`, item.quantity - 1)}
                                  disabled={item.quantity <= 1 || loading}
                                >
                                  <span>-</span>
                                </button>
                                <input 
                                  className="form-control"
                                  type="number" 
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item._id || `${productId}`, parseInt(e.target.value) || 1)}
                                  disabled={loading}
                                />
                                <button 
                                  className="plus"
                                  onClick={() => handleQuantityChange(item._id || `${productId}`, item.quantity + 1)}
                                  disabled={loading}
                                >
                                  <span>+</span>
                                </button>
                              </div>
                            </td>
                            <td>{formatCurrency((item.product?.price || 0) * item.quantity)}</td>
                            <td>
                              <button 
                                className="ps-remove"
                                onClick={() => handleRemoveItem(item._id || `${productId}`)}
                                disabled={loading}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                          );
                        })}
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
                      <button className="ps-btn" onClick={() => cart && cartItems.map((item: any) => removeFromCart(item._id))} disabled={loading}>
                        <i className="fa fa-refresh mr-2"></i> {loading ? 'Đang xóa...' : 'Xóa giỏ hàng'}
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
                            {discount > 0 && (
                              <div className="ps-cart__row">
                                <span>Giảm giá</span>
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
