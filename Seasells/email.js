/* email.js - helper to craft mailto links from form fields */
function sendOrder(formId, productName){
  const f = document.getElementById(formId);
  const name = encodeURIComponent(f.querySelector('[name=name]').value || '');
  const phone = encodeURIComponent(f.querySelector('[name=phone]').value || '');
  const note = encodeURIComponent(f.querySelector('[name=note]').value || '');
  
  // Get product name dynamically from page content if not provided
  if (!productName || productName === 'undefined' || productName === undefined) {
    // First, try to get from h2 heading in product-info section (most visible)
    const productInfo = document.querySelector('.product-info');
    if (productInfo) {
      const h2 = productInfo.querySelector('h2');
      if (h2 && h2.textContent && h2.textContent.trim()) {
        productName = h2.textContent.trim();
      }
    }
    
    // Fallback to meta tag if h2 not found
    if (!productName || productName === 'undefined' || productName === undefined) {
      let metaTag = document.querySelector('meta[name="product-name"]');
      if (!metaTag) {
        // Try searching through all meta tags
        const allMetaTags = document.getElementsByTagName('meta');
        for (let i = 0; i < allMetaTags.length; i++) {
          if (allMetaTags[i].getAttribute('name') === 'product-name') {
            metaTag = allMetaTags[i];
            break;
          }
        }
      }
      
      if (metaTag) {
        const metaContent = metaTag.getAttribute('content') || metaTag.content;
        if (metaContent && metaContent.trim()) {
          productName = metaContent.trim();
        }
      }
    }
    
    // Fallback to title if neither h2 nor meta tag found
    if (!productName || productName === 'undefined' || productName === undefined) {
      const titleParts = document.title.split(' — ');
      productName = (titleParts[0] && titleParts[0].trim()) || 'Product';
    }
  }
  
  // Final safeguard - ensure productName is never undefined
  if (!productName || productName === 'undefined' || productName === undefined) {
    productName = 'Product';
  }
  
  const subject = encodeURIComponent('Order - ' + productName);
  const body = encodeURIComponent('Hi Koushik,\n\nI would like to order: ' + productName + '\n\nName: ')+name+encodeURIComponent('\nPhone: ')+phone+encodeURIComponent('\nNote: ')+note;
  window.location.href = `mailto:koushikflink@gmail.com?subject=${subject}&body=${body}`;
}
