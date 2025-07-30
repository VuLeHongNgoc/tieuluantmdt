'use client';

import Layout from '@/components/layout/Layout';
import AuthStatusToast from '@/components/ui/AuthStatusToast';
import { useSession } from 'next-auth/react';

interface AuthLayoutWrapperProps {
  children: React.ReactNode;
  headerType?: 'default' | 'home2' | 'standard';
  footerType?: 'default' | 'simple';
  sliderType?: string;
  loadTemplateStyles?: boolean;
}

export default function AuthLayoutWrapper({
  children,
  headerType = 'standard',
  footerType = 'simple',
  sliderType = 'slider-2',
  loadTemplateStyles = true,
}: AuthLayoutWrapperProps) {
  const { data: session, status } = useSession();

  const isAuthenticated = !!session;
  const user = session?.user ? {
    id: (session.user as any).id || '',
    name: session.user.name || '',
    email: session.user.email || '',
    avatar: session.user.image || undefined,
  } : undefined;
  
  // Import useCart hook to access cart data
  const { cart } = require('@/components/providers/CartProvider').useCart();
  
  // Debug cart data
  console.log('Cart in AuthLayoutWrapper:', cart);
  
  // Extract cart items for the header
  let cartItems: any[] = [];
  
  // Extract cart items for header display if available
  if (cart?.items) {
    try {
      cartItems = cart.items.map((item: any) => {
        // Handle different response structures
        const product = item.product || {};
        const productId = product._id || item.productId;
        
        // Get the image URL depending on API response format
        const imageUrl = 
          (product.imageUrl) || 
          (product.images && product.images[0] && (
            typeof product.images[0] === 'string' 
              ? product.images[0] 
              : product.images[0].imageUrl
          )) || 
          null;
        
        return {
          id: productId,
          name: product.name || 'Sản phẩm',
          price: product.price || item.price || 0,
          quantity: item.quantity || 0,
          image: imageUrl,
        };
      });
    } catch (err) {
      console.error('Error processing cart items for header:', err);
      cartItems = [];
    }
  }
  
  // Calculate cart total
  const cartTotal = cart?.total || 0;

  return (
    <>
      <Layout
        headerType={headerType}
        footerType={footerType}
        sliderType={sliderType}
        loadTemplateStyles={loadTemplateStyles}
        isAuthenticated={isAuthenticated}
        user={user}
        cartItems={cartItems}
        cartTotal={cartTotal}
      >
        {children}
      </Layout>
      <AuthStatusToast />
    </>
  );
}
