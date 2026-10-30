/*=============== TIENDA ===============*/
/* Solo se usa en shop.html. Necesita products.js (datos)
   y main.js (createProductCard), cargados antes */

const filtersForm = document.getElementById('shop-filters');
const searchInput = document.getElementById('shop-search');
const sortSelect = document.getElementById('shop-sort');

/* Botones de emoción: "Todas" + una por cada emoción de products.js */
const moodButtons = [{ id: 'todas', name: 'Todas' }, ...moods];

document.getElementById('shop-moods').innerHTML = moodButtons
  .map((mood) => `
    <label class="customize__option">
      <input type="radio" name="mood" value="${mood.id}" ${mood.id === 'todas' ? 'checked' : ''}>
      <span class="customize__chip">${mood.name}</span>
    </label>`)
  .join('');

/* Quita tildes y mayúsculas para que "pina" encuentre "Piña" */
function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/* Ordena una copia de la lista (sort cambiaría la original) */
function sortProducts(list, sort) {
  const copy = [...list];

  if (sort === 'price-asc') copy.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') copy.sort((a, b) => b.price - a.price);
  if (sort === 'name') copy.sort((a, b) => a.name.localeCompare(b.name, 'es'));

  return copy;
}

/* Aplica emoción + búsqueda + orden y dibuja las tarjetas */
function renderShop() {
  const mood = filtersForm.mood.value;
  const search = normalize(searchInput.value.trim());

  const filtered = products.filter((product) => {
    const matchesMood = mood === 'todas' || product.moods.includes(mood);
    const matchesSearch = normalize(product.name).includes(search);
    return matchesMood && matchesSearch;
  });

  const list = sortProducts(filtered, sortSelect.value);

  document.getElementById('shop-products').innerHTML = list
    .map((product) => createProductCard(product))
    .join('');

  document.getElementById('shop-count').textContent =
    list.length === 1 ? 'Encontramos 1 chocolate' : `Encontramos ${list.length} chocolates`;

  document.getElementById('shop-empty').hidden = list.length > 0;
}

/* Lee los filtros de la dirección: shop.html?mood=amor o shop.html?q=arequipe */
const params = new URLSearchParams(window.location.search);

if (params.get('q')) {
  searchInput.value = params.get('q');
}
if (moods.some((mood) => mood.id === params.get('mood'))) {
  filtersForm.querySelector(`input[value="${params.get('mood')}"]`).checked = true;
}

/* El buscador filtra mientras se escribe; Enter no recarga la página */
filtersForm.addEventListener('input', renderShop);
filtersForm.addEventListener('change', renderShop);
filtersForm.addEventListener('submit', (event) => event.preventDefault());

document.getElementById('shop-clear').addEventListener('click', () => {
  filtersForm.reset();
  renderShop();
});

renderShop();
