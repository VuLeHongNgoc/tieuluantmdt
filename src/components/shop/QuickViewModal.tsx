// T022F - Convert product quick view modal (Giữ nguyên 95% HTML gốc)
'use client';

export default function QuickViewModal() {
  return (
    <div className="ps-modal" id="quick-view">
      <div className="ps-modal__container">
        <a className="ps-modal__remove" href="#"></a>
        <div className="ps-modal__content">
          <div className="ps-product--detail bottom quick">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="ps-product__thumbnail">
                  <div className="ps-product__large">
                    <div className="ps-product__video">
                      <a
                        className="video-popup"
                        href="https://www.youtube.com/watch?v=4ZighUyrsRU"
                      >
                        <i className="exist-play"></i>
                      </a>
                    </div>
                    <div className="ps-product__images-large">
                      <div className="item">
                        <img
                          src="/images/product-creative-content/main-1.jpg"
                          alt=""
                        />
                        <a
                          className="ps-product__zoom single-image-popup"
                          href="/images/product-creative-content/main-1.jpg"
                        >
                          <i className="exist-zoom"></i>
                        </a>
                      </div>
                      <div className="item">
                        <img
                          src="/images/product-creative-content/main-1.jpg"
                          alt=""
                        />
                        <a
                          className="ps-product__zoom single-image-popup"
                          href="/images/product-creative-content/main-1.jpg"
                        >
                          <i className="exist-zoom"></i>
                        </a>
                      </div>
                      <div className="item">
                        <img
                          src="/images/product-creative-content/main-1.jpg"
                          alt=""
                        />
                        <a
                          className="ps-product__zoom single-image-popup"
                          href="/images/product-creative-content/main-1.jpg"
                        >
                          <i className="exist-zoom"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ps-product__nav">
                    <div className="item">
                      <img
                        src="/images/product-creative-content/thumbnail-1.jpg"
                        alt=""
                      />
                    </div>
                    <div className="item">
                      <img
                        src="/images/product-creative-content/thumbnail-2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="item">
                      <img
                        src="/images/product-creative-content/thumbnail-3.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="ps-product__info">
                  <div className="ps-product__meta">
                    <span>Available: <strong> In Stock</strong></span>
                    <span>SKU: <strong> N/A</strong></span>
                    <span>Categories: <a href="#"><strong>Bags</strong></a></span>
                    <span>Tags: <a href="#"><strong>Shoulder Bag</strong></a></span>
                  </div>
                  <h1 className="ps-product__title">Shoes</h1>
                  <p className="ps-product__price">
                    <del> $ 60.00</del> $ 45.00
                  </p>
                  <div className="ps-product__desc">
                    <p>
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
                    </p>
                  </div>
                  <div className="ps-product__variants">
                    <div className="ps-product__size">
                      <p><strong>Choose Size:</strong></p>
                      <select className="ps-select ps-select--small">
                        <option value="1">Size</option>
                        <option value="2">S</option>
                        <option value="3">M</option>
                        <option value="4">L</option>
                        <option value="5">XL</option>
                      </select>
                    </div>
                    <div className="ps-product__color">
                      <p><strong>Choose Color:</strong></p>
                      <div className="ps-radio ps-radio--small ps-radio--product-color red">
                        <input className="form-control" type="radio" name="type" />
                        <label></label>
                      </div>
                      <div className="ps-radio ps-radio--small ps-radio--product-color white">
                        <input className="form-control" type="radio" name="type" />
                        <label></label>
                      </div>
                      <div className="ps-radio ps-radio--small ps-radio--product-color gray">
                        <input className="form-control" type="radio" name="type" />
                        <label></label>
                      </div>
                      <div className="ps-radio ps-radio--small ps-radio--product-color black">
                        <input className="form-control" type="radio" name="type" />
                        <label></label>
                      </div>
                    </div>
                  </div>
                  <div className="ps-product__shopping">
                    <div className="ps-product__quantity">
                      <div className="def-number-input number-input safari_only">
                        <button className="minus"></button>
                        <input
                          className="quantity"
                          name="quantity"
                          defaultValue="1"
                          min="0"
                          type="number"
                        />
                        <button className="plus"></button>
                      </div>
                    </div>
                    <a className="ps-btn ps-btn--black" href="#">Add to cart</a>
                    <div className="ps-product__action">
                      <a href="#"><i className="exist-heart"></i></a>
                      <a href="#"><i className="exist-compare"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
