/* app.js - loads product list and renders cards */
// Products data embedded for local file:// protocol support
const productsData = [
  {
    "id": "001",
    "name": "Peacock",
    "image": "1.jpg",
    "price": "10 AED",
    "glow": false,
    "category": "Bracelet",
    "desc": "Handmade stone beads on waxed cord.",
    "sold": false
  },
  {
    "id": "002",
    "name": "Lofi",
    "image": "1.jpg",
    "price": "10 AED",
    "glow": false,
    "category": "Bracelet",
    "desc": "Handmade stone beads on waxed cord.",
    "sold": false
  },
  {
    "id": "003",
    "name": "Magma",
    "image": "1.jpg",
    "price": "15 AED",
    "glow": true,
    "category": "Bracelet",
    "desc": "Handmade - Glow in the Dark -  stone beads on waxed cord.",
    "sold": false
  },
  {
    "id": "004",
    "name": "Seaside",
    "image": "1.jpg",
    "price": "10 AED",
    "glow": false,
    "category": "Bracelet",
    "desc": "Handmade stone beads on waxed cord.",
    "sold": false
  },
  {
    "id": "005",
    "name": "Pearlish",
    "image": "1.jpg",
    "price": "10 AED",
    "glow": false,
    "category": "Bracelet",
    "desc": "Handmade stone beads on waxed cord.",
    "sold": false
  },
];

function loadProducts(){
  try{
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    productsData.forEach(p=>{
      const el = document.createElement('div');
      el.className = 'glass card';

      el.innerHTML = `
  <div style="position: relative;">
    <img src="products/${p.id}/${p.image || '1.jpg'}" alt="${p.name}" style="${p.sold ? 'opacity: 0.4; filter: grayscale(70%);' : ''}">
    ${p.sold ? `
      <div style="position: absolute; top: 12px; right: 12px; background: rgba(239, 68, 68, 0.95); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
        Sold
      </div>
    ` : ''}
  </div>
  <h3 style="margin:10px 0;color:var(--text-primary)">${p.name}</h3>

  <div class="meta" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
    <div class="pill">${p.category || 'Bracelet'}</div>
    <div class="price" style="margin-left:auto">${p.price || '—'}</div>
  </div>

  <div style="margin-top:12px;display:flex;align-items:center;justify-content:space-between;">
    ${p.glow ? `
      <div class="glow-tag" 
        style="padding:6px 10px;border-radius:6px;
        background:rgba(0,255,120,0.15);color:#5cff9d;
        font-size:13px;font-weight:600;display:inline-block;">
        ✨ Glow in the Dark
      </div>
    ` : `<div></div>`}

    ${p.sold ? `
      <button class="btn" onclick="requestRemake('${p.id}', '${p.name}', '${p.price}', '${p.category}')" style="background: var(--gold); color: #000; font-weight: 600;">
        🔄 Request Remake
      </button>
    ` : `
      <a class="btn" href="products/${p.id}/index.html">See More</a>
    `}
  </div>
`;

      grid.appendChild(el);
    });

  } catch(e) {
    console.error('Failed to load products', e);
    document.getElementById('product-grid').innerHTML = '<p class="center">No products found.</p>';
  }
}

// Request Remake Function for sold items
function requestRemake(productId, productName, productPrice, productCategory) {
  const subject = encodeURIComponent(`Remake Request - ${productName}`);
  const body = encodeURIComponent(
    `Hi Koushik,\n\n` +
    `I would like to request a remake of:\n\n` +
    `Product: ${productName}\n` +
    `Category: ${productCategory}\n` +
    `Price: ${productPrice}\n` +
    `Product ID: ${productId}\n\n` +
    `Please let me know when this will be available!\n\n` +
    `Thank you!`
  );
  window.location.href = `mailto:koushikflink@gmail.com?subject=${subject}&body=${body}`;
}

document.addEventListener('DOMContentLoaded', loadProducts);

