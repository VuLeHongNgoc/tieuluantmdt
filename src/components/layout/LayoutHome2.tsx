'use client';

import { ReactNode } from 'react';
import TemplateStyles from '../TemplateStyles';
import Footer from './Footer';
import Header from './Header';
import { HeaderHome2 } from './HeaderHome2';

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

interface LayoutProps {
  children: ReactNode;
  cartItems?: CartItem[];
  cartTotal?: number;
  isAuthenticated?: boolean;
  user?: User;
  showBackToTop?: boolean;
  className?: string;
  loadTemplateStyles?: boolean;
  sliderType?: string;
  headerType?: 'default' | 'home2';
}

export default function Layout({
  children,
  cartItems = [],
  cartTotal = 0,
  isAuthenticated = false,
  user,
  showBackToTop = true,
  className = '',
  loadTemplateStyles = true,
  sliderType = 'slider-2',
  headerType = 'home2'
}: LayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Load Template Styles */}
      {loadTemplateStyles && (
        <TemplateStyles 
          loadFontAwesome={true}
          loadMainStyles={true}
          sliderType={sliderType}
        />
      )}

      {/* Header */}
      {headerType === 'home2' ? (
        <HeaderHome2
          cartItems={cartItems}
          cartTotal={cartTotal}
          isAuthenticated={isAuthenticated}
          user={user}
          isSticky={true}
        />
      ) : (
        <Header 
          cartItems={cartItems}
          cartTotal={cartTotal}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer showBackToTop={showBackToTop} />
    </div>
  );
}
