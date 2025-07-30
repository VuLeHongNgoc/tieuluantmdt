'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// ProductImage component để xử lý hình ảnh sản phẩm một cách đáng tin cậy
const ProductImage = ({ 
  image, 
  imageUrl, 
  name 
}: { 
  image?: string; 
  imageUrl?: string; 
  name: string 
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Ưu tiên imageUrl trước, sau đó đến image
    if (imageUrl && imageUrl.trim() !== '') {
      setImgSrc(imageUrl);
    } else if (image && image.trim() !== '') {
      setImgSrc(image);
    } else {
      // Nếu không có hình ảnh, sử dụng placeholder
      setImgSrc('/images/product/cart-placeholder.jpg');
    }
    
    // Đặt lại trạng thái lỗi
    setImgError(false);
  }, [image, imageUrl]);

  const handleError = () => {
    console.error('Image failed to load:', imgSrc);
    setImgSrc('/images/product/cart-placeholder.jpg');
    setImgError(true);
  };

  return (
    <div className="relative w-[90px] h-[120px] bg-gray-50">
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover rounded"
          unoptimized
          onError={handleError}
        />
      )}
    </div>
  );
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string; // URL hình ảnh (từ API cũ)
  imageUrl?: string; // URL hình ảnh (từ model Product)
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface HeaderStandardProps {
  cartItems?: CartItem[];
  cartTotal?: number;
  isAuthenticated?: boolean;
  user?: User;
  isSticky?: boolean;
}

