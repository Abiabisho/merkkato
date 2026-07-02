// ======================== SHOPPING CART COMPONENT ========================
// Displays shopping cart with:
// - List of cart items with remove buttons
// - Cart summary (subtotal, shipping, total)
// - Checkout button that opens checkout modal
// - Professional checkout modal with form validation
// - Success confirmation screen

import { useState } from 'react';
import './Cart.css';

function Cart({ items, total, onRemoveItem }) {
  // ============ CART STATE MANAGEMENT ============
  // Control checkout modal visibility
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  
  // Store checkout form data
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  // Display validation error messages
  const [checkoutMessage, setCheckoutMessage] = useState('');
  
  // Track if checkout was successful
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // ============ INPUT CHANGE HANDLER ============
  // Updates form data as user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ============ FORM VALIDATION ============
  // Validates all checkout form fields
  // Returns error message if validation fails, null if all valid
  const validateCheckoutForm = () => {
    const { firstName, lastName, email, phone, address, city, zipCode, cardNumber, expiryDate, cvv } = checkoutForm;
    
    // Personal Information Validation
    if (!firstName.trim()) return 'First name is required';
    if (!lastName.trim()) return 'Last name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Valid email is required';
    if (!phone.trim() || !/^\d{7,15}$/.test(phone.replace(/\D/g, ''))) return 'Valid phone number is required';
    
    // Shipping Address Validation
    if (!address.trim()) return 'Address is required';
    if (!city.trim()) return 'City is required';
    if (!zipCode.trim()) return 'Zip code is required';
    
    // Payment Information Validation
    if (!cardNumber.trim() || !/^\d{13,19}$/.test(cardNumber.replace(/\s/g, ''))) return 'Valid card number is required';
    if (!expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(expiryDate)) return 'Expiry date must be MM/YY';
    if (!cvv.trim() || !/^\d{3,4}$/.test(cvv)) return 'Valid CVV is required';
    
    return null;
  };

  // ============ CHECKOUT SUBMISSION ============
  // Handles form submission and validates checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Validate form
    const error = validateCheckoutForm();
    if (error) {
      setCheckoutMessage(error);
      setCheckoutSuccess(false);
      return;
    }

    // Show success state
    setCheckoutSuccess(true);
    setCheckoutMessage('✓ Order placed successfully! Your order will be delivered soon.');
    
    // Close modal and reset after 2 seconds
    setTimeout(() => {
      setShowCheckoutModal(false);
      setCheckoutForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      });
      setCheckoutMessage('');
      setCheckoutSuccess(false);
    }, 2000);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      
      {/* ============ CART CONTENT ============ */}
      {items.length > 0 ? (
        <>
          {/* CART ITEMS LIST */}
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={index} className="cart-item">
                {/* ITEM INFO */}
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-category">{item.category}</p>
                  <span className="cart-item-price">${item.price.toFixed(2)}</span>
                </div>
                {/* REMOVE BUTTON */}
                <button
                  className="remove-btn"
                  onClick={() => onRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* CART SUMMARY */}
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {/* PROCEED TO CHECKOUT BUTTON */}
            <button 
              className="checkout-btn"
              onClick={() => setShowCheckoutModal(true)}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        // EMPTY CART MESSAGE
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p className="empty-cart-hint">Add some products to get started!</p>
        </div>
      )}

      {/* ============ CHECKOUT MODAL ============ */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={() => setShowCheckoutModal(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            {/* MODAL HEADER */}
            <div className="modal-header">
              <h2>Order Summary & Checkout</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setShowCheckoutModal(false)}
              >
                ✕
              </button>
            </div>

            {/* MODAL CONTENT - Show form or success message */}
            {!checkoutSuccess ? (
              <>
                <div className="modal-content">
                  {/* ORDER SUMMARY (LEFT SIDE) */}
                  <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-items">
                      {items.map((item, index) => (
                        <div key={index} className="summary-item">
                          <span>{item.name}</span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="summary-total">
                      <strong>Total: ${total.toFixed(2)}</strong>
                    </div>
                  </div>

                  {/* CHECKOUT FORM (RIGHT SIDE) */}
                  <form onSubmit={handleCheckout} className="checkout-form">
                    {/* PERSONAL INFORMATION SECTION */}
                    <div className="form-section">
                      <h3>Personal Information</h3>
                      <div className="form-row">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={checkoutForm.firstName}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={checkoutForm.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={checkoutForm.email}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={checkoutForm.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* SHIPPING ADDRESS SECTION */}
                    <div className="form-section">
                      <h3>Shipping Address</h3>
                      <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={checkoutForm.address}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="form-row">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={checkoutForm.city}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="text"
                          name="zipCode"
                          placeholder="Zip Code"
                          value={checkoutForm.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* PAYMENT INFORMATION SECTION */}
                    <div className="form-section">
                      <h3>Payment Information</h3>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number (13-19 digits)"
                        value={checkoutForm.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="form-row">
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={checkoutForm.expiryDate}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV (3-4 digits)"
                          value={checkoutForm.cvv}
                          onChange={handleInputChange}
                          maxLength="4"
                          required
                        />
                      </div>
                    </div>

                    {/* ERROR MESSAGE */}
                    {checkoutMessage && (
                      <div className="checkout-message error">
                        {checkoutMessage}
                      </div>
                    )}

                    {/* SUBMIT BUTTON */}
                    <button type="submit" className="submit-checkout-btn">
                      Complete Purchase
                    </button>
                  </form>
                </div>
              </>
            ) : (
              // SUCCESS MESSAGE SCREEN
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Order Confirmed!</h3>
                <p>Thank you for your purchase at Merkato Store.</p>
                <p className="confirmation-details">Your order will be delivered within 3-5 business days.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
