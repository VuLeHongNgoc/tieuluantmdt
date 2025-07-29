'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

interface HeaderHome2Props {
  cartItems?: CartItem[];
  cartTotal?: number;
  isAuthenticated?: boolean;
  user?: User;
  isSticky?: boolean;
}

export function HeaderHome2({ 
  cartItems = [], 
  cartTotal = 0, 
  isAuthenticated = false, 
  user,
  isSticky = true 
}: HeaderHome2Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle sticky header scroll
  useEffect(() => {
    if (!isSticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <>
      {/* Main Header */}
      <header 
        className={`header header--2 ${
          isSticky 
            ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                  ? 'bg-white shadow-lg py-2' 
                  : 'bg-transparent py-4'
              }`
            : 'relative bg-white'
        }`}
        data-sticky={isSticky}
      >
        <nav className="navigation">
          <div className="ps-container-fluid px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left Menu */}
              <div className="left hidden lg:flex">
                <ul className="menu flex items-center space-x-8">
                  <li className="current-menu-item menu-item-has-children dropdown group relative">
                    <Link 
                      href="/" 
                      className={`text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                        isScrolled ? 'text-gray-800 hover:text-[#ca2028]' : 'text-gray-800 hover:text-[#ca2028]'
                      }`}
                    >
                      Home
                    </Link>
                    <ul className="sub-menu absolute top-full left-0 bg-white shadow-lg py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <li><Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Homepage #1</Link></li>
                      <li><Link href="/homepage-2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Homepage #2</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link 
                      href="/shop" 
                      className={`text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                        isScrolled ? 'text-gray-800 hover:text-[#ca2028]' : 'text-gray-800 hover:text-[#ca2028]'
                      }`}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className={`text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                        isScrolled ? 'text-gray-800 hover:text-[#ca2028]' : 'text-gray-800 hover:text-[#ca2028]'
                      }`}
                    >
                      Pages
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className={`text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                        isScrolled ? 'text-gray-800 hover:text-[#ca2028]' : 'text-gray-800 hover:text-[#ca2028]'
                      }`}
                    >
                      Features
                    </Link>
                  </li>
                  <li className="menu-item-has-children dropdown group relative">
                    <Link 
                      href="/blog" 
                      className={`text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                        isScrolled ? 'text-gray-800 hover:text-[#ca2028]' : 'text-gray-800 hover:text-[#ca2028]'
                      }`}
                    >
                      Blog
                    </Link>
                    <ul className="sub-menu absolute top-full left-0 bg-white shadow-lg py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <li><Link href="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Blog Grid 1</Link></li>
                      <li><Link href="/blog-2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Blog Grid 2</Link></li>
                      <li><Link href="/blog-list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Blog List</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Center Logo */}
              <div className="center">
                <Link href="/" className="ps-logo block">
                  <Image
                    src="/images/logo.png"
                    alt="Exist Logo"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </Link>
              </div>

              {/* Right Actions */}
              <div className="right flex items-center space-x-4">
                {/* Mobile Menu Toggle */}
                <div className="menu-toggle lg:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex flex-col space-y-1 w-6 h-6"
                    aria-label="Toggle menu"
                  >
                    <span className={`block h-0.5 w-6 bg-gray-800 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block h-0.5 w-6 bg-gray-800 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block h-0.5 w-6 bg-gray-800 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                  </button>
                </div>

                {/* Header Actions */}
                <ul className="header__actions flex items-center space-x-3">
                  {/* Search */}
                  <li>
                    <button
                      onClick={() => setIsSearchOpen(true)}
                      className={`ps-search-btn p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${
                        isScrolled ? 'text-gray-800' : 'text-gray-800'
                      }`}
                      aria-label="Search"
                    >
                      <i className="exist-search text-lg"></i>
                    </button>
                  </li>

                  {/* User */}
                  <li>
                    {isAuthenticated && user ? (
                      <div className="group relative">
                        <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${
                          isScrolled ? 'text-gray-800' : 'text-gray-800'
                        }`}>
                          <i className="exist-user text-lg"></i>
                        </button>
                        <div className="absolute top-full right-0 bg-white shadow-lg py-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                          <div className="px-4 py-2 border-b">
                            <p className="text-sm font-medium text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-600">{user.email}</p>
                          </div>
                          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                          <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                        </div>
                      </div>
                    ) : (
                      <Link 
                        href="/login"
                        className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${
                          isScrolled ? 'text-gray-800' : 'text-gray-800'
                        }`}
                      >
                        <i className="exist-user text-lg"></i>
                      </Link>
                    )}
                  </li>

                  {/* Shopping Cart */}
                  <li className="header__cart relative">
                    <button
                      onClick={() => setIsCartOpen(!isCartOpen)}
                      className={`ps-shopping p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative ${
                        isScrolled ? 'text-gray-800' : 'text-gray-800'
                      }`}
                      aria-label="Shopping cart"
                    >
                      <i className="exist-minicart text-lg"></i>
                      {getTotalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#ca2028] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {getTotalItems()}
                        </span>
                      )}
                    </button>

                    {/* Cart Dropdown */}
                    {isCartOpen && (
                      <div className="absolute top-full right-0 bg-white shadow-lg w-80 z-50">
                        <div className="p-4 border-b">
                          <h3 className="font-semibold text-gray-800">Shopping Cart</h3>
                        </div>
                        {cartItems.length > 0 ? (
                          <>
                            <div className="max-h-64 overflow-y-auto">
                              {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center space-x-3 p-4 border-b">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                    className="rounded"
                                  />
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                                    <p className="text-sm text-gray-600">
                                      {item.quantity} x {formatPrice(item.price)}
                                    </p>
                                  </div>
                                  <button className="text-red-500 hover:text-red-700">
                                    <i className="fa fa-trash text-sm"></i>
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="p-4 bg-gray-50">
                              <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-gray-800">Total:</span>
                                <span className="font-bold text-lg text-[#ca2028]">{formatPrice(cartTotal)}</span>
                              </div>
                              <Link
                                href="/cart"
                                className="block w-full text-center bg-[#ca2028] text-white py-2 rounded hover:bg-[#a01a20] transition-colors duration-200"
                              >
                                Go to cart
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div className="p-4 text-center text-gray-600">
                            Your cart is empty
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Promotional Banner */}
        <div className="header__bottom bg-gray-100 border-t">
          <div className="container mx-auto px-4">
            <p className="text-center py-2 text-sm text-gray-700 flex items-center justify-center space-x-2">
              <Image
                src="/images/icons/ship.png"
                alt="Free shipping"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>
                Free shipping and returns on all orders over
                <span className="font-semibold text-[#ca2028] ml-1">$100</span>
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="ps-searchbox fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Search Products</h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="ps-searchbox__remove text-gray-500 hover:text-gray-700"
              >
                <i className="fa fa-remove text-xl"></i>
              </button>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ca2028]"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-[#ca2028] text-white py-3 rounded-lg hover:bg-[#a01a20] transition-colors duration-200"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Sidebar */}
      {isMobileMenuOpen && (
        <div className="header--sidebar fixed inset-y-0 left-0 w-80 bg-white shadow-lg z-50 lg:hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="ps-logo">
                <Image
                  src="/images/logo.png"
                  alt="Exist Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="header__close text-gray-500 hover:text-gray-700"
              >
                <i className="fa fa-close text-xl"></i>
              </button>
            </div>
            <ul className="menu space-y-2">
              <li><Link href="/" className="block py-2 text-gray-800 hover:text-[#ca2028]">Home</Link></li>
              <li><Link href="/shop" className="block py-2 text-gray-800 hover:text-[#ca2028]">Shop</Link></li>
              <li><Link href="/about" className="block py-2 text-gray-800 hover:text-[#ca2028]">Pages</Link></li>
              <li><Link href="/contact" className="block py-2 text-gray-800 hover:text-[#ca2028]">Features</Link></li>
              <li><Link href="/blog" className="block py-2 text-gray-800 hover:text-[#ca2028]">Blog</Link></li>
            </ul>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Cart Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-0 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </>
  );
}
