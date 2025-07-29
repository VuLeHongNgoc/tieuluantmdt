// T022B - Convert filters sidebar (Giữ nguyên 95% HTML gốc)
export default function FilterSidebar() {
  return (
    <>
      {/* Categories Widget */}
      <div className="widget widget_shop_categories">
        <h3 className="widget-title">Categories</h3>
        <ul>
          <li className="current has-sub">
            <a href="#">Women's Clothing</a>
            <ul>
              <li><a href="#">Tops</a></li>
              <li><a href="#">Dress</a></li>
              <li><a href="#">Denim Jacket</a></li>
              <li><a href="#">Shoes</a></li>
            </ul>
          </li>
          <li className="has-sub">
            <a href="#">Man's Clothing</a>
            <ul>
              <li><a href="#">Tops</a></li>
              <li><a href="#">Dress</a></li>
              <li><a href="#">Denim Jacket</a></li>
              <li><a href="#">Shoes</a></li>
            </ul>
          </li>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">Tops</a></li>
          <li><a href="#">Dress</a></li>
          <li><a href="#">Denim Jacket</a></li>
          <li><a href="#">Shoes</a></li>
          <li><a href="#">Handbags</a></li>
        </ul>
      </div>
      
      {/* Color Filter Widget */}
      <div className="widget widget_colors">
        <h3 className="widget-title">Color</h3>
        <div className="ps-radio ps-radio--inline black">
          <input
            className="form-control"
            type="radio"
            id="color-1"
            name="color-filter"
          />
          <label htmlFor="color-1"></label>
        </div>
        <div className="ps-radio ps-radio--inline white">
          <input
            className="form-control"
            type="radio"
            id="color-2"
            name="color-filter"
          />
          <label htmlFor="color-2"></label>
        </div>
        <div className="ps-radio ps-radio--inline brown">
          <input
            className="form-control"
            type="radio"
            id="color-3"
            name="color-filter"
          />
          <label htmlFor="color-3"></label>
        </div>
        <div className="ps-radio ps-radio--inline gray">
          <input
            className="form-control"
            type="radio"
            id="color-4"
            name="color-filter"
          />
          <label htmlFor="color-4"></label>
        </div>
      </div>
      
      {/* Size Filter Widget */}
      <div className="widget widget_size">
        <h3 className="widget-title">Size</h3>
        <div className="form-group">
          <select className="ps-select" title="Any size">
            <option value="">Any size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
      
      {/* Price Filter Widget */}
      <div className="widget widget_filter">
        <h3 className="widget-title">Filter Price</h3>
        <div
          className="ps-slider"
          data-default-min="0"
          data-default-max="500"
          data-max="1000"
          data-step="10"
          data-unit="$"
        ></div>
        <p className="ps-slider__meta">
          Price: <span className="ps-slider__value ps-slider__min">$0</span>
          - <span className="ps-slider__value ps-slider__max">$500</span>
        </p>
        <a className="ps-btn ps-filter__btn ps-btn--fullwidth" href="#">
          FILTER
        </a>
      </div>
      
      {/* Tags Widget */}
      <div className="widget widget_tags">
        <h3 className="widget-title">Tags</h3>
        <ul>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">T-shirts</a></li>
          <li><a href="#">Top</a></li>
          <li><a href="#">Women</a></li>
          <li><a href="#">Dress</a></li>
          <li><a href="#">High-heels</a></li>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">T-shirts</a></li>
          <li><a href="#">Top</a></li>
        </ul>
      </div>
    </>
  );
}
