// ======================== PRODUCT GRID COMPONENT ========================
// Displays:
// - Search bar for filtering products
// - Grid of product cards
// - Handles failed image loading
// - Shows "No products found" message if needed

import { useState } from 'react';
import './ProductGrid.css';
import ProductCard from './ProductCard';

function ProductGrid({ products, searchQuery, onSearchChange, onAddToCart }) {
  // ============ FAILED IMAGES TRACKING ============
  // Keeps track of products with failed image loads
  // These products won't be displayed
  const [failedImages, setFailedImages] = useState(new Set());

  // ============ IMAGE ERROR HANDLER ============
  // Called when a product image fails to load
  // Adds product ID to failed images set
  const handleImageError = (productId) => {
    setFailedImages(new Set(failedImages).add(productId));
  };

  // ============ FILTER PRODUCTS ============
  // Remove products with failed images from display
  const visibleProducts = products.filter(p => !failedImages.has(p.id));

  return (
    <div className="product-grid-container">
      {/* SEARCH BAR */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      {/* PRODUCT GRID OR EMPTY MESSAGE */}
      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {/* Loop through visible products and create cards */}
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onImageError={handleImageError}
            />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
