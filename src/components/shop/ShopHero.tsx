// T022E - Convert breadcrumb navigation (Giữ nguyên 95% HTML gốc)
'use client';

import { useEffect } from 'react';

export default function ShopHero() {
  useEffect(() => {
    // Set background image như template gốc
    const heroElement = document.querySelector('[data-background]') as HTMLElement;
    if (heroElement) {
      const bgImage = heroElement.getAttribute('data-background');
      if (bgImage) {
        heroElement.style.backgroundImage = `url(${bgImage})`;
      }
    }
  }, []);

  return (
    <div className="ps-hero bg--cover" data-background="/images/hero/shop-1.jpg">
      <div className="container">
        <h2 className="ps-hero__heading">The Shop</h2>
        <div className="ps-breadcrumb">
          <ol className="breadcrumb">
            <li><a href="/">Home</a></li>
            <li className="active">Shop</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
