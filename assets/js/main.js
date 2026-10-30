/*=============== SHOW MENU ===============*/

/*===== CATEGORIES =====*/
/* Validate if constant exists */

/*===== CATEGORIES =====*/
/* Validate if constant exists */

/*=============== IMAGE GALLERY ===============*/

/*=============== DATOS GUARDADOS EN EL NAVEGADOR ===============*/
/* Van al principio porque las tarjetas (más abajo) ya los necesitan:
   una const no se puede usar antes de la línea donde se crea */
const CART_KEY = 'chocofeel-cart';
const WISHLIST_KEY = 'chocofeel-wishlist';
const USER_KEY = 'chocofeel-user';
const ORDERS_KEY = 'chocofeel-orders';

/* Lee una lista o un objeto guardado; si no hay nada (o está dañado) devuelve fallback */
function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value === null ? fallback : value;
  } catch (error) {
    return fallback;
  }
}

/* Guarda un valor; devuelve false si el navegador no lo permite */
function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

/*=============== PRODUCTS ===============*/
/* Evita que un texto escrito por el cliente (por ejemplo el mensaje de la
   tarjeta) se interprete como HTML al ponerlo con innerHTML */
function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* Convierte un número en precio: 5000 -> "$5.000 COP" */
function formatPrice(value) {
  return '$' + value.toLocaleString('es-CO', { useGrouping: 'always' }) + ' COP';
}

/* Etiquetas de la tarjeta: primero "Oferta" + % (si aplica) y luego el resto */
function createBadges(product) {
  let html = '';

  if (product.offer) {
    const discount = Math.round((1 - product.price / product.oldPrice) * 100);
    html += `
      <div class="badge-discount">
        <div class="badge ${BADGE_COLORS.Oferta}">Oferta</div>
        <div class="badge ${BADGE_COLORS.Oferta}">-${discount}%</div>
      </div>`;
  }

  product.badges.forEach((badge) => {
    html += `<div class="badge ${BADGE_COLORS[badge]}">${badge}</div>`;
  });

  return html;
}

/* Precio actual + precio anterior tachado (si tiene). Lo usan las
   tarjetas y el showcase */
function createPrices(product) {
  const oldPrice = product.oldPrice
    ? `<span class="old__price">${formatPrice(product.oldPrice)}</span>`
    : '';

  return `
    <span class="new__price">${formatPrice(product.price)}</span>
    ${oldPrice}`;
}

/* Nombres de las emociones de un producto: "Amor · Energía" */
function getMoodNames(product) {
  return product.moods
    .map((id) => moods.find((mood) => mood.id === id).name)
    .join(' · ');
}

/* Convierte una lista de ids en la lista de productos completos */
function findProducts(productIds) {
  return productIds.map((id) => products.find((product) => product.id === id));
}

/* HTML de una tarjeta de producto. extraClass sirve para añadir
   "swiper-slide" a las tarjetas que van dentro de un carrusel */
function createProductCard(product, extraClass = '') {
  return `
    <div class="product__item ${extraClass}">
      <div class="product__banner">
        <a href="details.html?id=${product.id}" class="product__images">
          <img src="${product.image}" loading="lazy" alt="${product.name}" class="product__img">
        </a>

        <div class="product__actions">
          <a href="details.html?id=${product.id}" class="action__btn" aria-label="Ver detalle">
            <i class="fi fi-rs-eye"></i>
          </a>
          <a href="#" class="action__btn wish__btn ${isWished(product.id) ? 'is-wished' : ''}" data-wish="${product.id}" aria-label="${isWished(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}">
            <i class="fi fi-rs-heart"></i>
          </a>
        </div>

        <div class="product__badge">${createBadges(product)}</div>
      </div>

      <div class="product__content">
        <span class="product__category">${getMoodNames(product)}</span>
        <a href="details.html?id=${product.id}">
          <h3 class="product__title">${product.name}</h3>
        </a>
        <div class="product__rating">
          <i class="fi fi-rs-star"></i>
          <i class="fi fi-rs-star"></i>
          <i class="fi fi-rs-star"></i>
          <i class="fi fi-rs-star"></i>
          <i class="fi fi-rs-star"></i>
        </div>
        <div class="product__price flex">${createPrices(product)}</div>

        <a href="#" class="action__btn cart__btn" data-id="${product.id}" aria-label="Agregar al carrito">
          <i class="fi fi-rs-shopping-bag-add"></i>
        </a>
      </div>
    </div>`;
}

