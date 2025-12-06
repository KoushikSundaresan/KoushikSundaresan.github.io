Seasells — Handmade Trinkets E-commerce Site
============================================

A modern, static website for selling handmade bracelets and trinkets.
Works locally (file:// protocol) - no server required!


PROJECT STRUCTURE
-----------------
Seasells/
├── index.html              # Main homepage with product grid
├── main.css               # Main stylesheet (colors, layout, carousel)
├── ui.css                 # Component styles (forms, buttons, etc.)
├── animations.css         # Animation keyframes
├── app.js                # Product data and grid rendering
├── email.js              # Email order functionality
├── assets/
│   ├── logo.png          # Logo image (circular display)
│   └── favicon.svg       # Circular favicon for browser tabs
├── pages/
│   ├── about.html        # About page with stats & mini-game
│   ├── contact.html      # Contact info & color matching game
│   └── faq.html          # FAQ with accordion & quiz
├── products/
│   └── [product-id]/     # Each product has its own folder
│       ├── 1.jpg         # Product images (4 images per product)
│       ├── 2.jpg
│       ├── 3.jpg
│       ├── 4.jpg
│       └── index.html    # Product detail page with carousel
└── components/           # Reusable HTML components (optional)


HOW TO ADD A NEW PRODUCT
------------------------
1. Create a product folder:
   products/003/  (use 3-digit ID, e.g., 001, 002, 003...)

2. Add 4 product images (JPG format):
   - 1.jpg  (main image - shown on homepage grid)
   - 2.jpg
   - 3.jpg
   - 4.jpg
   
   All images should be named exactly: 1.jpg, 2.jpg, 3.jpg, 4.jpg

3. Copy product template:
   - Copy products/001/index.html to products/003/index.html
   - Update the product title, description, price, and category
   - The carousel will automatically use 1.jpg, 2.jpg, 3.jpg, 4.jpg

4. Add product to app.js:
   Open app.js and add a new entry to the productsData array:
   
   {
     "id": "003",
     "name": "Your Product Name",
     "image": "1.jpg",
     "price": "30 AED",
     "category": "Bracelet",
     "desc": "Product description here."
   }

5. Update product page content:
   - Edit products/003/index.html
   - Change the <title>, <h2>, price, description, and form product name
   - The carousel images array is already set to use 1.jpg-4.jpg


PRODUCT PAGE TEMPLATE (products/001/index.html)
------------------------------------------------
- Image carousel with 4 images (navigate with arrows, dots, or keyboard)
- Product details (name, category, price, description)
- Order form (name, phone, notes)
- Email order functionality

The carousel automatically handles:
- Navigation arrows (left/right)
- Dot indicators
- Keyboard navigation (arrow keys)
- Touch/swipe on mobile
- Hides controls if only 1 image


CUSTOMIZATION
-------------
Colors & Design:
- Edit main.css :root variables for colors
- Modern glass morphism design with dark gradient background
- Inter font family (Google Fonts)

Logo:
- Replace assets/logo.png with your logo
- Logo displays as circular (48px × 48px)
- Favicon automatically uses circular version

Header Text:
- Edit index.html line ~26-38 for "Seasells - Handmade Bracelets & Trinkets"
- Currently uses gradient text effect (gold to orange)

Games & Interactive Elements:
- About page: Animated stats counter + "Find the Trinket" game
- Contact page: Color matching challenge
- FAQ page: Interactive accordion + rotating quiz


TECHNICAL NOTES
---------------
- Works with file:// protocol (open index.html directly in browser)
- No server required - all data embedded in app.js
- Products loaded from JavaScript array (not JSON file)
- Responsive design (mobile-friendly)
- Modern CSS (glass morphism, gradients, animations)
- Cross-browser compatible (Chrome, Firefox, Safari, Edge)


ORDER FLOW
----------
1. Customer clicks "Order via Email" or submits form
2. Opens default email client with pre-filled message
3. Email sent to: koushik.flink@gmail.com
4. Includes: product name, customer name, phone, notes


DEPLOYMENT
----------
For local use:
- Simply open index.html in your browser
- All files work with file:// protocol

For web hosting:
- Upload entire folder to web server
- Ensure all relative paths are maintained
- No build step required - pure HTML/CSS/JS


FILE NAMING CONVENTIONS
-----------------------
- Product images: 1.jpg, 2.jpg, 3.jpg, 4.jpg (exact names)
- Product folders: 001, 002, 003... (3-digit IDs)
- Product pages: index.html (inside each product folder)


SUPPORT
-------
For issues or questions, check:
- Product carousel not working? Verify image filenames are exactly 1.jpg-4.jpg
- Images not showing? Check file paths and ensure images exist
- Styling issues? Check browser console for CSS errors
- Email not working? Verify email.js is loaded and email client is configured
