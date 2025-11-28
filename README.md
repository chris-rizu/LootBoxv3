# LootBox - Premium PC Parts & Peripherals

![LootBox Banner](https://img.shields.io/badge/LootBox-E--Commerce-6366f1?style=for-the-badge&logo=shopify&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

A modern, feature-rich e-commerce website for PC components and gaming peripherals. Built with vanilla HTML, CSS, and JavaScript, featuring a sleek dark theme with gold and indigo accents, an interactive shopping cart, smooth animations, and Philippine Peso pricing.

## Features

### Shopping Experience
- **Full Cart Functionality** - Add, remove, and adjust quantities with localStorage persistence
- **Mini Cart Preview** - Hover over cart icon to see items without leaving the page
- **Quick View Modal** - Preview product details without navigating away
- **Wishlist System** - Save favorite products for later
- **Toast Notifications** - Visual feedback for all cart actions
- **Sound Effects** - Optional audio feedback (toggleable)

### Visual Design
- **Modern Dark Theme** - Sleek dark blue-gray design with gold and indigo accents
- **Animated Hero Section** - Flowing vertical lines, scanning effects, and corner bracket decorations
- **Smooth Scroll Animations** - Elements animate into view using Intersection Observer
- **Product Card Effects** - Hover animations, badges, and image overlays
- **Gradient Text & Glowing Effects** - Premium visual styling throughout
- **Glass-morphism Cards** - Modern frosted glass effect on info cards

### User Experience
- **Fully Responsive** - Mobile-first design that works on all devices
- **Sticky Navigation** - Header stays visible while scrolling
- **Interactive About Section** - Stats counters, leadership profile, mission & vision statements
- **Accessible Design** - ARIA labels, keyboard navigation, and reduced motion support

### Product Catalog
- **7 Featured Products** - Curated showcase on homepage
- **8 PC Components** - CPUs, GPUs, RAM, SSDs, motherboards, PSUs, cases, coolers
- **8 Gaming Peripherals** - Keyboards, mice, headsets, monitors, mousepads, webcams, speakers
- **Philippine Peso Pricing** - All prices displayed in PHP

## Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup and structure |
| **CSS3** | Custom styling, animations, and keyframes |
| **Tailwind CSS** | Utility-first CSS framework (via CDN) |
| **JavaScript (ES6+)** | Cart functionality, animations, and interactivity |
| **Google Fonts** | Poppins typeface |
| **LocalStorage API** | Cart data persistence |
| **Intersection Observer API** | Scroll-triggered animations |
| **Web Audio API** | Optional sound effects |

## File Structure

```
LootBox-SoftDev/
├── index.html          # Main landing page with product catalog
├── cart.html           # Shopping cart page
├── script.js           # Additional JavaScript (if any)
├── styles.css          # Additional styles (if any)
└── README.md           # Project documentation
```

### Page Descriptions

- **`index.html`** - The main storefront featuring:
  - Hero section with animated flowing lines and corner bracket decorations
  - Featured products showcase (7 products with scroll animations)
  - PC Components section (8 products)
  - Gaming Peripherals section (8 products)
  - About Us section with company story, mission & vision, leadership profile
  - "Why Choose LootBox" value propositions
  - Contact form
  - Sticky navigation with mobile menu
  - Mini cart preview on hover
  - Quick view modal for products

- **`cart.html`** - Shopping cart page with:
  - Cart items display with product images
  - Quantity adjustment controls (+/-)
  - Remove item functionality with undo option
  - Order summary with subtotal/total
  - Clear cart option
  - Mobile-friendly sticky checkout bar
  - Sound effects toggle
  - Confetti celebration on checkout

## Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or build tools required

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/LootBox-SoftDev.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd LootBox-SoftDev
   ```

3. **Open in browser**
   - Simply double-click `index.html`, or
   - Use a local server like Live Server (VS Code extension)
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

4. **Start shopping**

## Usage Guide

1. **Browse Products** - Navigate using the top menu or scroll through sections
2. **Add to Cart** - Click "Add to Cart" on any product
3. **View Cart** - Click the cart icon in the navigation bar
4. **Adjust Quantities** - Use +/- buttons in the cart
5. **Remove Items** - Click the X button on any cart item
6. **Clear Cart** - Use the "Clear Cart" button to empty everything

## Key Functionality

### Cart System
```javascript
// Cart persists across browser sessions using localStorage
localStorage.getItem('lootbox_cart')

// Add items with full product details
cart.addItem({ name, price, image, quantity })

// Real-time cart count and total updates
cart.getItemCount() / cart.getTotal()
```

### Scroll Animations
- Elements use CSS classes like `scroll-animate`, `scroll-card`, `scroll-fade-up`
- Intersection Observer triggers animations when elements enter viewport
- Respects `prefers-reduced-motion` for accessibility

### Interactive Elements
- Product cards with hover lift and glow effects
- Wishlist hearts with toggle animation
- Stats counters that animate when scrolling to About section
- Toast notifications with progress bars

## About Us Section

The About Us page features:
- **Company Introduction** - Welcome message and location (Philippines)
- **Stats Cards** - 500+ Products, 10K+ Customers, 5 Years Trusted, 4.9 Rating
- **Our Story** - Founding story and company background
- **What We Do** - Products and services overview
- **Mission Statement** - Current focus and goals
- **Vision Statement** - Future aspirations
- **Why Choose LootBox** - 100% Genuine Products, Fast Delivery, Warranty Included
- **Leadership Section** - CEO profile with social media links
- **Call to Action** - Browse products and learn more buttons

## Future Enhancements

- [ ] **Backend Integration** - Node.js/Express or PHP backend
- [ ] **Database** - MySQL/PostgreSQL for product & order management
- [ ] **User Authentication** - Login/Register functionality
- [ ] **Payment Gateway** - PayMongo, GCash, Maya integration
- [ ] **Search & Filters** - Product search and category filters
- [ ] **Order Tracking** - Track order status
- [ ] **Admin Dashboard** - Inventory and order management
- [ ] **Reviews & Ratings** - Customer product reviews
- [ ] **Email Notifications** - Order confirmation emails

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 LootBox

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

## Author

**Chris Paolo Caral**

- Facebook: [chrispaolo.caral.5](https://www.facebook.com/chrispaolo.caral.5)
- Email: cchrispaolo@gmail.com

---

<p align="center">
  Made for PC enthusiasts everywhere
  <br>
  <strong>LootBox</strong> - Your Source for Premium PC Hardware
</p>

