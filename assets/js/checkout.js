/*=============== FINALIZAR COMPRA ===============*/
/* Solo se usa en checkout.html. Necesita products.js (SHIPPING_COST)
   y main.js (getCart, saveCart, formatPrice y escapeHTML), cargados antes */

const checkoutForm = document.getElementById('checkout-form');
const checkoutError = document.getElementById('checkout-error');

function getShippingText() {
  return SHIPPING_COST === 0 ? 'Gratis' : formatPrice(SHIPPING_COST);
}

/* Resumen del pedido: lista corta de artículos y totales */
function renderOrderSummary() {
  const cart = getCart();

  document.getElementById('checkout-full').hidden = cart.length === 0;
  document.getElementById('checkout-empty').hidden = cart.length > 0;
  if (cart.length === 0) return;

  document.getElementById('checkout-items').innerHTML = cart
    .map((item) => `
      <li class="checkout__item">
        <span>${item.quantity} × ${escapeHTML(item.name)}</span>
        <span>${formatPrice(item.price * item.quantity)}</span>
      </li>`)
    .join('');

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  document.getElementById('checkout-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('checkout-shipping').textContent = getShippingText();
  document.getElementById('checkout-total').textContent = formatPrice(subtotal + SHIPPING_COST);
}

/* Revisa los campos en orden y devuelve el primer error (o '' si todo está bien) */
function validateCheckout() {
  const fields = checkoutForm.elements;

  if (!fields.fullname.value.trim()) return 'Escribe tu nombre completo.';
  if (!fields.email.checkValidity()) return 'Escribe un correo electrónico válido.';
  /* Celular colombiano: 10 dígitos que empiezan por 3 */
  if (!/^3\d{9}$/.test(fields.phone.value.replace(/\s/g, ''))) {
    return 'Escribe un celular de 10 dígitos que empiece por 3.';
  }
  if (!fields.address.value.trim()) return 'Escribe la dirección de entrega.';
  if (!fields.district.value.trim()) return 'Escribe el barrio o la localidad.';
  return '';
}

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const error = validateCheckout();
  checkoutError.textContent = error;
  if (error) return;

  const fields = checkoutForm.elements;
  /* Número de pedido de demostración a partir de la fecha y hora */
  const orderNumber = 'CF-' + Date.now().toString().slice(-6);
  const firstName = fields.fullname.value.trim().split(' ')[0];

  document.getElementById('checkout-done-title').textContent = `¡Gracias por tu pedido, ${firstName}!`;
  document.getElementById('checkout-done-text').textContent =
    `Tu número de pedido es ${orderNumber}. Pago elegido: ${fields.payment.value}. ` +
    `Te escribiremos a ${fields.email.value} para coordinar la entrega.`;

  saveCart([]);
  document.getElementById('checkout-full').hidden = true;
  document.getElementById('checkout-done').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderOrderSummary();
