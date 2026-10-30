/*=============== PÁGINA DE FAVORITOS ===============*/
/* Solo se usa en wishlist.html. Necesita products.js y main.js
   (getWishlist, findProducts y createProductCard), cargados antes */

function renderWishlist() {
  const list = findProducts(getWishlist()).filter(Boolean);

  document.getElementById('wishlist-products').innerHTML = list
    .map((product) => createProductCard(product))
    .join('');
  document.getElementById('wishlist-empty').hidden = list.length > 0;
}

/* Al quitar un favorito (main.js ya lo quitó de la lista), se vuelve a dibujar */
document.addEventListener('click', (event) => {
  if (event.target.closest('.wish__btn')) renderWishlist();
});

renderWishlist();
