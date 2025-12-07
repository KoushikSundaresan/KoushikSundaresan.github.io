<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5,user-scalable=yes">
<title>Custom Order Builder — Seasells</title>

<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
<link rel="alternate icon" type="image/png" href="../assets/logo.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<link rel="stylesheet" href="../main.css">
<link rel="stylesheet" href="../ui.css">
<link rel="stylesheet" href="../animations.css">

<style>
  .builder-container {
    max-width: 900px;
    margin: 40px auto;
    padding: 0 24px;
  }

  .step-section {
    margin-bottom: 32px;
  }

  .step-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .step-number {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--accent);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 18px;
  }

  .step-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .step-subtitle {
    color: var(--text-secondary);
    font-size: 14px;
    margin-top: 4px;
  }

  .option-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
    margin-top: 16px;
  }

  .option-card {
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 12px;
    overflow: hidden;
  }

  .option-card input[type="radio"],
  .option-card input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .option-card-content {
    background: var(--glass-bg);
    border: 2px solid var(--glass-border);
    border-radius: 12px;
    padding: 12px;
    text-align: center;
    transition: all 0.3s ease;
  }

  .option-card:hover .option-card-content {
    border-color: var(--accent);
    background: var(--glass-hover);
  }

  .option-card input:checked + .option-card-content {
    border-color: var(--accent);
    background: rgba(99, 102, 241, 0.2);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .option-image {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 8px;
  }

  .option-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  .option-price {
    font-size: 12px;
    color: var(--gold);
    font-weight: 600;
  }

  .price-display {
    position: sticky;
    bottom: 0;
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 20px;
    margin: 40px -24px -40px;
    border-radius: 20px 20px 0 0;
  }

  .price-breakdown {
    margin-bottom: 16px;
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 14px;
    color: var(--text-secondary);
  }

  .price-row.total {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 8px;
    padding-top: 12px;
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .price-row.total .price-value {
    color: var(--gold);
    font-size: 24px;
  }

  .preview-summary {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 24px;
    margin-top: 32px;
  }

  .summary-item {
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .summary-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .summary-label {
    font-size: 12px;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .summary-value {
    font-size: 16px;
    color: var(--text-primary);
    font-weight: 600;
  }

  .required-badge {
    display: inline-block;
    background: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 4px;
    margin-left: 8px;
  }

  .optional-badge {
    display: inline-block;
    background: rgba(156, 163, 175, 0.2);
    color: #d1d5db;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 4px;
    margin-left: 8px;
  }

  .btn-submit {
    width: 100%;
    padding: 16px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px;
  }

  .btn-submit:hover {
    background: var(--accent-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
  }

  .btn-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .order-form {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .form-input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    color: var(--text-primary);
    font-size: 14px;
    font-family: inherit;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--accent);
    background: var(--glass-hover);
  }

  .validation-error {
    color: #fca5a5;
    font-size: 12px;
    margin-top: 4px;
    display: none;
  }

  .validation-error.show {
    display: block;
  }
</style>
</head>
<body>

  <!-- header -->
  <header class="main-header">
    <div class="container">
      <nav class="header-nav">
        <div class="header-brand">
          <div class="logo"><img src="../assets/logo.png" alt="logo"></div>
          <div class="brand-text">Seasells</div>
        </div>
        <div class="header-menu">
          <a href="../index.html" class="nav-link">Home</a>
          <a href="about.html" class="nav-link">About</a>
          <a href="contact.html" class="nav-link">Contact</a>
          <a href="faq.html" class="nav-link">FAQ</a>
        </div>
      </nav>
    </div>
  </header>

  <main class="builder-container">
    <h1 style="font-size: 32px; font-weight: 800; margin-bottom: 8px; text-align: center;">
      Build Your Custom Order
    </h1>
    <p style="text-align: center; color: var(--text-secondary); margin-bottom: 40px;">
      Choose your style, see the price update in real-time
    </p>

    <div class="glass" style="padding: 32px; margin-bottom: 24px;">
      
      <!-- STEP 1: Product Type -->
      <div class="step-section">
        <div class="step-header">
          <div class="step-number">1</div>
          <div>
            <div class="step-title">Choose Product Type <span class="required-badge">Required</span></div>
            <div class="step-subtitle">Select what you're building</div>
          </div>
        </div>
        <div class="option-grid" id="product-type-grid">
          <label class="option-card">
            <input type="radio" name="productType" value="Earring" required>
            <div class="option-card-content">
              <div class="option-name">Earring</div>
            </div>
          </label>
          <label class="option-card">
            <input type="radio" name="productType" value="Bracelet" required>
            <div class="option-card-content">
              <div class="option-name">Bracelet</div>
            </div>
          </label>
          <label class="option-card">
            <input type="radio" name="productType" value="Necklace" required>
            <div class="option-card-content">
              <div class="option-name">Necklace</div>
            </div>
          </label>
          <label class="option-card">
            <input type="radio" name="productType" value="Choker" required>
            <div class="option-card-content">
              <div class="option-name">Choker</div>
            </div>
          </label>
        </div>
        <div class="validation-error" id="product-type-error">Please select a product type</div>
      </div>

      <!-- STEP 2: Twine -->
      <div class="step-section">
        <div class="step-header">
          <div class="step-number">2</div>
          <div>
            <div class="step-title">Select Twine <span class="required-badge">Required</span></div>
            <div class="step-subtitle">Choose your base twine (one only)</div>
          </div>
        </div>
        <div class="option-grid" id="twine-grid">
          <!-- Will be populated by JavaScript -->
        </div>
        <div class="validation-error" id="twine-error">Please select a twine</div>
      </div>

      <!-- STEP 3: Beads -->
      <div class="step-section">
        <div class="step-header">
          <div class="step-number">3</div>
          <div>
            <div class="step-title">Select Beads <span class="optional-badge">Optional</span></div>
            <div class="step-subtitle">Mix & match as many as you like</div>
          </div>
        </div>
        <div class="option-grid" id="beads-grid">
          <!-- Will be populated by JavaScript -->
        </div>
      </div>

      <!-- STEP 4: Ornaments -->
      <div class="step-section">
        <div class="step-header">
          <div class="step-number">4</div>
          <div>
            <div class="step-title">Select Ornaments <span class="optional-badge">Optional</span></div>
            <div class="step-subtitle">Add any number of ornaments</div>
          </div>
        </div>
        <div class="option-grid" id="ornaments-grid">
          <!-- Will be populated by JavaScript -->
        </div>
      </div>

      <!-- Price Display -->
      <div class="price-display">
        <div class="price-breakdown" id="price-breakdown">
          <!-- Will be populated by JavaScript -->
        </div>
        <div style="text-align: center; font-size: 28px; font-weight: 800; color: var(--gold);" id="final-price">
          0 AED
        </div>
      </div>

      <!-- Preview Summary -->
      <div class="preview-summary" id="preview-summary" style="display: none;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 20px;">Order Summary</h3>
        <div id="summary-content">
          <!-- Will be populated by JavaScript -->
        </div>
      </div>

      <!-- Order Form -->
      <div class="order-form" id="order-form-section" style="display: none;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 20px;">Your Details</h3>
        <form id="order-form" onsubmit="event.preventDefault(); submitCustomOrder()">
          <div class="form-group">
            <label class="form-label">Your Name</label>
            <input type="text" name="name" class="form-input" placeholder="Full name" required>
            <div class="validation-error" id="name-error">Please enter your name</div>
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" name="phone" class="form-input" placeholder="Phone number" required>
            <div class="validation-error" id="phone-error">Please enter your phone number</div>
          </div>
          <div class="form-group">
            <label class="form-label">Additional Notes (Optional)</label>
            <textarea name="note" class="form-input" placeholder="Any preferences, pickup time, etc." rows="4"></textarea>
          </div>
          <button type="submit" class="btn-submit" id="submit-btn">Send Order</button>
        </form>
      </div>

    </div>
  </main>

  <script src="../email.js"></script>
  <script src="custom-order.js"></script>
</body>
</html>