export function HeaderStandard({ 
  cartItems = [], 
  cartTotal = 0, 
  isAuthenticated = false, 
  user,
  isSticky = true 
}: HeaderStandardProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Debugging cart items để tìm lỗi hình ảnh
  useEffect(() => {
    if (cartItems.length > 0) {
      console.log('Cart items:', cartItems.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        imageUrl: item.imageUrl
      })));
    }
  }, [cartItems]);

  // Handle sticky header scroll
  useEffect(() => {
    if (!isSticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Close user menu if click outside
      if (isUserMenuOpen && !target.closest('.header__user')) {
        setIsUserMenuOpen(false);
      }
      
      // Close cart if click outside
      if (isCartOpen && !target.closest('.header__cart')) {
        setIsCartOpen(false);
      }
      
      // Close search if click outside
      if (isSearchOpen && !target.closest('.ps-search') && !target.closest('.ps-search-btn')) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen, isCartOpen, isSearchOpen]);

  // Calculate total items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price (in case cartTotal is not provided or incorrect)
  const calculatedCartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Use calculated total if cartTotal is not provided
  const finalCartTotal = cartTotal || calculatedCartTotal;

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <header 
      className={`header header--1 ${isSticky ? 'sticky' : ''} ${isScrolled ? 'scrolled' : ''}`}
      data-sticky={isSticky}
    >
      <nav className="navigation">
        <div className="ps-container-fluid">
          {/* Left - Logo */}
          <div className="left">
            <Link className="ps-logo" href="/">
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={150}
                height={50}
                priority
              />
            </Link>
          </div>

          {/* Center - Navigation Menu */}
          <div className="center">
            <ul className="menu">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Right - Actions */}
          <div className="right">
            <div className="menu-toggle" onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsUserMenuOpen(false);
              setIsCartOpen(false);
              setIsSearchOpen(false);
            }}>
              <span></span>
            </div>
            <ul className="header__actions">
              {/* Search Button */}
              <li>
                <button 
                  className="ps-search-btn" 
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    setIsUserMenuOpen(false);
                    setIsCartOpen(false);
                  }}
                  aria-label="Search"
                >
                  <i className="fa fa-search" style={{color: '#333'}}></i>
                </button>
              </li>

              {/* User Menu */}
              <li className="header__user">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsCartOpen(false);
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center space-x-2"
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                  id="shopping-action"
                >
                  <i className="fa fa-user" style={{color: '#333'}}></i>
                  {isAuthenticated && user && (
                    <span className="hidden md:inline text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                  )}
                </button>
                {isUserMenuOpen && (
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="shopping-action"
                  >
                    {isAuthenticated ? (
                      <>
                        <li>
                          <span className="text-sm font-medium text-gray-700 px-3 py-2 block">
                            👋 Xin chào, {user?.name || 'User'}
                          </span>
                        </li>
                        <li><Link href="/profile">Profile</Link></li>
                        <li><Link href="/orders">My Orders</Link></li>
                        <li><Link href="/wishlist">Wishlist</Link></li>
                        <li>
                          <button 
                            onClick={async () => {
                              await signOut({ callbackUrl: '/' });
                            }}
                            className="text-red-600 hover:text-red-800 w-full text-left"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li><Link href="/auth/login">Login</Link></li>
                        <li><Link href="/auth/register">Register</Link></li>
                        <li><Link href="/wishlist">Wishlist</Link></li>
                      </>
                    )}
                  </ul>
                )}
              </li>

              {/* Shopping Cart */}
              <li className="header__cart">
                <button
                  className="ps-shopping relative"
                  onClick={() => {
                    setIsCartOpen(!isCartOpen);
                    setIsUserMenuOpen(false);
                    setIsSearchOpen(false);
                  }}
                  aria-haspopup="true"
                  aria-expanded={isCartOpen}
                  id="shopping-cart"
                >
                  <i className="fa fa-shopping-cart" style={{color: '#333'}}></i>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                </button>
                {isCartOpen && (
                  <ul
                    className="dropdown-menu shadow-lg rounded-none overflow-hidden dropdown-menu-right"
                    aria-labelledby="shopping-cart"
                    id="shopping-list"
                    style={{
                      maxHeight: '600px',
                      minWidth: '400px',
                      overflowY: 'auto'
                    }}
                  >
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item) => (
                          <li key={item.id} className="hover:bg-gray-50 transition-colors mb-4 border-b border-gray-100 pb-4">
                            <div className="ps-product--shopping-cart px-4 pt-2">
                              {/* Product Image */}
                              <div className="flex items-start space-x-4">
                                <Link className="ps-product__thumbnail flex-shrink-0" href={`/product/${item.id}`}>                                  
                                  <ProductImage 
                                    image={item.image} 
                                    imageUrl={item.imageUrl} 
                                    name={item.name || 'Sản phẩm'}
                                  />
                                </Link>
                                
                                {/* Product Details */}
                                <div className="ps-product__content flex-grow">
                                  {/* Brand and Name */}
                                  <div className="mb-1">
                                    <span className="text-sm font-bold text-gray-500 block">H&M</span>
                                    <Link 
                                      className="ps-product__title block font-semibold text-gray-800 hover:text-primary transition-colors" 
                                      href={`/product/${item.id}`}
                                      title={item.name}
                                    >
                                      {item.name}
                                    </Link>
                                    <span className="font-bold text-black block mt-1">{formatPrice(item.price)}</span>
                                  </div>
                                  
                                  {/* Product Attributes */}
                                  <div className="flex flex-col space-y-2 mt-3">
                                    <div className="flex flex-row justify-between">
                                      <div className="w-1/2">
                                        <span className="text-sm text-gray-500 block">Màu</span>
                                        <span className="text-sm text-black block">Màu đen</span>
                                      </div>
                                      <div className="w-1/2">
                                        <span className="text-sm text-gray-500 block">Kích cỡ</span>
                                        <span className="text-sm text-black block">M</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                      <div className="w-1/2">
                                        <span className="text-sm text-gray-500 block">Số lượng</span>
                                        <span className="text-sm text-black block">{item.quantity}</span>
                                      </div>
                                      <div className="w-1/2">
                                        <span className="text-sm text-gray-500 block">Tổng</span>
                                        <span className="text-sm font-bold text-black block">{formatPrice(item.price * item.quantity)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Remove Button */}
                                <button 
                                  className="ps-product__remove flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                                  onClick={() => {}}
                                  aria-label="Remove item"
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                        <li className="total px-4 py-3">
                          <div className="flex flex-col space-y-2 mb-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Giá trị đơn hàng</span> 
                              <span className="font-bold text-black">{formatPrice(finalCartTotal)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Phí giao hàng ước tính</span> 
                              <span className="font-bold text-black">{formatPrice(49000)}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center py-2 border-t border-gray-200 mt-2">
                            <span className="text-gray-800 font-medium text-lg">TỔNG</span> 
                            <span className="font-bold text-lg text-black">{formatPrice(finalCartTotal + 49000)}</span>
                          </div>
                          <div className="grid gap-2 mt-3">
                            <Link 
                              className="ps-btn ps-btn--warning flex items-center justify-center py-3 text-center rounded-none hover:shadow-md transition-all bg-black text-white font-medium" 
                              href="/checkout"
                            >
                              THANH TOÁN
                            </Link>
                            <Link 
                              className="ps-btn flex items-center justify-center py-3 text-center rounded-none hover:shadow-md transition-all border border-gray-300" 
                              href="/cart"
                            >
                              GIỎ HÀNG
                            </Link>
                          </div>
                        </li>
                      </>
                    ) : (
                      <li className="empty-cart p-6 text-center">
                        <div className="mb-4 flex justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="60"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                          >
                            <circle cx="8" cy="21" r="1"></circle>
                            <circle cx="19" cy="21" r="1"></circle>
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                          </svg>
                        </div>
                        <p className="text-gray-600 mb-4">Giỏ hàng của bạn đang trống</p>
                        <Link 
                          className="ps-btn inline-flex items-center justify-center py-2 px-4 rounded-md hover:shadow-md transition-all" 
                          href="/shop"
                        >
                          <i className="fa fa-shopping-bag mr-2"></i>
                          Tiếp tục mua sắm
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="ps-search">
          <div className="ps-search__content">
            <form className="ps-form--search-header" action="#" method="post">
              <input
                className="form-control"
                type="text"
                placeholder="Search products..."
                autoFocus
              />
              <button type="submit" aria-label="Search">
                <i className="fa fa-search" style={{color: '#333'}}></i>
              </button>
            </form>
            <button 
              className="ps-search__close"
              onClick={() => {
                setIsSearchOpen(false);
                setIsUserMenuOpen(false);
                setIsCartOpen(false);
              }}
              aria-label="Close search"
            ></button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="ps-navigation--mobile">
          <div className="ps-navigation__header">
            <button 
              className="ps-navigation__close"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsUserMenuOpen(false);
                setIsCartOpen(false);
                setIsSearchOpen(false);
              }}
              aria-label="Close menu"
              style={{fontSize: '18px', color: '#333'}}
            >
              &times;
            </button>
          </div>
          <div className="ps-navigation__content">
            <ul className="menu--mobile">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
