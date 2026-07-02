# E-Commerce Store - React Application

A modern e-commerce website built with React, featuring product browsing, category filtering, and shopping cart functionality.

## Features

- **Product Catalog**: Browse a variety of products across multiple categories
- **Category Filtering**: Filter products by Electronics, Clothing, Food & Beverage, and Home & Living
- **Search Functionality**: Search for products by name
- **Shopping Cart**: Add products to cart and manage items
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Cart Management**: View cart total, remove items, and proceed to checkout

## Project Structure

```
src/
├── App.jsx                 # Main app component
├── App.css                 # App styling
├── components/
│   ├── Header.jsx         # Navigation header with cart icon
│   ├── Header.css         # Header styling
│   ├── Sidebar.jsx        # Category sidebar
│   ├── Sidebar.css        # Sidebar styling
│   ├── ProductGrid.jsx    # Product listing grid
│   ├── ProductGrid.css    # Product grid styling
│   ├── ProductCard.jsx    # Individual product card
│   ├── ProductCard.css    # Product card styling
│   ├── Cart.jsx           # Shopping cart view
│   └── Cart.css           # Cart styling
├── main.jsx               # React entry point
└── index.html             # HTML template
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
```bash
cd "c:\Users\biniyata\Desktop\react project\my-react-app"
```

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

Start the development server with hot module replacement:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Technologies Used

- **React 18.2.0** - UI library
- **Vite 4.3.0** - Build tool and dev server
- **CSS3** - Styling (no external CSS frameworks)

## Features Overview

### Header Component
- Navigation menu (Home, Products, Contact)
- Shopping cart icon with item count
- Sticky positioning for easy access

### Sidebar Component
- Category navigation
- Active category highlighting
- Filter products by category

### Product Grid
- Search bar for product search
- Responsive grid layout
- Placeholder images for products

### Product Card
- Product image, name, and description
- Category and price display
- "Add to Cart" button
- Hover effects and animations

### Shopping Cart
- View all cart items
- Remove individual items
- Calculate and display totals
- Checkout button (ready for integration)
- Empty cart state message

## Customization

### Adding Products

Edit the `products` array in `App.jsx` to add more products:

```jsx
{
  id: 9,
  name: 'Product Name',
  category: 'Category Name',
  price: 99.99,
  description: 'Product description',
  image: 'image-url'
}
```

### Styling

All styling is done with CSS files in the `src/components` directory. Modify the `.css` files to customize the appearance.

### Color Scheme

- Primary Color: `#1e3a5f` (Dark Blue)
- Accent Color: `#ff9500` (Orange)
- Error Color: `#ff6b6b` (Red)
- Background: `#f5f5f5` (Light Gray)

## Future Enhancements

- Product detail pages
- User authentication
- Payment integration
- Order history
- Product ratings and reviews
- Wishlist functionality
- Product filtering by price range

## License

This project is open source and available for personal and educational use.

## Support

For issues or questions, please refer to the React and Vite documentation:
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
