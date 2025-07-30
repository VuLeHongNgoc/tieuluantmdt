'use client';

import { signOut } from 'next-auth/react';
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
                  className="ps-shopping"
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
                  <span><i>{totalItems}</i></span>
                </button>
                {isCartOpen && (
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="shopping-cart"
                    id="shopping-list"
                  >
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item) => (
                          <li key={item.id}>
                            <span className="ps-product--shopping-cart">
                              <Link className="ps-product__thumbnail" href={`/product/${item.id}`}>
                                <Image 
                                  src={item.image} 
                                  alt={item.name}
                                  width={60}
                                  height={60}
                                />
                              </Link>
                              <span className="ps-product__content">
                                <Link className="ps-product__title" href={`/product/${item.id}`}>
                                  {item.name}
                                </Link>
                                <span className="ps-product__quantity">
                                  {item.quantity} x <span>{formatPrice(item.price)}</span>
                                </span>
                              </span>
                              <button 
                                className="ps-product__remove"
                                onClick={() => {}}
                                aria-label="Remove item"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </span>
                          </li>
                        ))}
                        <li className="total">
                          <p>Total: <span>{formatPrice(cartTotal)}</span></p>
                          <Link className="ps-btn" href="/cart">Go to cart</Link>
                        </li>
                      </>
                    ) : (
                      <li className="empty-cart">
                        <p>Your cart is empty</p>
                        <Link className="ps-btn" href="/shop">Continue Shopping</Link>
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
              ×
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
