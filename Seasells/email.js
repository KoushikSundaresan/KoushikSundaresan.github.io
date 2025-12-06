/* email.js - helper to craft mailto links from form fields */
function sendOrder(formId, productName){
  const f = document.getElementById(formId);
  const name = encodeURIComponent(f.querySelector('[name=name]').value || '');
  const phone = encodeURIComponent(f.querySelector('[name=phone]').value || '');
  const note = encodeURIComponent(f.querySelector('[name=note]').value || '');
  
  // Get product name dynamically from meta tag if not provided
  if (!productName) {
    const metaTag = document.querySelector('meta[name="product-name"]');
    productName = metaTag ? metaTag.getAttribute('content') : 'Product';
  }
  
  const subject = encodeURIComponent('Order - ' + productName);
  const body = encodeURIComponent('Hi Koushik,\n\nI would like to order: ' + productName + '\n\nName: ')+name+encodeURIComponent('\nPhone: ')+phone+encodeURIComponent('\nNote: ')+note;
  window.location.href = `mailto:koushikflink@gmail.com?subject=${subject}&body=${body}`;
}
