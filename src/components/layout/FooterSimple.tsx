'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

interface FooterSimpleProps {
  socialLinks?: SocialLink[];
  showBackToTop?: boolean;
}

export function FooterSimple({ 
  socialLinks = [
    { platform: 'facebook', url: '#', icon: 'fa-facebook', label: 'facebook' },
    { platform: 'twitter', url: '#', icon: 'fa-twitter', label: 'twitter' },
    { platform: 'instagram', url: '#', icon: 'fa-instagram', label: 'instagram' }
  ],
  showBackToTop = true 
}: FooterSimpleProps) {
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
    { href: '/policy', label: 'Policy' },
    { href: '/terms', label: 'Terms' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQs' },
    { href: '/support', label: 'Support' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="ps-footer--1">
        <div className="ps-container-fluid">
          <div className="row">
            {/* Copyright */}
            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
              <div className="ps-footer__copyright">
                <p>Copyright &copy; {currentYear} Exists Theme</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <ul className="ps-footer__nav">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
              <ul className="ps-footer__social">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <Link href={social.url}>
                      <i className={`fa ${social.icon}`}></i>
                      {social.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && showBackToTopButton && (
        <div id="back2top" onClick={scrollToTop}>
          Go to top<i className="exist-rightarrow"></i>
        </div>
      )}
    </>
  );
}
