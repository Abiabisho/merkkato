// ======================== HEADER COMPONENT ========================
// Displays the top navigation bar with:
// - Store logo/name (left)
// - Navigation buttons (center)
// - Shopping cart icon with badge (right)

import './Header.css';

function Header({ cartCount, onCartClick, onNavClick, currentPage }) {
  return (
    <header className="header">
      <div className="header-container">
        {/* LOGO SECTION: Store name and branding */}
        <div className="header-logo">
          <h2>Merkato Store</h2>
        </div>
        
        {/* NAVIGATION: Home, Products, Contact buttons */}
        <nav className="navbar">
          {/* HOME BUTTON */}
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavClick('home')}
          >
            Home
          </button>
          
          {/* PRODUCTS BUTTON */}
          <button 
            className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
            onClick={() => onNavClick('products')}
          >
            Products
          </button>
          
          {/* CONTACT BUTTON */}
          <button 
            className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => onNavClick('contact')}
          >
            Contact
          </button>
        </nav>

        {/* CART ICON: Shopping cart with item count badge */}
        <div className="header-right">
          <button 
            className="cart-icon"
            onClick={onCartClick}
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            {/* SVG SHOPPING CART ICON */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            
            {/* CART COUNT BADGE: Only shows if cart has items */}
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
