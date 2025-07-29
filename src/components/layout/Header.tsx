'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface HeaderProps {
  cartItems?: CartItem[];
  cartTotal?: number;
  isAuthenticated?: boolean;
  user?: User;
}

export default function Header({ cartItems = [], cartTotal = 0, isAuthenticated = false, user }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      {/* Search Box Overlay */}
      {isSearchOpen && (
        <div className="ps-searchbox fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tìm kiếm sản phẩm</h3>
              <button 
                onClick={toggleSearch}
                className="ps-searchbox__remove text-2xl hover:text-red-500"
              >
                <i className="fa fa-remove"></i>
              </button>
            </div>
            <div className="flex">
              <input 
                type="text"
                placeholder="Nhập từ khóa..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <div className="header--sidebar fixed top-0 left-0 h-full w-64 z-50 bg-white shadow-lg transform transition-transform">
          <div className="p-4">
            <button 
              onClick={toggleMobileMenu}
              className="header__close absolute top-4 right-4 text-2xl hover:text-red-500"
            >
              <i className="fa fa-times"></i>
            </button>
            
            <ul className="menu mt-8 space-y-2">
              <li className="current-menu-item">
                <Link href="/" className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/shop" className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded">
                  Cửa hàng
                </Link>
              </li>
              <li>
                <Link href="/about" className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className="header header--4 header--white bg-transparent relative z-40">
        <nav className="navigation py-4">
          <div className="ps-container-fluid max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              
              {/* Left Section */}
              <div className="left flex items-center space-x-4">
                {/* Mobile Menu Toggle */}
                <button 
                  onClick={toggleMobileMenu}
                  className="menu-toggle lg:hidden flex flex-col w-6 h-6 justify-center space-y-1"
                >
                  <span className="block w-full h-0.5 bg-white"></span>
                  <span className="block w-full h-0.5 bg-white"></span>
                  <span className="block w-full h-0.5 bg-white"></span>
                </button>

                {/* Logo */}
                <Link href="/" className="ps-logo">
                  <Image 
                    src="/images/logo-white.png" 
                    alt="Logo" 
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                    priority
                  />
                </Link>
              </div>

              {/* Center Navigation - Hidden on mobile */}
              <div className="center hidden lg:block">
                <ul className="menu flex items-center space-x-8 text-white">
                  <li>
                    <Link href="/" className="hover:text-gray-300 transition-colors">
                      Trang chủ
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" className="hover:text-gray-300 transition-colors">
                      Cửa hàng
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-gray-300 transition-colors">
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-gray-300 transition-colors">
                      Liên hệ
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-gray-300 transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Right Section */}
              <div className="right">
                <ul className="header__actions flex items-center space-x-4">
                  
                  {/* Search Button */}
                  <li>
                    <button 
                      onClick={toggleSearch}
                      className="ps-search-btn text-white hover:text-gray-300 text-xl"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </li>

                  {/* User Menu */}
                  <li>
                    {isAuthenticated ? (
                      <div className="relative group">
                        <button className="text-white hover:text-gray-300 text-xl">
                          <i className="fa fa-user"></i>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Thông tin cá nhân
                          </Link>
                          <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Đơn hàng của tôi
                          </Link>
                          <hr className="my-1" />
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Đăng xuất
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Link href="/login" className="text-white hover:text-gray-300 text-xl">
                        <i className="fa fa-user"></i>
                      </Link>
                    )}
                  </li>

                  {/* Shopping Cart */}
                  <li className="header__cart relative">
                    <button 
                      onClick={toggleCart}
                      className="ps-shopping text-white hover:text-gray-300 text-xl relative"
                    >
                      <i className="fa fa-shopping-cart"></i>
                      {getTotalItems() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {getTotalItems()}
                        </span>
                      )}
                    </button>

                    {/* Cart Dropdown */}
                    {isCartOpen && (
                      <div className="dropdown-menu absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-50">
                        <div className="px-4 py-2 border-b">
                          <h3 className="font-semibold text-gray-800">Giỏ hàng ({getTotalItems()} sản phẩm)</h3>
                        </div>
                        
                        {cartItems.length === 0 ? (
                          <div className="px-4 py-6 text-center text-gray-500">
                            Giỏ hàng trống
                          </div>
                        ) : (
                          <>
                            <div className="max-h-64 overflow-y-auto">
                              {cartItems.map((item) => (
                                <div key={item.id} className="ps-product--shopping-cart flex items-center px-4 py-3 border-b">
                                  <Link href={`/product/${item.id}`} className="ps-product__thumbnail w-12 h-12 flex-shrink-0">
                                    <Image 
                                      src={item.image} 
                                      alt={item.name}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover rounded"
                                    />
                                  </Link>
                                  <div className="ps-product__content flex-1 ml-3">
                                    <Link href={`/product/${item.id}`} className="ps-product__title block text-sm font-medium text-gray-800 hover:text-blue-600">
                                      {item.name}
                                    </Link>
                                    <div className="ps-product__quantity text-sm text-gray-600">
                                      {item.quantity} x <span className="font-medium">${item.price.toFixed(2)}</span>
                                    </div>
                                  </div>
                                  <button className="ps-product__remove text-red-500 hover:text-red-700 ml-2">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              ))}
                            </div>
                            
                            <div className="total px-4 py-3 border-t bg-gray-50">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Tổng cộng:</span>
                                <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
                              </div>
                              <Link 
                                href="/cart" 
                                className="ps-btn w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors block"
                              >
                                Xem giỏ hàng
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Overlay for cart dropdown */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={toggleCart}
        ></div>
      )}
    </>
  );
}
