import TemplateStyles from '@/components/TemplateStyles';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <TemplateStyles />
      <div className="auth-container min-h-screen flex">
        {/* Left side - Authentication form */}
        <div className="auth-form-container w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <div className="auth-logo mb-8">
            <Link href="/">
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={150} 
                height={50} 
                priority
              />
            </Link>
          </div>
          <div className="auth-form-wrapper w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Right side - Background image (visible on large screens) */}
        <div 
          className="auth-background hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/background/subscribe-2.jpg)' }}
        >
          <div className="h-full w-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-12">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Store</h2>
            <p className="text-xl mb-6 text-center">Discover the latest fashion trends and products</p>
            <div className="w-16 h-1 bg-white mb-8"></div>
            <p className="text-sm text-center opacity-80">
              Your one-stop destination for all your shopping needs
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
