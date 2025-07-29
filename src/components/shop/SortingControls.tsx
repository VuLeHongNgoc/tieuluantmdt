// T022C - Convert sorting dropdown (Giữ nguyên 95% HTML gốc)
export default function SortingControls() {
  return (
    <div className="ps-filter ps-filter--shop-sidebar">
      <div className="ps-filter__left">
        <p>Showing 1–18 of 278 results</p>
      </div>
      <div className="ps-filter__right">
        <select className="ps-select" title="5 Columns">
          <option value="1">5 COLUMNS</option>
          <option value="2">4 COLUMNS</option>
          <option value="3">3 COLUMNS</option>
          <option value="4">2 COLUMNS</option>
        </select>
        <select className="ps-select" title="Filter">
          <option value="1">FILTER</option>
          <option value="2">Price: Low to High</option>
          <option value="3">Price: High to Low</option>
          <option value="4">Name: A to Z</option>
          <option value="5">Name: Z to A</option>
          <option value="6">Newest First</option>
        </select>
      </div>
    </div>
  );
}
