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
    "desc": "Handmade stone beads on waxed cord."
  },
  {
    "id": "002",
    "name": "Lofi",
    "image": "1.jpg",
    "price": "10 AED",
    "glow": false,
    "category": "Bracelet",
    "desc": "Handmade stone beads on waxed cord."
  },
  {
    "id": "003",
    "name": "Magma",
    "image": "1.jpg",
    "price": "15 AED",
    "glow": true,
    "category": "Bracelet",
    "desc": "Handmade - Glow in the Dark -  stone beads on waxed cord."
  },
  {
    "id": "004",
    "name": "Pearlish",
    "image": "1.jpg",
    "price": "10 AED",
    "glow": false,
    "category": "Bracelet",
    "desc": "Handmade stone beads on waxed cord."
  },
  {
    "id": "005",
    "name": "Seaside",
    "image": "1.jpg",
    "price": "10 AED",
    "glow": false,
    "category": "Bracelet",
    "desc": "Handmade stone beads on waxed cord."
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
        <img src="products/${p.id}/${p.image || '1.jpg'}" alt="${p.name}">
        <h3 style="margin:10px 0;color:var(--text-primary)">${p.name}</h3>
        <div class="meta">
          <div class="pill">${p.category || 'Bracelet'}</div>
          <div class="price">${p.price || '—'}</div>
          <br>
          ${p.glow ? `<div class="glow-tag">✨ Glow in the Dark</div>` : ''}
        </div>
        <div style="margin-top:12px">
          <a class="btn" href="products/${p.id}/index.html">See More</a>
        </div>
      `;

      grid.appendChild(el);
    });

  } catch(e) {
    console.error('Failed to load products', e);
    document.getElementById('product-grid').innerHTML = '<p class="center">No products found.</p>';
  }
}
document.addEventListener('DOMContentLoaded', loadProducts);