/* Busca los productos de una sección (por id) y los dibuja en el contenedor */
function renderProducts(containerSelector, productIds, extraClass = '') {
  const container = document.querySelector(containerSelector);

  container.innerHTML = findProducts(productIds)
    .map((product) => createProductCard(product, extraClass))
    .join('');
}

/* HTML de un producto del showcase (versión pequeña: imagen, nombre y precio) */
function createShowcaseItem(product) {
  return `
    <div class="showcase__item">
      <a href="details.html?id=${product.id}" class="showcase__img-box">
        <img src="${product.image}" loading="lazy" alt="${product.name}" class="showcase__img">
      </a>
      <div class="showcase__content">
        <a href="details.html?id=${product.id}">
          <h4 class="showcase__title">${product.name}</h4>
        </a>
        <div class="showcase__price flex">${createPrices(product)}</div>
      </div>
    </div>`;
}

/* Igual que renderProducts, pero con la plantilla del showcase */
function renderShowcase(containerSelector, productIds) {
  const container = document.querySelector(containerSelector);

  container.innerHTML = findProducts(productIds)
    .map(createShowcaseItem)
    .join('');
}

/* main.js se carga en todas las páginas: cada bloque comprueba primero
   que su sección exista en la página actual (si no, se lo salta) */
if (document.getElementById('featured')) {
  renderProducts('#featured .products__container', sections.featured);
  renderProducts('#popular .products__container', sections.popular);
  renderProducts('#new-added .products__container', sections.newAdded);
  /* Las tarjetas del carrusel se dibujan antes de crear el Swiper (más abajo) */
  renderProducts('.new__container .swiper-wrapper', sections.newArrivals, 'swiper-slide');

  renderShowcase('#showcase-launches', showcase.launches);
  renderShowcase('#showcase-offers', showcase.offers);
  renderShowcase('#showcase-best-sellers', showcase.bestSellers);
  renderShowcase('#showcase-trending', showcase.trending);
}

/*=============== SWIPER FEATURES ===============*/
if (document.querySelector('.features__container')) {
  var swiperFeatured = new Swiper('.features__container', {
        spaceBetween: 24,
        loop: true,
        
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1400: {
            slidesPerView: 6,
            spaceBetween: 24,
          }, 
        },
      });
}

/*=============== SWIPER PRODUCTS ===============*/
if (document.querySelector('.new__container')) {
  var swiperProducts = new Swiper('.new__container', {
        spaceBetween: 24,
        loop: true,
        
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 24,
          }, 
        },
      });
}

/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('active-tab');
    });

    target.classList.add('active-tab');

    tabs.forEach((tab) => {
      tab.classList.remove('active-tab');
    });

    tab.classList.add('active-tab');
  });
});

/*=============== CARRITO (todas las páginas) ===============*/
/* El carrito se guarda en el navegador (localStorage) como una lista de:
   { key, name, image, price, quantity, details }
    - key: identifica el artículo (el id del producto o "caja-" + fecha)
    - price: precio de UNA unidad (un bombón o una caja completa)
    - details: textos extra que se muestran en el carrito (opciones de la caja) */
function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY));
    /* Solo se aceptan artículos con precio y cantidad (descarta datos viejos) */
    return Array.isArray(cart) ? cart.filter((item) => item.price && item.quantity) : [];
  } catch (error) {
    return [];
  }
}

/* Guarda el carrito y actualiza el número del ícono. Devuelve false si falla */
function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    return true;
  } catch (error) {
    return false;
  }
}

/* Si el artículo ya está en el carrito se suma la cantidad; si no, se agrega */
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find((cartItem) => cartItem.key === item.key);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  return saveCart(cart);
}

/* Número del ícono del carrito = total de unidades */
function updateCartCount() {
  const units = getCart().reduce((total, item) => total + item.quantity, 0);
  setHeaderCount('cart.html', units);
}

/* Pone un número en el ícono del header (carrito o favoritos); si es 0 lo oculta */
function setHeaderCount(href, number) {
  const count = document.querySelector(`.header__action-btn[href="${href}"] .count`);
  count.textContent = number;
  count.hidden = number === 0;
}

/* Mensaje corto que aparece abajo y se va solo después de 3 segundos */
function showToast(text) {
  let toast = document.querySelector('.toast');

  if (!toast) {
    toast = document.createElement('p');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    document.body.append(toast);
  }

  toast.textContent = text;
  toast.classList.add('show-toast');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => toast.classList.remove('show-toast'), 3000);
}

