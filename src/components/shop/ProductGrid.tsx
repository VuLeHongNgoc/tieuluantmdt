// T022A - Convert product grid layout (Giữ nguyên 95% HTML gốc, 3 columns per row)
export default function ProductGrid() {
  return (
    <>
      <div className="row">
        {/* Row 1 */}
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="ps-product--1" data-mh="product-item">
            <div className="ps-product__thumbnail">
              <div className="ps-badge ps-badge--hot"><span>hot</span></div>
              <div className="ps-badge ps-badge--sale-off ps-badge--2nd">
                <span>-25%</span>
              </div>
              <img src="/images/product/home-1/1.jpg" alt="" />
              <a className="ps-btn ps-product__shopping" href="#">
                <i className="exist-minicart"></i>Add to cart
              </a>
              <ul className="ps-product__actions">
                <li>
                  <a href="#" data-label="Favorite">
                    <i className="exist-heart"></i>
                  </a>
                </li>
                <li>
                  <a href="#" data-label="Compare">
                    <i className="exist-compare"></i>
                  </a>
                </li>
                <li>
                  <a className="ps-modal-trigger" href="#quick-view" data-label="Quick View">
                    <i className="exist-quickview"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="ps-product__content">
              <a className="ps-product__title" href="/product/1">
                T-shirt with slogan
              </a>
              <span className="ps-product__price">$5250.00</span>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="ps-product--1" data-mh="product-item">
            <div className="ps-product__thumbnail">
              <img src="/images/product/home-1/2.jpg" alt="" />
              <a className="ps-btn ps-product__shopping" href="#">
                <i className="exist-minicart"></i>Add to cart
              </a>
              <ul className="ps-product__actions">
                <li>
                  <a href="#" data-label="Favorite">
                    <i className="exist-heart"></i>
                  </a>
                </li>
                <li>
                  <a href="#" data-label="Compare">
                    <i className="exist-compare"></i>
                  </a>
                </li>
                <li>
                  <a className="ps-modal-trigger" href="#quick-view" data-label="Quick View">
                    <i className="exist-quickview"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="ps-product__content">
              <a className="ps-product__title" href="/product/2">
                White crossbody bag
              </a>
              <span className="ps-product__price">$1250.00</span>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="ps-product--1" data-mh="product-item">
            <div className="ps-product__thumbnail">
              <div className="ps-badge ps-badge--new"><span>New</span></div>
              <img src="/images/product/home-1/3.jpg" alt="" />
              <a className="ps-btn ps-product__shopping" href="#">
                <i className="exist-minicart"></i>Add to cart
              </a>
              <ul className="ps-product__actions">
                <li>
                  <a href="#" data-label="Favorite">
                    <i className="exist-heart"></i>
                  </a>
                </li>
                <li>
                  <a href="#" data-label="Compare">
                    <i className="exist-compare"></i>
                  </a>
                </li>
                <li>
                  <a className="ps-modal-trigger" href="#quick-view" data-label="Quick View">
                    <i className="exist-quickview"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="ps-product__content">
              <a className="ps-product__title" href="/product/3">
                Velvet backpack
              </a>
              <span className="ps-product__price">$5250.00</span>
            </div>
          </div>
        </div>
        
        {/* Row 2 */}
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="ps-product--1" data-mh="product-item">
            <div className="ps-product__thumbnail">
              <div className="ps-badge ps-badge--new"><span>New</span></div>
              <div className="ps-badge ps-badge--sale-off ps-badge--2nd">
                <span>-25%</span>
              </div>
              <img src="/images/product/home-1/4.jpg" alt="" />
              <a className="ps-btn ps-product__shopping" href="#">
                <i className="exist-minicart"></i>Add to cart
              </a>
              <ul className="ps-product__actions">
                <li>
                  <a href="#" data-label="Favorite">
                    <i className="exist-heart"></i>
                  </a>
                </li>
                <li>
                  <a href="#" data-label="Compare">
                    <i className="exist-compare"></i>
                  </a>
                </li>
                <li>
                  <a className="ps-modal-trigger" href="#quick-view" data-label="Quick View">
                    <i className="exist-quickview"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="ps-product__content">
              <a className="ps-product__title" href="/product/4">
                Square cream sunglasses
              </a>
              <span className="ps-product__price">
                $5250.00 <del>$725.00</del>
              </span>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="ps-product--1" data-mh="product-item">
            <div className="ps-product__thumbnail">
              <img src="/images/product/home-1/5.jpg" alt="" />
              <a className="ps-btn ps-product__shopping" href="#">
                <i className="exist-minicart"></i>Add to cart
              </a>
              <ul className="ps-product__actions">
                <li>
                  <a href="#" data-label="Favorite">
                    <i className="exist-heart"></i>
                  </a>
                </li>
                <li>
                  <a href="#" data-label="Compare">
                    <i className="exist-compare"></i>
                  </a>
                </li>
                <li>
                  <a className="ps-modal-trigger" href="#quick-view" data-label="Quick View">
                    <i className="exist-quickview"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="ps-product__content">
              <a className="ps-product__title" href="/product/5">
                Shirt Regular fit
              </a>
              <span className="ps-product__price">
                $95.00 <del>$725.00</del>
              </span>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="ps-product--1" data-mh="product-item">
            <div className="ps-product__thumbnail">
              <img src="/images/product/home-1/6.jpg" alt="" />
              <a className="ps-btn ps-product__shopping" href="#">
                <i className="exist-minicart"></i>Add to cart
              </a>
              <ul className="ps-product__actions">
                <li>
                  <a href="#" data-label="Favorite">
                    <i className="exist-heart"></i>
                  </a>
                </li>
                <li>
                  <a href="#" data-label="Compare">
                    <i className="exist-compare"></i>
                  </a>
                </li>
                <li>
                  <a className="ps-modal-trigger" href="#quick-view" data-label="Quick View">
                    <i className="exist-quickview"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="ps-product__content">
              <a className="ps-product__title" href="/product/6">
                T-shirt with slogan
              </a>
              <span className="ps-product__price">
                $1250.00 <del>$725.00</del>
              </span>
            </div>
          </div>
        </div>
        
        {/* Row 3 */}
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="ps-product--1" data-mh="product-item">
            <div className="ps-product__thumbnail">
              <img src="/images/product/home-1/7.jpg" alt="" />
              <a className="ps-btn ps-product__shopping" href="#">
                <i className="exist-minicart"></i>Add to cart
              </a>
              <ul className="ps-product__actions">
                <li>
                  <a href="#" data-label="Favorite">
                    <i className="exist-heart"></i>
                  </a>
                </li>
                <li>
                  <a href="#" data-label="Compare">
                    <i className="exist-compare"></i>
                  </a>
                </li>
                <li>
                  <a className="ps-modal-trigger" href="#quick-view" data-label="Quick View">
                    <i className="exist-quickview"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="ps-product__content">
              <a className="ps-product__title" href="/product/7">
                Leather brown belt
              </a>
              <span className="ps-product__price">$350.00</span>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="ps-product--1" data-mh="product-item">
            <div className="ps-product__thumbnail">
              <div className="ps-badge ps-badge--new"><span>New</span></div>
              <img src="/images/product/home-1/8.jpg" alt="" />
              <a className="ps-btn ps-product__shopping" href="#">
                <i className="exist-minicart"></i>Add to cart
              </a>
              <ul className="ps-product__actions">
                <li>
                  <a href="#" data-label="Favorite">
                    <i className="exist-heart"></i>
                  </a>
                </li>
                <li>
                  <a href="#" data-label="Compare">
                    <i className="exist-compare"></i>
                  </a>
                </li>
                <li>
                  <a className="ps-modal-trigger" href="#quick-view" data-label="Quick View">
                    <i className="exist-quickview"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="ps-product__content">
              <a className="ps-product__title" href="/product/8">
                Denim shorts
              </a>
              <span className="ps-product__price">$5250.00</span>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="ps-product--1" data-mh="product-item">
            <div className="ps-product__thumbnail">
              <img src="/images/product/home-1/9.jpg" alt="" />
              <a className="ps-btn ps-product__shopping" href="#">
                <i className="exist-minicart"></i>Add to cart
              </a>
              <ul className="ps-product__actions">
                <li>
                  <a href="#" data-label="Favorite">
                    <i className="exist-heart"></i>
                  </a>
                </li>
                <li>
                  <a href="#" data-label="Compare">
                    <i className="exist-compare"></i>
                  </a>
                </li>
                <li>
                  <a className="ps-modal-trigger" href="#quick-view" data-label="Quick View">
                    <i className="exist-quickview"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="ps-product__content">
              <a className="ps-product__title" href="/product/9">
                Square cream sunglasses
              </a>
              <span className="ps-product__price">$5250.00</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* T022D - Load More Button (Pagination) */}
      <div className="ps-shop__morelink text-center mt-30">
        <a className="ps-btn ps-btn--black" href="#">Load more</a>
      </div>
    </>
  );
}
