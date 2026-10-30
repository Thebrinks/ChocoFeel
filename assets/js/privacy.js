/*=============== POLÍTICA DE PRIVACIDAD ===============*/
/* Solo se usa en privacy.html. El botón borra todo lo que la página guardó
   en este navegador: sesión, carrito, favoritos y pedidos (claves de main.js) */
document.getElementById('clear-data').addEventListener('click', () => {
  if (!confirm('Se borrarán tu sesión, tu carrito, tus favoritos y tus pedidos de este navegador. ¿Continuar?')) {
    return;
  }

  try {
    [USER_KEY, CART_KEY, WISHLIST_KEY, ORDERS_KEY].forEach((key) => localStorage.removeItem(key));
    document.getElementById('clear-data-message').textContent = 'Listo: borramos tus datos de este navegador.';
  } catch (error) {
    document.getElementById('clear-data-message').textContent = 'Este navegador no permitió borrar los datos.';
  }

  updateCartCount();
  updateWishlistCount();
});
