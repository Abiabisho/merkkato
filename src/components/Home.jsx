// ======================== HOME PAGE COMPONENT ========================
// Landing page that displays:
// - Hero section with welcome message
// - "Shop Now" button that navigates to products page
// - Product image gallery

import { useState } from 'react';
import './Home.css';

function Home({ onNavigateToProducts }) {
  // ============ FAILED IMAGES TRACKING ============
  // Keeps track of images that fail to load
  const [failedImages, setFailedImages] = useState(new Set());

  // ============ IMAGE ERROR HANDLER ============
  // Called when an image fails to load
  const handleImageError = (productId) => {
    setFailedImages(new Set(failedImages).add(productId));
  };

  return (
    <div className="home-container">
      {/* ============ HERO SECTION ============ */}
      {/* Main landing page banner with welcome message and call-to-action */}
      <section className="hero-section">
        <div className="hero-content">
          {/* TEXT CONTENT */}
          <div className="hero-text">
            <h1>Shop the Best Products</h1>
            <p>Discover thousands of products delivered across Africa and the Middle East.</p>
            {/* CALL-TO-ACTION BUTTON */}
            <button className="hero-button" onClick={onNavigateToProducts}>
              Shop Now
            </button>
          </div>
          
          {/* HERO IMAGE */}
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=400&fit=crop" 
              alt="Hero Product"
              onError={() => handleImageError('hero')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
