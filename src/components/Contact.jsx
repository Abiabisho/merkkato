// ======================== CONTACT FORM COMPONENT ========================
// Contact page with a form that includes:
// - Full name input (required)
// - Email input (required, with email validation)
// - Phone number input (optional, 7-15 digits accepted)
// - Inquiry type dropdown (required)
// - Message textarea (required, min 10 characters)
// - Form validation with error messages
// - Success confirmation message

import { useState } from 'react';
import './Contact.css';

function Contact() {
  // ============ FORM STATE MANAGEMENT ============
  // Store all form field values
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  // Store form validation errors
  const [errors, setErrors] = useState({});

  // Track if form was successfully submitted
  const [submitted, setSubmitted] = useState(false);

  // ============ INQUIRY TYPES ============
  // Options available in the inquiry type dropdown
  const inquiryTypes = [
    'General Inquiry',
    'Order Status',
    'Product Question',
    'Complaint',
    'Suggestion',
    'Other',
    'Product feedback'
  ];

  // ============ FORM VALIDATION ============
  // Validates all form fields before submission
  // Returns true if valid, false if errors exist
  const validateForm = () => {
    let newErrors = {};

    // FULL NAME VALIDATION
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    // EMAIL VALIDATION
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // PHONE VALIDATION (optional but if provided, must have 7-15 digits)
    // Accepts any country code format: +251, +1, +44, etc.
    if (formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        newErrors.phone = 'Phone number must contain between 7-15 digits.';
      }
    }

    // INQUIRY TYPE VALIDATION
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type.';
    }

    // MESSAGE VALIDATION (minimum 10 characters)
    if (!formData.message.trim()) {
      newErrors.message = 'Message must be at least 10 characters.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============ INPUT CHANGE HANDLER ============
  // Updates form data as user types
  // Clears error for that field when user corrects it
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // ============ FORM SUBMISSION HANDLER ============
  // Validates form and shows success message
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          inquiryType: '',
          message: ''
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        {/* PAGE TITLE */}
        <h1 className="contact-title">Contact Merkato Store</h1>
        <p className="contact-subtitle">Have a question or need help with your order? Fill in the form below.</p>

        {/* SUCCESS MESSAGE (shown after submission) */}
        {submitted && (
          <div className="success-message">
            ✓ Thank you! Your message has been sent successfully.
          </div>
        )}

        {/* CONTACT FORM */}
        <form onSubmit={handleSubmit} className="contact-form">
          {/* FULL NAME FIELD */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`form-input ${errors.fullName ? 'error' : ''}`}
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

          {/* EMAIL FIELD */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* PHONE NUMBER FIELD (Optional) */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+XXX XXX XXX XXXX "
              className={`form-input ${errors.phone ? 'error' : ''}`}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
            <span className="help-text">Accept any country code (7-15 digits)</span>
          </div>

          {/* INQUIRY TYPE DROPDOWN */}
          <div className="form-group">
            <label htmlFor="inquiryType" className="form-label">
              Inquiry Type <span className="required">*</span>
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className={`form-select ${errors.inquiryType ? 'error' : ''}`}
            >
              <option value="">-- Select an option --</option>
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.inquiryType && (
              <span className="error-message">{errors.inquiryType}</span>
            )}
          </div>

          {/* MESSAGE FIELD */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your inquiry in detail..."
              rows="6"
              className={`form-textarea ${errors.message ? 'error' : ''}`}
            ></textarea>
            {errors.message && (
              <span className="error-message">{errors.message}</span>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
