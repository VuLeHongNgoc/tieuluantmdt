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
            <div className="ps-cart__header mb-6">
              <h3 className="text-2xl font-bold">Giỏ hàng của bạn</h3>
              <p className="text-gray-600">{cartItems.length} sản phẩm trong giỏ hàng</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                <p className="ml-4">Đang tải giỏ hàng...</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="bg-white p-8 flex flex-col items-center justify-center border rounded-md shadow-sm">
                <div className="text-center py-12">
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
              <div className="flex flex-col md:flex-row gap-8">
                {/* Cột trái - Danh sách sản phẩm trong giỏ hàng */}
                <div className="md:w-8/12">
                  <div className="ps-cart__content bg-white p-6 border rounded-md shadow-sm">
                    <div className="table-responsive">
                      <table className="table ps-cart__table w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-4">Sản phẩm</th>
                            <th className="text-center py-4">Giá</th>
                            <th className="text-center py-4">Số lượng</th>
                            <th className="text-right py-4">Thành tiền</th>
                            <th className="w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item: any) => {
                            const product = item.product || {};
                            const productId = product._id || item.productId;
                            
                            // Get image URL from various formats
                            const imageUrl = 
                              product.imageUrl || 
                              (product.images && product.images[0] && (product.images[0].imageUrl || product.images[0])) ||
                              '/images/product/placeholder.jpg';
                              
                            const productName = product.name || product.title || 'Sản phẩm';
                            
                            return (
                              <tr key={item._id || `item-${productId}-${item.quantity}`} className="border-b py-4">
                                <td className="py-4">
                                  <div className="ps-product--cart flex items-center">
                                    <div className="ps-product__thumbnail mr-4">
                                      <Link href={`/product/${productId}`}>
                                        <Image 
                                          src={imageUrl} 
                                          alt={productName}
                                          width={90}
                                          height={90}
                                          style={{objectFit: 'cover'}}
                                          className="rounded"
                                        />
                                      </Link>
                                    </div>
                                    <div className="ps-product__content">
                                      <Link href={`/product/${productId}`} className="ps-product__title font-medium hover:text-blue-600">
                                        {productName}
                                      </Link>
                                      {item.variant?.size && <p className="text-sm text-gray-500 mt-1">Kích cỡ: {item.variant.size}</p>}
                                      {item.variant?.color && <p className="text-sm text-gray-500">Màu: {item.variant.color}</p>}
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center py-4">{formatCurrency(item.product?.price || 0)}</td>
                                <td className="text-center py-4">
                                  <div className="form-group--number flex items-center justify-center">
                                    <button 
                                      className="minus w-8 h-8 flex items-center justify-center border rounded-l-md hover:bg-gray-100"
                                      onClick={() => handleQuantityChange(item._id || `${productId}`, item.quantity - 1)}
                                      disabled={item.quantity <= 1 || loading}
                                    >
                                      <span>-</span>
                                    </button>
                                    <input 
                                      className="form-control w-12 h-8 text-center border-t border-b"
                                      type="number" 
                                      value={item.quantity}
                                      onChange={(e) => handleQuantityChange(item._id || `${productId}`, parseInt(e.target.value) || 1)}
                                      disabled={loading}
                                    />
                                    <button 
                                      className="plus w-8 h-8 flex items-center justify-center border rounded-r-md hover:bg-gray-100"
                                      onClick={() => handleQuantityChange(item._id || `${productId}`, item.quantity + 1)}
                                      disabled={loading}
                                    >
                                      <span>+</span>
                                    </button>
                                  </div>
                                </td>
                                <td className="text-right py-4 font-medium">{formatCurrency((item.product?.price || 0) * item.quantity)}</td>
                                <td className="text-center py-4">
                                  <button 
                                    className="ps-remove text-red-500 hover:text-red-700"
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
                    
                    <div className="flex flex-wrap justify-between items-center mt-8 gap-4">
                      <Link href="/shop" className="ps-btn ps-btn--outline">
                        <i className="fa fa-arrow-left mr-2"></i> Tiếp tục mua sắm
                      </Link>
                      <button className="ps-btn" onClick={() => cart && cartItems.map((item: any) => removeFromCart(item._id))} disabled={loading}>
                        <i className="fa fa-refresh mr-2"></i> {loading ? 'Đang xóa...' : 'Xóa giỏ hàng'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Cột phải - Tổng giỏ hàng */}
                <div className="md:w-4/12 mt-6 md:mt-0">
                  <div className="ps-cart__sidebar">
                    {/* Phần coupon */}
                    <div className="bg-white p-6 border rounded-md shadow-sm mb-6">
                      <h4 className="text-lg font-medium mb-4">Mã giảm giá</h4>
                      <form onSubmit={handleApplyCoupon} className="ps-cart__coupon">
                        <div className="flex">
                          <input 
                            className="form-control flex-grow p-3 border rounded-l-md" 
                            type="text" 
                            placeholder="Nhập mã giảm giá" 
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                          <button type="submit" className="ps-btn ps-btn--sm rounded-l-none p-3">
                            Áp dụng
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Phần tổng giỏ hàng */}
                    <div className="ps-cart__total bg-white p-6 border rounded-md shadow-sm">
                      <h3 className="text-xl font-bold mb-4 pb-2 border-b">Tổng giỏ hàng</h3>
                      
                      <div className="ps-cart__shipping mb-6">
                        <h4 className="text-lg font-medium mb-3">Phương thức vận chuyển</h4>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="shipping" 
                              id="shipping-standard" 
                              checked={shippingMethod === 'standard'}
                              onChange={() => setShippingMethod('standard')}
                              className="mr-2"
                            />
                            <label htmlFor="shipping-standard" className="flex-grow">
                              Tiêu chuẩn
                            </label>
                            <span className="font-medium">{formatCurrency(30000)}</span>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="shipping" 
                              id="shipping-express"
                              checked={shippingMethod === 'express'}
                              onChange={() => setShippingMethod('express')}
                              className="mr-2"
                            />
                            <label htmlFor="shipping-express" className="flex-grow">
                              Nhanh
                            </label>
                            <span className="font-medium">{formatCurrency(50000)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ps-cart__summary mb-6 pt-4 border-t">
                        <div className="ps-cart__row flex justify-between mb-2">
                          <span>Tạm tính</span>
                          <span className="font-medium">{formatCurrency(subtotal)}</span>
                        </div>
                        {discount > 0 && (
                          <div className="ps-cart__row flex justify-between mb-2 text-green-600">
                            <span>Giảm giá</span>
                            <span>-{formatCurrency(discount)}</span>
                          </div>
                        )}
                        <div className="ps-cart__row flex justify-between mb-4">
                          <span>Phí vận chuyển</span>
                          <span className="font-medium">{formatCurrency(shipping)}</span>
                        </div>
                        <div className="ps-cart__row flex justify-between pt-3 mt-3 border-t">
                          <span className="text-lg font-bold">Tổng cộng</span>
                          <span className="ps-cart__total-amount text-lg font-bold">{formatCurrency(total)}</span>
                        </div>
                      </div>
                      
                      <Link href="/checkout" className="ps-btn ps-btn--fullwidth">
                        Tiến hành thanh toán
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
