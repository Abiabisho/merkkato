// ======================== APP MAIN COMPONENT ========================
// This is the root component that manages:
// - Shopping cart state and items
// - Product filtering by category
// - Page navigation (Home, Products, Contact)
// - Cart display toggle
// - Product search functionality

import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Contact from './components/Contact';
import Home from './components/Home';

function App() {
  // ============ STATE MANAGEMENT ============
  // State Hook: manages all cart items added by user
  const [cart, setCart] = useState([]);

  // State Hook: tracks selected category for filtering products
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  // State Hook: toggles between showing products or shopping cart
  const [showCart, setShowCart] = useState(false);

  // State Hook: stores user's product search query
  const [searchQuery, setSearchQuery] = useState('');

  // State Hook: tracks current page (home, products, contact)
  const [currentPage, setCurrentPage] = useState('home');

  // ============ PRODUCTS DATA ============
  // Array of all available products in the store
  // Each product has: id, name, category, price, description, image URL
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 45.00,
      description: '20-hour battery, noise cancellation',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
    },

    {
      id: 8,
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: 65.00,
      description: 'Portable, 12-hour battery',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop'
    },
    {
      id: 9,
      name: 'Running Shoes',
      category: 'Clothing',
      price: 85.00,
      description: 'Comfortable athletic footwear',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop'
    },
    {
      id: 11,
      name: 'Smartwatch',
      category: 'Electronics',
      price: 199.99,
      description: 'Fitness tracking smartwatch',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
    },
    {
      id: 13,
      name: 'Yoga Mat',
      category: 'Home & Living',
      price: 45.00,
      description: 'Non-slip yoga exercise mat',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop'
    },
    {
      id: 14,
      name: 'Portable Phone Charger',
      category: 'Electronics',
      price: 25.00,
      description: '20000mAh power bank',
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop'
    },
    {
      id: 15,
      name: 'Sunglasses',
      category: 'Clothing',
      price: 55.00,
      description: 'UV protection sunglasses',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop'
    },
    {
      id: 17,
      name: 'Camera',
      category: 'Electronics',
      price: 599.99,
      description: 'Professional DSLR camera',
      image: 'https://images.unsplash.com/photo-1606933248051-5ce7b0f91ab5?w=300&h=300&fit=crop'
    },
    {
      id: 18,
      name: 'Backpack',
      category: 'Clothing',
      price: 75.00,
      description: 'Durable travel backpack',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop'
    },
    {
      id: 19,
      name: 'Desk Organizer',
      category: 'Home & Living',
      price: 30.00,
      description: 'Wooden desk organizer set',
      image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=300&h=300&fit=crop'
    },
    {
      id: 20,
      name: 'Water Bottle',
      category: 'Home & Living',
      price: 28.00,
      description: 'Insulated stainless steel bottle',
      image: 'https://images.unsplash.com/photo-1602143407151-7d406dc88d7d?w=300&h=300&fit=crop'
    }
  ];

  // ============ FILTER PRODUCTS ============
  // Filters products based on:
  // 1. Selected category (or "All Products" to show all)
  // 2. Search query (matches product name)
  // Returns only products that match BOTH criteria
  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // ============ NOTIFICATION STATE ============
  // Manages temporary notifications (success/warning messages)
  // Example: "Product added to cart!" or "Product already in cart!"
  const [notification, setNotification] = useState(null);

  // ============ ADD TO CART FUNCTION ============
  // Handles adding products to the shopping cart
  // Features:
  // - Checks if product already exists (prevents duplicates)
  // - Shows warning if duplicate
  // - Shows success message if new product added
  // - Auto-dismisses notification after 3 seconds
  const addToCart = (product) => {
    // Check if product already exists in cart
    const productExists = cart.some(item => item.id === product.id);

    if (productExists) {
      // Show warning notification
      setNotification({
        type: 'warning',
        message: `${product.name} is already in your cart!`
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Add product to cart (only once)
    setCart([...cart, product]);

    // Show success notification
    setNotification({
      type: 'success',
      message: `${product.name} added to cart!`
    });
    setTimeout(() => setNotification(null), 3000);
  };

  // ============ REMOVE FROM CART FUNCTION ============
  // Removes a product from cart by its index
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // ============ CALCULATE CART TOTAL ============
  // Sums up prices of all items in the cart
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // ============ COMPONENT RENDER ============
  return (
    <div className="app">
      {/* Display notification if one exists */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <p>{notification.message}</p>
        </div>
      )}

      {/* HEADER: Navigation bar with cart icon */}
      <Header
        cartCount={cart.length}
        onCartClick={() => {
          // Smart cart navigation:
          // - If not on products page: go to products page and show cart
          // - If on products page: toggle cart on/off
          if (currentPage !== 'products') {
            setCurrentPage('products');
            setShowCart(true);
          } else {
            setShowCart(!showCart);
          }
        }}
        onNavClick={(page) => {
          setCurrentPage(page);
          setShowCart(false);
        }}
        currentPage={currentPage}
      />

      {/* PAGE ROUTING: Show different content based on current page */}
      {currentPage === 'contact' ? (
        <Contact />
      ) : currentPage === 'home' ? (
        <Home onNavigateToProducts={() => setCurrentPage('products')} />
      ) : (
        // PRODUCTS PAGE: Shows sidebar, search, and products grid OR cart
        <div className="main-content">
          <div className="left-section">
            {/* SIDEBAR: Category filter buttons */}
            <Sidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <div className="center-section">
            {/* Show products grid or cart based on showCart state */}
            {!showCart ? (
              <ProductGrid
                products={filteredProducts}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAddToCart={addToCart}
              />
            ) : (
              <Cart
                items={cart}
                total={cartTotal}
                onRemoveItem={removeFromCart}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
