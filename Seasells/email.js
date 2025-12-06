/* email.js - helper to craft mailto links from form fields */
function sendOrder(formId, productName){
  const f = document.getElementById(formId);
  const name = encodeURIComponent(f.querySelector('[name=name]').value || '');
  const phone = encodeURIComponent(f.querySelector('[name=phone]').value || '');
  const note = encodeURIComponent(f.querySelector('[name=note]').value || '');
  const subject = encodeURIComponent('Order - ' + productName);
  const body = encodeURIComponent('Hi Koushik,\n\nI would like to order: ' + productName + '\n\nName: ')+name+encodeURIComponent('\nPhone: ')+phone+encodeURIComponent('\nNote: ')+note;
  window.location.href = `mailto:koushik.flink@gmail.com?subject=${subject}&body=${body}`;
}
