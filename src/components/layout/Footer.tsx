'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

interface FooterProps {
  socialLinks?: SocialLink[];
  showBackToTop?: boolean;
}

export default function Footer({ 
  socialLinks = [
    { platform: 'facebook', url: '#', icon: 'fa-facebook', label: 'Facebook' },
    { platform: 'twitter', url: '#', icon: 'fa-twitter', label: 'Twitter' },
    { platform: 'instagram', url: '#', icon: 'fa-instagram', label: 'Instagram' }
  ],
  showBackToTop = true 
}: FooterProps) {
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTopButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navigationLinks = [
    { href: '/policy', label: 'Chính sách' },
    { href: '/terms', label: 'Điều khoản' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQs' },
    { href: '/support', label: 'Hỗ trợ' }
  ];

  return (
    <>
      <footer className="ps-footer--1 ps-footer--white bg-white border-t border-gray-200 py-8">
        <div className="ps-container-fluid max-w-7xl mx-auto px-4">
          <div className="row grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Navigation Links */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <ul className="ps-footer__nav flex flex-wrap items-center justify-center lg:justify-start space-x-6">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <ul className="ps-footer__social flex items-center justify-center lg:justify-end space-x-4">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a 
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                      aria-label={`Follow us on ${social.label}`}
                    >
                      <i className={`fa ${social.icon}`}></i>
                      <span className="hidden sm:inline">{social.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional Footer Content */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Company Info */}
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-gray-900 mb-3">Về chúng tôi</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Website thương mại điện tử cung cấp các sản phẩm thời trang chất lượng cao với giá cả hợp lý.
                </p>
              </div>

              {/* Quick Links */}
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-gray-900 mb-3">Liên kết nhanh</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/shop" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      Sản phẩm
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      Liên hệ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-gray-900 mb-3">Liên hệ</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center justify-center md:justify-start">
                    <i className="fa fa-envelope mr-2"></i>
                    contact@example.com
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <i className="fa fa-phone mr-2"></i>
                    +84 123 456 789
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <i className="fa fa-map-marker mr-2"></i>
                    Hà Nội, Việt Nam
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Website Thương Mại Điện Tử. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && showBackToTopButton && (
        <button
          id="back2top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 z-50 group"
          aria-label="Back to top"
        >
          <span className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Go to top
          </span>
          <i className="fa fa-arrow-up"></i>
        </button>
      )}
    </>
  );
}
