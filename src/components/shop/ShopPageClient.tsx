'use client';

import { FilterSidebar, ProductGrid, QuickViewModal, ShopHero, SortingControls } from '@/components/shop';
import { useEffect } from 'react';

export default function ShopPageClient() {
  useEffect(() => {
    // Load jQuery plugins cho shop functionality
    const loadShopScripts = async () => {
      // Check if jQuery is loaded
      if (typeof window !== 'undefined' && (window as any).$) {
        const $ = (window as any).$;
        
        // Initialize template plugins
        if ($.fn.owlCarousel) {
          // Initialize any carousels if needed
        }
        
        if ($.fn.slider) {
          // Initialize price range slider
          $('.ps-slider').each(function(this: any) {
            const $this = $(this);
            const min = $this.data('default-min') || 0;
            const max = $this.data('default-max') || 1000;
            const step = $this.data('step') || 1;
            const unit = $this.data('unit') || '$';
            
            // Initialize slider functionality here
            // Note: This would need the actual slider plugin implementation
          });
        }
        
        // Initialize modal functionality
        $('.ps-modal-trigger').on('click', function(this: any, e: any) {
          e.preventDefault();
          const target = $(this).attr('href');
          $(target).fadeIn();
        });
        
        $('.ps-modal__remove').on('click', function(this: any, e: any) {
          e.preventDefault();
          $(this).closest('.ps-modal').fadeOut();
        });
        
        // Initialize other template functionality
        // matchHeight for product grid
        if ($.fn.matchHeight) {
          $('[data-mh="product-item"]').matchHeight();
        }
      }
    };
    
    loadShopScripts();
  }, []);

  return (
    <>
      {/* Hero Section với Breadcrumb */}
      <ShopHero />
      
      {/* Main Shop Content */}
      <main className="ps-main">
        <div className="container">
          <div className="row">
            {/* Product Grid & Sorting */}
            <div className="col-md-9 col-sm-12 col-md-push-3">
              <div className="ps-shop">
                <SortingControls />
                <ProductGrid />
              </div>
            </div>
            
            {/* Filters Sidebar */}
            <div className="col-md-3 col-sm-12 col-md-pull-9">
              <FilterSidebar />
            </div>
          </div>
        </div>
      </main>
      
      {/* Quick View Modal */}
      <QuickViewModal />
    </>
  );
}