/* Botón de bolsa de las tarjetas de producto. Se escucha en "document"
   porque las tarjetas se crean con JavaScript (también en la tienda) */
document.addEventListener('click', (event) => {
  const button = event.target.closest('.cart__btn[data-id]');
  if (!button) return;

  event.preventDefault();
  const product = products.find((item) => item.id === button.dataset.id);

  const added = addToCart({
    key: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: 1,
    details: [],
  });

  showToast(added ? `Agregaste ${product.name} al carrito` : 'No se pudo guardar el carrito en este navegador');
});

updateCartCount();

/*=============== FAVORITOS (todas las páginas) ===============*/
/* Se guardan en el navegador como una lista de ids de productos (WISHLIST_KEY) */
function getWishlist() {
  try {
    const list = JSON.parse(localStorage.getItem(WISHLIST_KEY));
    return Array.isArray(list) ? list : [];
  } catch (error) {
    return [];
  }
}

function isWished(productId) {
  return getWishlist().includes(productId);
}

/* Si el producto está en favoritos lo quita; si no, lo agrega.
   Devuelve true si quedó en favoritos */
function toggleWishlist(productId) {
  let list = getWishlist();
  const wished = list.includes(productId);

  list = wished ? list.filter((id) => id !== productId) : [...list, productId];

  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  } catch (error) {
    return wished;
  }
  updateWishlistCount();
  return !wished;
}

function updateWishlistCount() {
  setHeaderCount('wishlist.html', getWishlist().length);
}

/* Botón de corazón de las tarjetas */
document.addEventListener('click', (event) => {
  const button = event.target.closest('.wish__btn[data-wish]');
  if (!button) return;

  event.preventDefault();
  const productId = button.dataset.wish;
  const product = products.find((item) => item.id === productId);
  const wished = toggleWishlist(productId);

  /* Un producto puede aparecer varias veces en la página (pestañas, carrusel) */
  document.querySelectorAll(`.wish__btn[data-wish="${productId}"]`).forEach((btn) => {
    btn.classList.toggle('is-wished', wished);
    btn.setAttribute('aria-label', wished ? 'Quitar de favoritos' : 'Agregar a favoritos');
  });

  showToast(wished ? `Agregaste ${product.name} a favoritos` : `Quitaste ${product.name} de favoritos`);
});

updateWishlistCount();

/*=============== SESIÓN (todas las páginas) ===============*/
/* No hay servidor: "iniciar sesión" guarda en el navegador el nombre y los
   datos del cliente (nunca la contraseña). Sirve para mostrar "Mi cuenta",
   los pedidos y llenar solo los datos al finalizar la compra */
function getUser() {
  return readStorage(USER_KEY, null);
}

function saveUser(user) {
  return writeStorage(USER_KEY, user);
}

function logout() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    /* Si el navegador no deja borrar, no hay sesión que cerrar */
  }
}

/* Pedidos confirmados en checkout.html (el más reciente primero) */
function getOrders() {
  const orders = readStorage(ORDERS_KEY, []);
  return Array.isArray(orders) ? orders : [];
}

/* Con sesión iniciada, el enlace de arriba saluda y lleva a "Mi cuenta" */
const topAction = document.querySelector('.header__top-action');
const currentUser = getUser();

if (topAction && currentUser) {
  topAction.textContent = `Hola, ${currentUser.name.split(' ')[0]} · Mi cuenta`;
  topAction.href = 'accounts.html';
}

/*=============== BUSCADOR DEL HEADER ===============*/
/* Lleva a la tienda con lo escrito en la dirección: shop.html?q=arequipe
   (shop.js lee ese "q" y filtra los productos) */
const headerSearch = document.querySelector('.header__search .form__input');
const headerSearchBtn = document.querySelector('.header__search .search__btn');

function goToSearch() {
  const text = headerSearch.value.trim();
  window.location.href = text ? `shop.html?q=${encodeURIComponent(text)}` : 'shop.html';
}

headerSearchBtn.addEventListener('click', goToSearch);
headerSearch.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') goToSearch();
});

/*=============== NEWSLETTER ===============*/
/* Todavía no hay servidor que guarde los correos: al enviar el formulario
  se evita que la página se recargue y se muestra un mensaje de gracias.
  El navegador ya comprueba que el correo sea válido (type="email" required) */
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = document.createElement('p');
    message.className = 'newsletter__success';
    message.textContent = '¡Gracias por unirte! Pronto recibirás nuestras dulces novedades.';

    newsletterForm.replaceWith(message);
  });
}
