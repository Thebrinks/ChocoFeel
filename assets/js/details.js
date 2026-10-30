/*=============== DETALLE DEL PRODUCTO ===============*/
/* Solo se usa en details.html. Necesita products.js y main.js
   (createBadges, createPrices, createProductCard, addToCart...), cargados antes.
   El producto se elige con la dirección: details.html?id=flan */

const productId = new URLSearchParams(window.location.search).get('id');
const product = products.find((item) => item.id === productId);

const MAX_QUANTITY = 50;
let quantity = 1;

/* Junta nombres en una frase: ["alegría", "calma"] -> "alegría y calma" */
function joinWithY(names) {
  if (names.length === 1) return names[0];
  return names.slice(0, -1).join(', ') + ' y ' + names[names.length - 1];
}

/* Productos con alguna emoción en común (sin repetir el actual); si hay
   menos de 4, se completa con otros del catálogo */
function getRelated(current) {
  const others = products.filter((item) => item.id !== current.id);
  const sameMood = others.filter((item) => item.moods.some((mood) => current.moods.includes(mood)));
  const rest = others.filter((item) => !sameMood.includes(item));

  return [...sameMood, ...rest].slice(0, 4);
}

function renderDetails() {
  const productMoods = product.moods.map((id) => moods.find((mood) => mood.id === id));
  const moodNames = productMoods.map((mood) => mood.name.toLowerCase());

  document.title = `${product.name} | ChocoFeel`;
  document.getElementById('details-breadcrumb').textContent = product.name;

  const img = document.getElementById('details-img');
  img.src = product.image;
  img.alt = product.name;

  document.getElementById('details-badges').innerHTML = createBadges(product);
  document.getElementById('details-title').textContent = product.name;

  /* Cada emoción lleva a la tienda filtrada por esa emoción */
  document.getElementById('details-moods').innerHTML = productMoods
    .map((mood) => `<a href="shop.html?mood=${mood.id}" class="details__mood">${mood.name}</a>`)
    .join('');

  document.getElementById('details-price').innerHTML = createPrices(product);
  /* Solo se dice "pintado a mano" si el producto tiene decoración */
  const decoration = customOptions.decorations.find((item) => item.id === product.decoration);
  const painted = product.decoration !== 'sin-pintar';

  document.getElementById('details-description').textContent =
    `Bombón de chocolate artesanal${painted ? ', pintado a mano' : ''}, ` +
    `pensado para momentos de ${joinWithY(moodNames)}.`;
  document.getElementById('details-decoration').textContent = painted
    ? `Decoración: ${decoration.name.toLowerCase()}, con colorantes comestibles`
    : 'Sin pintar: el chocolate se luce tal como es';
  document.querySelector('[data-bonbon-size]').textContent = `${BONBON_SIZE_CM} cm y ${BONBON_WEIGHT_G} g`;
  document.getElementById('details-shipping').textContent =
    SHIPPING_COST === 0 ? 'gratis' : formatPrice(SHIPPING_COST);

  /* El corazón usa el mismo código de favoritos de main.js (data-wish) */
  const wish = document.getElementById('details-wish');
  wish.dataset.wish = product.id;
  wish.classList.toggle('is-wished', isWished(product.id));
  wish.setAttribute('aria-label', isWished(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos');

  document.getElementById('details-related').innerHTML = getRelated(product)
    .map((item) => createProductCard(item))
    .join('');
}

/*=============== CANTIDAD Y CARRITO ===============*/
const quantityText = document.getElementById('details-qty');

function changeQuantity(step) {
  quantity = Math.min(MAX_QUANTITY, Math.max(1, quantity + step));
  quantityText.textContent = quantity;
}

document.getElementById('details-minus').addEventListener('click', () => changeQuantity(-1));
document.getElementById('details-plus').addEventListener('click', () => changeQuantity(1));

document.getElementById('details-add').addEventListener('click', () => {
  const added = addToCart({
    key: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: quantity,
    details: [],
  });

  showToast(added
    ? `Agregaste ${quantity} × ${product.name} al carrito`
    : 'No se pudo guardar el carrito en este navegador');
});

/* Estado inicial: el producto, o un aviso si el id no existe */
document.getElementById('details-product').hidden = !product;
document.getElementById('details-related-section').hidden = !product;
document.getElementById('details-missing').hidden = Boolean(product);

if (product) renderDetails();
