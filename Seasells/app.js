/* app.js - loads product list and renders cards */
// Products data embedded for local file:// protocol support
const productsData = [
  {
    "id": "001",
    "name": "Blue Stone Bracelet",
    "image": "1.jpg",
    "price": "20 AED",
    "category": "Bracelet",
    "desc": "Handmade blue stone beads on waxed cord."
  },
  {
    "id": "002",
    "name": "Sunset Charm",
    "image": "3.jpg",
    "price": "25 AED",
    "category": "Trinket",
    "desc": "Sunset-orange charm with brass accents."
  }
];

function loadProducts(){
  try{
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    productsData.forEach(p=>{
      const el = document.createElement('div');
      el.className = 'glass card';
      el.innerHTML = `
        <img src="products/${p.id}/${p.image || '1.jpg'}" alt="${p.name}" onerror="this.src='products/${p.id}/1.jpg'">
        <h3 style="margin:10px 0;color:var(--text-primary)">${p.name}</h3>
        <div class="meta">
          <div class="pill">${p.category || 'Bracelet'}</div>
          <div class="price">${p.price || '—'}</div>
        </div>
        <div style="margin-top:12px">
          <a class="btn" href="products/${p.id}/index.html">See More</a>
        </div>
      `;
      grid.appendChild(el);
    });
  }catch(e){
    console.error('Failed to load products',e);
    document.getElementById('product-grid').innerHTML = '<p class="center">No products found.</p>';
  }
}
document.addEventListener('DOMContentLoaded', loadProducts);
