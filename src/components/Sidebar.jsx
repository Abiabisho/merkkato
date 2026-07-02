// ======================== SIDEBAR COMPONENT ========================
// Left sidebar that displays category filter buttons
// Users can filter products by:
// - All Products
// - Electronics
// - Clothing
// - Food & Beverage
// - Home & Living

import './Sidebar.css';

function Sidebar({ selectedCategory, onSelectCategory }) {
  // ============ AVAILABLE CATEGORIES ============
  // List of all product categories in the store
  const categories = [
    'All Products',
    'Electronics',
    'Clothing',
    'Food & Beverage',
    'Home & Living'
  ];

  return (
    <aside className="sidebar">
      {/* SIDEBAR TITLE */}
      <h3 className="sidebar-title">Categories</h3>
      
      {/* CATEGORY BUTTONS */}
      <nav className="category-list">
        {/* Loop through all categories and create buttons */}
        {categories.map((category) => (
          <button
            key={category}
            className={`category-item ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
