/*=============== PÁGINA DEL CARRITO ===============*/
/* Solo se usa en cart.html. Necesita products.js y main.js
   (getCart, saveCart, formatPrice y escapeHTML), cargados antes */

const cartItems = document.getElementById('cart-items');

/* HTML de una fila del carrito */
function createCartRow(item) {
  const details = item.details
    .map((detail) => `<li>${escapeHTML(detail)}</li>`)
    .join('');

  return `
    <tr>
      <td>
        <div class="cart__product">
          <img src="${item.image}" alt="" class="cart__img">
          <div>
            <h3 class="cart__product-title">${escapeHTML(item.name)}</h3>
            <ul class="cart__details">${details}</ul>
          </div>
        </div>
      </td>
      <td data-label="Precio">${formatPrice(item.price)}</td>
      <td data-label="Cantidad">
        <div class="cart__quantity">
          <button type="button" class="cart__qty-btn" data-action="minus" data-key="${item.key}" aria-label="Quitar uno">-</button>
          <span>${item.quantity}</span>
          <button type="button" class="cart__qty-btn" data-action="plus" data-key="${item.key}" aria-label="Agregar uno">+</button>
        </div>
      </td>
      <td data-label="Subtotal" class="cart__subtotal">${formatPrice(item.price * item.quantity)}</td>
      <td>
        <button type="button" class="cart__remove" data-action="remove" data-key="${item.key}" aria-label="Eliminar ${escapeHTML(item.name)}">
          <i class="fi fi-rs-trash"></i>
        </button>
      </td>
    </tr>`;
}

/* Dibuja todo: filas, resumen, o el mensaje de carrito vacío */
function renderCart() {
  const cart = getCart();
  const isEmpty = cart.length === 0;

  document.getElementById('cart-full').hidden = isEmpty;
  document.getElementById('cart-empty').hidden = !isEmpty;
  if (isEmpty) return;

  cartItems.innerHTML = cart.map(createCartRow).join('');

  const units = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  document.getElementById('cart-count').textContent = units;
  document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('cart-shipping').textContent =
    SHIPPING_COST === 0 ? 'Gratis' : formatPrice(SHIPPING_COST);
  document.getElementById('cart-total').textContent = formatPrice(subtotal + SHIPPING_COST);
}

/* Botones +, - y eliminar (un solo listener para toda la tabla) */
cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  let cart = getCart();
  const item = cart.find((cartItem) => cartItem.key === button.dataset.key);

  if (button.dataset.action === 'plus') item.quantity += 1;
  if (button.dataset.action === 'minus') item.quantity -= 1;

  /* Si la cantidad llega a 0 o se pulsa eliminar, el artículo sale del carrito */
  if (button.dataset.action === 'remove' || item.quantity === 0) {
    cart = cart.filter((cartItem) => cartItem !== item);
  }

  saveCart(cart);
  renderCart();
});

document.getElementById('cart-clear').addEventListener('click', () => {
  if (confirm('¿Seguro que quieres vaciar el carrito?')) {
    saveCart([]);
    renderCart();
  }
});

renderCart();
