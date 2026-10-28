/*=============== SHOW MENU ===============*/

/*===== CATEGORIES =====*/
/* Validate if constant exists */

/*===== CATEGORIES =====*/
/* Validate if constant exists */

/*=============== IMAGE GALLERY ===============*/

/*=============== PRODUCTS ===============*/
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
        <a href="details.html" class="product__images">
          <img src="${product.image}" loading="lazy" alt="${product.name}" class="product__img">
        </a>

        <div class="product__actions">
          <a href="#" class="action__btn" aria-label="Vista rápida">
            <i class="fi fi-rs-eye"></i>
          </a>
          <a href="#" class="action__btn" aria-label="Agregar a favoritos">
            <i class="fi fi-rs-heart"></i>
          </a>
          <a href="#" class="action__btn" aria-label="Comparar">
            <i class="fi fi-rs-shuffle"></i>
          </a>
        </div>

        <div class="product__badge">${createBadges(product)}</div>
      </div>

      <div class="product__content">
        <span class="product__category">Chocolates</span>
        <a href="details.html">
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

        <a href="#" class="action__btn cart__btn" aria-label="Agregar al carrito">
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
      <a href="details.html" class="showcase__img-box">
        <img src="${product.image}" loading="lazy" alt="${product.name}" class="showcase__img">
      </a>
      <div class="showcase__content">
        <a href="details.html">
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

renderProducts('#featured .products__container', sections.featured);
renderProducts('#popular .products__container', sections.popular);
renderProducts('#new-added .products__container', sections.newAdded);
/* Las tarjetas del carrusel se dibujan antes de crear el Swiper (más abajo) */
renderProducts('.new__container .swiper-wrapper', sections.newArrivals, 'swiper-slide');

renderShowcase('#showcase-launches', showcase.launches);
renderShowcase('#showcase-offers', showcase.offers);
renderShowcase('#showcase-best-sellers', showcase.bestSellers);
renderShowcase('#showcase-trending', showcase.trending);

/*=============== SWIPER FEATURES ===============*/
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

/*=============== SWIPER PRODUCTS ===============*/
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

/*=============== NEWSLETTER ===============*/
/* Todavía no hay servidor que guarde los correos: al enviar el formulario
  se evita que la página se recargue y se muestra un mensaje de gracias.
  El navegador ya comprueba que el correo sea válido (type="email" required) */
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = document.createElement('p');
  message.className = 'newsletter__success';
  message.textContent = '¡Gracias por unirte! Pronto recibirás nuestras dulces novedades.';

  newsletterForm.replaceWith(message);
});
