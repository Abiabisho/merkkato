// ======================== PRODUCT CARD COMPONENT ========================
// Displays a single product card with:
// - Product image
// - Product name, category, description
// - Price and "Add to Cart" button
// - Image loading/error handling

import { useState } from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, onImageError }) {
  // Track if product image has loaded successfully
  const [imageLoaded, setImageLoaded] = useState(false);

  // ============ IMAGE LOAD HANDLER ============
  // Called when image loads successfully
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // ============ IMAGE ERROR HANDLER ============
  // Called when image fails to load
  // Notifies parent component so product can be hidden
  const handleImageError = () => {
    onImageError(product.id);
  };

  // ============ LOADING STATE ============
  // While image is loading, show empty card placeholder
  if (!imageLoaded && !product.imageError) {
    return (
      <div className="product-card">
        <div className="product-image">
          <img 
            src={product.image} 
            alt={product.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    );
  }

  // ============ ERROR STATE ============
  // If image failed to load, don't display the product
  if (product.imageError) {
    return null;
  }

  // ============ PRODUCT DISPLAY ============
  return (
    <div className="product-card">
      {/* PRODUCT IMAGE */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      
      {/* PRODUCT INFORMATION */}
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-description">{product.description}</p>
        
        {/* PRICE AND ADD TO CART BUTTON */}
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
