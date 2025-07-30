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

  return (
    <>
      <Layout
        headerType={headerType}
        footerType={footerType}
        sliderType={sliderType}
        loadTemplateStyles={loadTemplateStyles}
        isAuthenticated={isAuthenticated}
        user={user}
        cartItems={[]}
        cartTotal={0}
      >
        {children}
      </Layout>
      <AuthStatusToast />
    </>
  );
}
