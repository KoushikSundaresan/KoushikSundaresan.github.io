// custom-order.js - Custom Order Builder Logic

// Detect base path for GitHub Pages compatibility
function getBasePath() {
  // Check if we're on GitHub Pages (has /Seasells/ or repo name in path)
  const path = window.location.pathname;
  const match = path.match(/^\/([^\/]+)\//);
  if (match && match[1] !== 'pages') {
    // We're in a subdirectory (GitHub Pages repo)
    return '/' + match[1];
  }
  // Local or root GitHub Pages
  return '';
}

const BASE_PATH = getBasePath();

// ============================================
// PER-ITEM AVAILABILITY STATUS CONFIGURATION
// ============================================
// Set availability status for each item individually
// Options: 'FLA' | 'FLBE' | 'PA' | 'OUT_OF_STOCK'
// 'FLA' = Available for Full Length All (green)
// 'FLBE' = Available for Full Length Bracelet/Earring (yellow)
// 'PA' = Available for Partial All (orange)
// 'OUT_OF_STOCK' = Out of Stock (red)

const AVAILABILITY_CONFIG = {
  'FLA': {
    label: 'Available',
    shortLabel: 'Available',
    color: '#5cff9d',
    bgColor: 'rgba(0,255,120,0.15)',
    icon: '✅'
  },
  'FLBE': {
    label: 'Bracelet/Earring Only',
    shortLabel: 'FLBE',
    color: '#ffd54f',
    bgColor: 'rgba(255,213,79,0.15)',
    icon: '⚠️'
  },
  'PA': {
    label: 'Partial Only',
    shortLabel: 'Partial',
    color: '#ff9800',
    bgColor: 'rgba(255,152,0,0.15)',
    icon: '⚡'
  },
  'OUT_OF_STOCK': {
    label: 'Out of Stock',
    shortLabel: 'Out of Stock',
    color: '#fca5a5',
    bgColor: 'rgba(239,68,68,0.15)',
    icon: '⏳'
  }
};

// Per-item availability mapping
// Edit these values to change availability for each item
const ITEM_AVAILABILITY = {
  // Twine availability
  twine: {
    'black': 'FLA',
    'blue': 'FLA',
    'brown': 'FLA',
    'orange': 'FLA',
    'red': 'FLA',
    'transparent': 'FLA',
    'yellow': 'FLA'
  },
  // Beads availability (by value)
  beads: {
    'solid': 'FLA',
    'black': 'FLA',
    'blue': 'FLA',
    'brown': 'FLA',
    'cloud-pink': 'FLA',
    'emerald': 'FLA',
    'green-yellow': 'FLA',
    'grey': 'FLA',
    'grey-violet': 'FLA',
    'olive': 'FLA',
    'pastel-green': 'FLA',
    'pink': 'FLA',
    'purple': 'FLA',
    'red': 'FLA',
    'sap-green': 'FLA',
    'sea': 'FLA',
    'tan': 'FLA',
    'violet': 'FLA',
    'yellow': 'FLA',
    'yellow-ochre': 'FLA',
    'not-pearl': 'FLA',
    'glow-in-dark': 'FLA'
  },
  // Ornaments availability (by value)
  ornaments: {
    'assorted': 'FLA',
    'gold': 'FLA',
    'silver': 'FLA',
    'teddy': 'FLA',
    'stone-gold': 'FLA',
    'stone-silver': 'FLA'
  }
};

// Pricing Configuration - Different prices based on product type
const PRICING = { 
  // Base prices by product type
  basePrice: {
    'Bracelet': 0,
    'Necklace': 2,
    'Earring': 1,
    'Choker': 1
  },
  twine: {
    'Bracelet': 4,
    'Necklace': 5,
    'Earring': 3,
    'Choker': 4
  },
  beads: {
    'Bracelet': {
      'solid': 2,
      'single-color': 3,
      'not-pearl': 5,
      'glow-in-dark': 7
    },
    'Necklace': {
      'solid': 3,
      'single-color': 4,
      'not-pearl': 6,
      'glow-in-dark': 8
    },
    'Earring': {
      'solid': 1,
      'single-color': 2,
      'not-pearl': 3,
      'glow-in-dark': 5
    },
    'Choker': {
      'solid': 2,
      'single-color': 3,
      'not-pearl': 5,
      'glow-in-dark': 7
    }
  },
  ornaments: {
    'Bracelet': {
      'assorted': 2,
      'gold': 2,
      'silver': 2,
      'teddy': 3.5,
      'stone-gold': 5,
      'stone-silver': 5
    },
    'Necklace': {
      'assorted': 3,
      'gold': 3,
      'silver': 3,
      'teddy': 4.5,
      'stone-gold': 6,
      'stone-silver': 6
    },
    'Earring': {
      'assorted': 1,
      'gold': 1,
      'silver': 1,
      'teddy': 2,
      'stone-gold': 3,
      'stone-silver': 3
    },
    'Choker': {
      'assorted': 2,
      'gold': 2,
      'silver': 2,
      'teddy': 3.5,
      'stone-gold': 5,
      'stone-silver': 5
    }
  },
  minPrice: 15,
  maxPrice: 30
};

// Product Options Data
const PRODUCT_OPTIONS = {
  twine: [
    { name: 'Black Twine', image: 'Black_Twine.jpg', value: 'black' },
    { name: 'Blue Twine', image: 'Blue_Twine.jpg', value: 'blue' },
    { name: 'Brown Twine', image: 'Brown_Twine.jpg', value: 'brown' },
    { name: 'Orange Twine', image: 'Orange_twine.jpg', value: 'orange' },
    { name: 'Red Twine', image: 'Red_Twine.jpg', value: 'red' },
    { name: 'Transparent Twine', image: 'Transparent_Twine.jpg', value: 'transparent' },
    { name: 'Yellow Twine', image: 'Yellow_Twine.jpg', value: 'yellow' }
  ],
  beads: [
    { name: 'Solid Colored Beads', image: 'Solid_colored_Beads.jpg', category: 'solid', value: 'solid' },
    { name: 'Black Beads', image: 'Black_Beads.jpg', category: 'single-color', value: 'black' },
    { name: 'Blue Beads', image: 'blue_beads.jpg', category: 'single-color', value: 'blue' },
    { name: 'Brown Beads', image: 'Brown_Beads.jpg', category: 'single-color', value: 'brown' },
    { name: 'Cloud Pink Beads', image: 'Cloud-Pink_Beads.jpg', category: 'single-color', value: 'cloud-pink' },
    { name: 'Emerald Beads', image: 'Emerald_beads.jpg', category: 'single-color', value: 'emerald' },
    { name: 'Green Yellow Beads', image: 'Green-Yellow_Beads.jpg', category: 'single-color', value: 'green-yellow' },
    { name: 'Grey Beads', image: 'Grey_Beads.jpg', category: 'single-color', value: 'grey' },
    { name: 'Grey Violet Beads', image: 'Grey-Violet_Beads.jpg', category: 'single-color', value: 'grey-violet' },
    { name: 'Olive Beads', image: 'Olive_Beads.jpg', category: 'single-color', value: 'olive' },
    { name: 'Pastel Green Beads', image: 'pastel-green_beads.jpg', category: 'single-color', value: 'pastel-green' },
    { name: 'Pink Beads', image: 'Pink_Beads.jpg', category: 'single-color', value: 'pink' },
    { name: 'Purple Beads', image: 'Purple_Beads.jpg', category: 'single-color', value: 'purple' },
    { name: 'Red Beads', image: 'Red_Beads.jpg', category: 'single-color', value: 'red' },
    { name: 'Sap Green Beads', image: 'Sap-Green_Beads.jpg', category: 'single-color', value: 'sap-green' },
    { name: 'Sea Beads', image: 'Sea_Beads.jpg', category: 'single-color', value: 'sea' },
    { name: 'Tan Beads', image: 'Tan_Beads.jpg', category: 'single-color', value: 'tan' },
    { name: 'Violet Beads', image: 'Violet-beads.jpg', category: 'single-color', value: 'violet' },
    { name: 'Yellow Beads', image: 'Yellow_Beads.jpg', category: 'single-color', value: 'yellow' },
    { name: 'Yellow Ochre Beads', image: 'yellow-Ochre_beads.jpg', category: 'single-color', value: 'yellow-ochre' },
    { name: 'Not Pearl Beads', image: 'not-Pearl_Beads.jpg', category: 'not-pearl', value: 'not-pearl' },
    { name: 'Glow in Dark Beads', image: 'Assorted_Glow-In-Dark_Beads.jpg', category: 'glow-in-dark', value: 'glow-in-dark' }
  ],
  ornaments: [
    { name: 'Assorted Ornaments', image: 'Assorted_Ornaments.jpg', category: 'assorted', value: 'assorted' },
    { name: 'Gold Ornament', image: 'Gold_Ornament.jpg', category: 'gold', value: 'gold' },
    { name: 'Silver Ornament', image: 'Silver_Ornament.jpg', category: 'silver', value: 'silver' },
    { name: 'Teddy Ornament', image: 'teddy_Ornament.jpg', category: 'teddy', value: 'teddy' },
    { name: 'Stone Gold Ornament', image: 'Stone-Gold_Ornament.jpg', category: 'stone-gold', value: 'stone-gold' },
    { name: 'Stone Silver Ornament', image: 'Stone-Silver_Ornament.jpg', category: 'stone-silver', value: 'stone-silver' }
  ]
};

// State Management
let orderState = {
  productType: null,
  twine: null,
  beads: [],
  ornaments: []
};

// Initialize the builder
function initBuilder() {
  renderAvailabilityStatus();
  renderTwineOptions();
  renderBeadsOptions();
  renderOrnamentsOptions();
  setupEventListeners();
  updatePrice();
}

// Render Availability Status Banner
function renderAvailabilityStatus() {
  const statusEl = document.getElementById('availability-status');
  if (!statusEl) return;
  
  const status = AVAILABILITY_STATUS;
  const config = AVAILABILITY_CONFIG[status] || AVAILABILITY_CONFIG['FLA'];
  
  statusEl.style.background = config.bgColor;
  statusEl.style.color = config.color;
  statusEl.textContent = `${config.icon} ${config.label}`;
}

// Render Twine Options
function renderTwineOptions() {
  const grid = document.getElementById('twine-grid');
  if (!grid) {
    console.error('Twine grid not found');
    return;
  }
  const productType = orderState.productType || 'Bracelet';
  const twinePrice = PRICING.twine[productType] || PRICING.twine['Bracelet'] || 4;
  const imagePath = BASE_PATH ? `${BASE_PATH}/assets/Customs/` : '../assets/Customs/';
  const fallbackPath = BASE_PATH ? `${BASE_PATH}/assets/logo.png` : '../assets/logo.png';
  grid.innerHTML = PRODUCT_OPTIONS.twine.map(twine => {
    const availability = getItemAvailability('twine', twine.value);
    const badge = renderAvailabilityBadge(availability);
    const isUnavailable = availability === 'OUT_OF_STOCK';
    return `
    <label class="option-card" style="${isUnavailable ? 'opacity: 0.6;' : ''}">
      <input type="radio" name="twine" value="${twine.value}" required ${isUnavailable ? 'disabled' : ''}>
      <div class="option-card-content" style="position: relative;">
        ${badge}
        <img src="${imagePath}${twine.image}" alt="${twine.name}" class="option-image" onerror="this.src='${fallbackPath}'" style="${isUnavailable ? 'opacity: 0.5; filter: grayscale(50%);' : ''}">
        <div class="option-name">${twine.name}</div>
        <div class="option-price">+${twinePrice} AED</div>
      </div>
    </label>
  `;
  }).join('');
}

// Render Beads Options - Organized by price range
function renderBeadsOptions() {
  const grid = document.getElementById('beads-grid');
  if (!grid) {
    console.error('Beads grid not found');
    return;
  }
  
  const productType = orderState.productType || 'Bracelet';
  const imagePath = BASE_PATH ? `${BASE_PATH}/assets/Customs/` : '../assets/Customs/';
  const fallbackPath = BASE_PATH ? `${BASE_PATH}/assets/logo.png` : '../assets/logo.png';
  
  // Group beads by price category
  const beadsByPrice = {
    'solid': PRODUCT_OPTIONS.beads.filter(b => b.category === 'solid'),
    'single-color': PRODUCT_OPTIONS.beads.filter(b => b.category === 'single-color'),
    'not-pearl': PRODUCT_OPTIONS.beads.filter(b => b.category === 'not-pearl'),
    'glow-in-dark': PRODUCT_OPTIONS.beads.filter(b => b.category === 'glow-in-dark')
  };
  
  // Price order: solid (lowest) -> single-color -> not-pearl -> glow-in-dark (highest)
  const priceOrder = ['solid', 'single-color', 'not-pearl', 'glow-in-dark'];
  
  let html = '';
  
  priceOrder.forEach(category => {
    const beads = beadsByPrice[category];
    if (beads.length === 0) return;
    
    const price = PRICING.beads[productType]?.[category] || 0;
    const categoryLabels = {
      'solid': 'Solid Colored Beads',
      'single-color': 'Single-Color Beads',
      'not-pearl': 'Not-Pearl Beads',
      'glow-in-dark': 'Glow-in-Dark Beads'
    };
    
    html += `
      <div class="bead-price-group" style="grid-column: 1 / -1; margin-top: 24px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding: 12px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border-left: 3px solid var(--accent);">
          <div style="flex: 1;">
            <div style="font-weight: 700; font-size: 16px; color: var(--text-primary); margin-bottom: 4px;">
              ${categoryLabels[category]} - ${price} AED
            </div>
            <div style="font-size: 12px; color: var(--text-secondary);">
              💡 Mix & match any colors within this price range for the same price
            </div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px;">
    `;
    
    beads.forEach(bead => {
      const availability = getItemAvailability('beads', bead.value);
      const badge = renderAvailabilityBadge(availability);
      const isUnavailable = availability === 'OUT_OF_STOCK';
      html += `
        <label class="option-card" style="${isUnavailable ? 'opacity: 0.6;' : ''}">
          <input type="checkbox" name="beads" value="${bead.value}" data-category="${bead.category}" ${isUnavailable ? 'disabled' : ''}>
          <div class="option-card-content" style="position: relative;">
            ${badge}
            <img src="${imagePath}${bead.image}" alt="${bead.name}" class="option-image" onerror="this.src='${fallbackPath}'" style="${isUnavailable ? 'opacity: 0.5; filter: grayscale(50%);' : ''}">
            <div class="option-name">${bead.name}</div>
            <div class="option-price" style="font-size: 11px; opacity: 0.8;">Same price</div>
          </div>
        </label>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  });
  
  grid.innerHTML = html;
}

// Render Ornaments Options
function renderOrnamentsOptions() {
  const grid = document.getElementById('ornaments-grid');
  if (!grid) {
    console.error('Ornaments grid not found');
    return;
  }
  const productType = orderState.productType || 'Bracelet';
  const imagePath = BASE_PATH ? `${BASE_PATH}/assets/Customs/` : '../assets/Customs/';
  const fallbackPath = BASE_PATH ? `${BASE_PATH}/assets/logo.png` : '../assets/logo.png';
  grid.innerHTML = PRODUCT_OPTIONS.ornaments.map(ornament => {
    const price = PRICING.ornaments[productType]?.[ornament.category] || 0;
    const availability = getItemAvailability('ornaments', ornament.value);
    const badge = renderAvailabilityBadge(availability);
    const isUnavailable = availability === 'OUT_OF_STOCK';
    return `
      <label class="option-card" style="${isUnavailable ? 'opacity: 0.6;' : ''}">
        <input type="checkbox" name="ornaments" value="${ornament.value}" data-category="${ornament.category}" ${isUnavailable ? 'disabled' : ''}>
        <div class="option-card-content" style="position: relative;">
          ${badge}
          <img src="${imagePath}${ornament.image}" alt="${ornament.name}" class="option-image" onerror="this.src='${fallbackPath}'" style="${isUnavailable ? 'opacity: 0.5; filter: grayscale(50%);' : ''}">
          <div class="option-name">${ornament.name}</div>
          <div class="option-price">+${price} AED</div>
        </div>
      </label>
    `;
  }).join('');
}

// Setup Event Listeners (using event delegation to prevent duplicates)
let listenersAttached = false;

function setupEventListeners() {
  // Prevent multiple event listener attachments
  if (listenersAttached) return;
  listenersAttached = true;

  // Product Type
  document.querySelectorAll('input[name="productType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      orderState.productType = e.target.value;
      // Re-render all options with new prices based on product type
      renderTwineOptions();
      renderBeadsOptions();
      renderOrnamentsOptions();
      updatePrice();
      updatePreview();
    });
  });

  // Use event delegation for dynamic elements
  document.addEventListener('change', (e) => {
    // Twine (radio - only one)
    if (e.target.name === 'twine') {
      orderState.twine = e.target.value;
      updatePrice();
      updatePreview();
    }
    
    // Beads (checkboxes - multiple)
    if (e.target.name === 'beads') {
      const checked = Array.from(document.querySelectorAll('input[name="beads"]:checked'))
        .map(cb => ({
          value: cb.value,
          category: cb.dataset.category,
          name: PRODUCT_OPTIONS.beads.find(b => b.value === cb.value)?.name
        }));
      orderState.beads = checked;
      updatePrice();
      updatePreview();
    }
    
    // Ornaments (checkboxes - multiple)
    if (e.target.name === 'ornaments') {
      const checked = Array.from(document.querySelectorAll('input[name="ornaments"]:checked'))
        .map(cb => ({
          value: cb.value,
          category: cb.dataset.category,
          name: PRODUCT_OPTIONS.ornaments.find(o => o.value === cb.value)?.name
        }));
      orderState.ornaments = checked;
      updatePrice();
      updatePreview();
    }
  });
}

// Calculate Raw Price
// Only count each category once (multiple colors of same type = one price)
// Prices vary based on product type
function calculateRawPrice() {
  let total = 0;
  const productType = orderState.productType || 'Bracelet';

  // Base price for product type
  total += PRICING.basePrice[productType] || 0;

  // Twine (required) - price varies by product type
  if (orderState.twine) {
    total += PRICING.twine[productType] || PRICING.twine['Bracelet'] || 4;
  }

  // Beads: Group by category, only count each category once
  const beadCategories = new Set();
  orderState.beads.forEach(bead => {
    if (!beadCategories.has(bead.category)) {
      beadCategories.add(bead.category);
      const price = PRICING.beads[productType]?.[bead.category] || 0;
      total += price;
    }
  });

  // Ornaments: Group by category, only count each category once
  const ornamentCategories = new Set();
  orderState.ornaments.forEach(ornament => {
    if (!ornamentCategories.has(ornament.category)) {
      ornamentCategories.add(ornament.category);
      const price = PRICING.ornaments[productType]?.[ornament.category] || 0;
      total += price;
    }
  });

  return total;
}

// Apply Price Limits
function applyPriceLimits(rawPrice) {
  if (rawPrice < PRICING.minPrice) {
    return PRICING.minPrice;
  }
  if (rawPrice > PRICING.maxPrice) {
    return PRICING.maxPrice;
  }
  return rawPrice;
}

// Update Price Display
function updatePrice() {
  const rawPrice = calculateRawPrice();
  const finalPrice = applyPriceLimits(rawPrice);
  const breakdown = document.getElementById('price-breakdown');
  const finalPriceEl = document.getElementById('final-price');

  // Clear previous content first
  if (!breakdown || !finalPriceEl) return;

  // Build breakdown - group by category to show once per type
  let breakdownHTML = '';
  
  const productType = orderState.productType || 'Bracelet';
  
  // Base price
  const basePrice = PRICING.basePrice[productType] || 0;
  if (basePrice > 0) {
    breakdownHTML += `
      <div class="price-row">
        <span>${productType} Base</span>
        <span class="price-value">${basePrice} AED</span>
      </div>
    `;
  }
  
  if (orderState.twine) {
    const twineName = PRODUCT_OPTIONS.twine.find(t => t.value === orderState.twine)?.name || 'Twine';
    const twinePrice = PRICING.twine[productType] || PRICING.twine['Bracelet'] || 4;
    breakdownHTML += `
      <div class="price-row">
        <span>${twineName}</span>
        <span class="price-value">${twinePrice} AED</span>
      </div>
    `;
  }

  // Beads: Show each category only once, with count of colors
  const beadCategories = new Map();
  orderState.beads.forEach(bead => {
    if (!beadCategories.has(bead.category)) {
      beadCategories.set(bead.category, {
        price: PRICING.beads[bead.category] || 0,
        count: 1,
        categoryName: bead.category
      });
    } else {
      beadCategories.get(bead.category).count++;
    }
  });

  beadCategories.forEach((data, category) => {
    const categoryLabels = {
      'solid': 'Solid Colored Beads',
      'single-color': 'Single-Color Beads',
      'not-pearl': 'Not-Pearl Beads',
      'glow-in-dark': 'Glow-in-Dark Beads'
    };
    const label = categoryLabels[category] || category;
    const countText = data.count > 1 ? ` (${data.count} colors mixed)` : '';
    breakdownHTML += `
      <div class="price-row">
        <span>${label}${countText}</span>
        <span class="price-value">${data.price} AED</span>
      </div>
    `;
  });

  // Ornaments: Show each category only once, with count
  const ornamentCategories = new Map();
  orderState.ornaments.forEach(ornament => {
    if (!ornamentCategories.has(ornament.category)) {
      ornamentCategories.set(ornament.category, {
        price: PRICING.ornaments[ornament.category] || 0,
        count: 1,
        categoryName: ornament.category
      });
    } else {
      ornamentCategories.get(ornament.category).count++;
    }
  });

  ornamentCategories.forEach((data, category) => {
    const categoryLabels = {
      'assorted': 'Assorted Ornaments',
      'gold': 'Gold Ornament',
      'silver': 'Silver Ornament',
      'teddy': 'Teddy Ornament',
      'stone-gold': 'Stone Gold Ornament',
      'stone-silver': 'Stone Silver Ornament'
    };
    const label = categoryLabels[category] || category;
    const countText = data.count > 1 ? ` (${data.count} selected)` : '';
    breakdownHTML += `
      <div class="price-row">
        <span>${label}${countText}</span>
        <span class="price-value">${data.price} AED</span>
      </div>
    `;
  });

  breakdownHTML += `
    <div class="price-row">
      <span>Subtotal</span>
      <span class="price-value">${rawPrice.toFixed(1)} AED</span>
    </div>
  `;

  if (rawPrice < PRICING.minPrice) {
    breakdownHTML += `
      <div class="price-row" style="color: var(--gold);">
        <span>Minimum Price Applied</span>
        <span class="price-value">+${(PRICING.minPrice - rawPrice).toFixed(1)} AED</span>
      </div>
    `;
  } else if (rawPrice > PRICING.maxPrice) {
    breakdownHTML += `
      <div class="price-row" style="color: var(--gold);">
        <span>Maximum Price Applied</span>
        <span class="price-value">-${(rawPrice - PRICING.maxPrice).toFixed(1)} AED</span>
      </div>
    `;
  }

  breakdown.innerHTML = breakdownHTML;
  finalPriceEl.textContent = `${finalPrice.toFixed(1)} AED`;

  // Show preview and form if required fields are filled
  if (orderState.productType && orderState.twine) {
    document.getElementById('preview-summary').style.display = 'block';
    document.getElementById('order-form-section').style.display = 'block';
  } else {
    document.getElementById('preview-summary').style.display = 'none';
    document.getElementById('order-form-section').style.display = 'none';
  }
}

// Update Preview Summary
function updatePreview() {
  const summaryContent = document.getElementById('summary-content');
  
  if (!orderState.productType || !orderState.twine) {
    return;
  }

  const twineName = PRODUCT_OPTIONS.twine.find(t => t.value === orderState.twine)?.name || orderState.twine;
  const beadsList = orderState.beads.length > 0 
    ? orderState.beads.map(b => b.name).join(', ')
    : 'None';
  const ornamentsList = orderState.ornaments.length > 0
    ? orderState.ornaments.map(o => o.name).join(', ')
    : 'None';
  const finalPrice = applyPriceLimits(calculateRawPrice());

  summaryContent.innerHTML = `
    <div class="summary-item">
      <div class="summary-label">Product Type</div>
      <div class="summary-value">${orderState.productType}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Twine</div>
      <div class="summary-value">${twineName}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Beads</div>
      <div class="summary-value">${beadsList}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Ornaments</div>
      <div class="summary-value">${ornamentsList}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Final Price</div>
      <div class="summary-value" style="color: var(--gold); font-size: 24px;">${finalPrice.toFixed(1)} AED</div>
    </div>
  `;
}

// Submit Custom Order
function submitCustomOrder() {
  // Validate required fields
  if (!orderState.productType) {
    document.getElementById('product-type-error').classList.add('show');
    return;
  } else {
    document.getElementById('product-type-error').classList.remove('show');
  }

  if (!orderState.twine) {
    document.getElementById('twine-error').classList.add('show');
    return;
  } else {
    document.getElementById('twine-error').classList.remove('show');
  }

  const form = document.getElementById('order-form');
  const formData = new FormData(form);
  const name = formData.get('name');
  const phone = formData.get('phone');
  const note = formData.get('note') || '';

  if (!name || !phone) {
    if (!name) document.getElementById('name-error').classList.add('show');
    if (!phone) document.getElementById('phone-error').classList.add('show');
    return;
  }

  // Build order message
  const twineName = PRODUCT_OPTIONS.twine.find(t => t.value === orderState.twine)?.name || orderState.twine;
  const beadsList = orderState.beads.length > 0 
    ? orderState.beads.map(b => b.name).join(', ')
    : 'None';
  const ornamentsList = orderState.ornaments.length > 0
    ? orderState.ornaments.map(o => o.name).join(', ')
    : 'None';
  const finalPrice = applyPriceLimits(calculateRawPrice());
  const rawPrice = calculateRawPrice();

  // Build order message with correct pricing (categories counted once)
  const productType = orderState.productType || 'Bracelet';
  let orderMessage = `🎨 CUSTOM ORDER REQUEST\n\n`;
  orderMessage += `Product Type: ${productType}\n`;
  orderMessage += `Twine: ${twineName}\n`;
  orderMessage += `Beads: ${beadsList}\n`;
  orderMessage += `Ornaments: ${ornamentsList}\n\n`;
  orderMessage += `Price Breakdown:\n`;
  
  // Base price
  const basePrice = PRICING.basePrice[productType] || 0;
  if (basePrice > 0) {
    orderMessage += `  ${productType} Base: ${basePrice} AED\n`;
  }
  
  const twinePrice = PRICING.twine[productType] || PRICING.twine['Bracelet'] || 4;
  orderMessage += `  ${twineName}: ${twinePrice} AED\n`;
  
  // Beads: Group by category
  const beadCategories = new Map();
  orderState.beads.forEach(bead => {
    if (!beadCategories.has(bead.category)) {
      beadCategories.set(bead.category, {
        price: PRICING.beads[productType]?.[bead.category] || 0,
        names: [bead.name]
      });
    } else {
      beadCategories.get(bead.category).names.push(bead.name);
    }
  });
  
  beadCategories.forEach((data, category) => {
    const categoryLabels = {
      'solid': 'Solid Colored Beads',
      'single-color': 'Single-Color Beads',
      'not-pearl': 'Not-Pearl Beads',
      'glow-in-dark': 'Glow-in-Dark Beads'
    };
    const label = categoryLabels[category] || category;
    const countText = data.names.length > 1 ? ` (${data.names.length} colors mixed: ${data.names.join(', ')})` : '';
    orderMessage += `  ${label}${countText}: ${data.price} AED\n`;
  });
  
  // Ornaments: Group by category
  const ornamentCategories = new Map();
  orderState.ornaments.forEach(ornament => {
    if (!ornamentCategories.has(ornament.category)) {
      ornamentCategories.set(ornament.category, {
        price: PRICING.ornaments[productType]?.[ornament.category] || 0,
        names: [ornament.name]
      });
    } else {
      ornamentCategories.get(ornament.category).names.push(ornament.name);
    }
  });
  
  ornamentCategories.forEach((data, category) => {
    const categoryLabels = {
      'assorted': 'Assorted Ornaments',
      'gold': 'Gold Ornament',
      'silver': 'Silver Ornament',
      'teddy': 'Teddy Ornament',
      'stone-gold': 'Stone Gold Ornament',
      'stone-silver': 'Stone Silver Ornament'
    };
    const label = categoryLabels[category] || category;
    const countText = data.names.length > 1 ? ` (${data.names.length})` : '';
    orderMessage += `  ${label}${countText}: ${data.price} AED\n`;
  });
  
  orderMessage += `  Subtotal: ${rawPrice.toFixed(1)} AED\n`;
  
  if (rawPrice < PRICING.minPrice) {
    orderMessage += `  Minimum Applied: +${(PRICING.minPrice - rawPrice).toFixed(1)} AED\n`;
  } else if (rawPrice > PRICING.maxPrice) {
    orderMessage += `  Maximum Applied: -${(rawPrice - PRICING.maxPrice).toFixed(1)} AED\n`;
  }
  
  orderMessage += `\n💰 FINAL PRICE: ${finalPrice.toFixed(1)} AED\n\n`;
  orderMessage += `Customer Details:\n`;
  orderMessage += `  Name: ${name}\n`;
  orderMessage += `  Phone: ${phone}\n`;
  if (note) {
    orderMessage += `  Note: ${note}\n`;
  }

  // Send via email (using existing email.js function)
  const subject = encodeURIComponent(`Custom Order - ${orderState.productType}`);
  const body = encodeURIComponent(orderMessage);
  window.location.href = `mailto:koushikflink@gmail.com?subject=${subject}&body=${body}`;

  // Alternative: WhatsApp (uncomment if preferred)
  // const whatsappMessage = encodeURIComponent(orderMessage);
  // window.open(`https://wa.me/YOUR_WHATSAPP_NUMBER?text=${whatsappMessage}`, '_blank');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  try {
    initBuilder();
  } catch (error) {
    console.error('Error initializing custom order builder:', error);
    // Show error message to user
    const container = document.querySelector('.builder-container');
    if (container) {
      container.innerHTML = '<div class="glass" style="padding: 32px; text-align: center;"><h2>Error Loading Builder</h2><p>Please refresh the page or check the console for details.</p></div>';
    }
  }
});

