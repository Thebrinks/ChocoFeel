/*=============== ARMADOR DE BOMBONES ===============*/
/* Solo se usa en customize.html. Necesita products.js (datos)
   y main.js (formatPrice, findProducts), cargados antes */

/* Color de cada tipo de chocolate en la vista previa */
const CHOCOLATE_COLORS = {
  leche: '#8a5a3b',
  oscuro: '#4a2c1d',
  blanco: '#f3e6cf',
};

const form = document.getElementById('customize-form');

/* Busca una opción por su id dentro de una lista de customOptions */
function findOption(list, id) {
  return list.find((option) => option.id === id);
}

/* Texto del recargo: "+$1.000 COP" o nada si no tiene */
function extraText(extra) {
  return extra > 0 ? `<span class="customize__extra">+${formatPrice(extra)}</span>` : '';
}

/* HTML de una opción tipo "botón": un radio (o checkbox) escondido + su etiqueta.
   Se usa <input> para que funcione con teclado y lectores de pantalla */
function createOption(name, option, type = 'radio', checked = false) {
  return `
    <label class="customize__option">
      <input type="${type}" name="${name}" value="${option.id}" ${checked ? 'checked' : ''}>
      <span class="customize__chip">
        ${option.name}
        ${extraText(option.extra)}
      </span>
    </label>`;
}

/* Las formas llevan la imagen del producto que tiene esa forma */
function createShapeOption(shape, checked) {
  const product = findProducts([shape.productId])[0];

  return `
    <label class="customize__option">
      <input type="radio" name="shape" value="${shape.id}" ${checked ? 'checked' : ''}>
      <span class="customize__shape">
        <img src="${product.image}" alt="" loading="lazy" class="customize__shape-img">
        ${shape.name}
      </span>
    </label>`;
}

/* Los colores se muestran como una muestra redonda con su nombre */
function createColorOption(color) {
  return `
    <label class="customize__option">
      <input type="checkbox" name="colors" value="${color.id}">
      <span class="customize__chip">
        <span class="customize__swatch" style="background-color: ${color.code}"></span>
        ${color.name}
      </span>
    </label>`;
}

/*=============== DIBUJAR LAS OPCIONES ===============*/
document.getElementById('mood-options').innerHTML = moods
  .map((mood) => createOption('mood', mood))
  .join('');

document.getElementById('shape-options').innerHTML = customOptions.shapes
  .map((shape, index) => createShapeOption(shape, index === 0))
  .join('');

document.getElementById('chocolate-options').innerHTML = customOptions.chocolates
  .map((chocolate, index) => createOption('chocolate', chocolate, 'radio', index === 0))
  .join('');

document.getElementById('filling-options').innerHTML = customOptions.fillings
  .map((filling, index) => createOption('filling', filling, 'radio', index === 0))
  .join('');

document.getElementById('decoration-options').innerHTML = customOptions.decorations
  .map((decoration, index) => createOption('decoration', decoration, 'radio', index === 0))
  .join('');

document.getElementById('color-options').innerHTML = customOptions.colors
  .map(createColorOption)
  .join('');

/* Las cajas no son objetos {id, name}: se crean a partir del número */
document.getElementById('box-options').innerHTML = customOptions.boxes
  .map((box) => createOption('box', { id: box, name: `${box} bombones` }, 'radio', box === 6))
  .join('');

/*=============== LEER LO QUE ELIGIÓ EL CLIENTE ===============*/
function getSelection() {
  const data = new FormData(form);

  return {
    mood: moods.find((mood) => mood.id === data.get('mood')),
    shape: findOption(customOptions.shapes, data.get('shape')),
    chocolate: findOption(customOptions.chocolates, data.get('chocolate')),
    filling: findOption(customOptions.fillings, data.get('filling')),
    decoration: findOption(customOptions.decorations, data.get('decoration')),
    colors: data.getAll('colors').map((id) => findOption(customOptions.colors, id)),
    box: Number(data.get('box')),
    message: data.get('message').trim(),
  };
}

/* Precio de un bombón = precio base + todos los recargos */
function getUnitPrice(selection) {
  return BASE_PRICE
    + selection.shape.extra
    + selection.chocolate.extra
    + selection.filling.extra
    + selection.decoration.extra;
}

/* Cuántos colores se pueden elegir según la decoración */
function getMaxColors(decorationId) {
  if (decorationId === 'sin-pintar') return 0;
  if (decorationId === 'un-color') return 1;
  return 3;
}

/*=============== COLORES SEGÚN LA DECORACIÓN ===============*/
const colorsBox = document.getElementById('colors-box');
const colorInputs = form.querySelectorAll('input[name="colors"]');

function updateColorLimit() {
  const max = getMaxColors(form.decoration.value);
  colorsBox.hidden = max === 0;

  /* Si hay más colores marcados que el máximo, se desmarcan los sobrantes */
  const checked = [...colorInputs].filter((input) => input.checked);
  checked.slice(max).forEach((input) => { input.checked = false; });

  /* Al llegar al máximo, los demás colores se bloquean */
  const full = Math.min(checked.length, max) >= max;
  colorInputs.forEach((input) => {
    input.disabled = full && !input.checked;
  });

  document.getElementById('colors-hint').textContent =
    max === 1 ? 'Elige 1 color.' : `Elige hasta ${max} colores.`;
}

/*=============== RESUMEN Y VISTA PREVIA ===============*/
/* Fondo de la vista previa: el color del chocolate y encima la pintura */
function getPaint(selection) {
  const base = CHOCOLATE_COLORS[selection.chocolate.id];
  const colors = selection.colors.map((color) => color.code);

  if (selection.decoration.id === 'sin-pintar' || colors.length === 0) return base;
  if (colors.length === 1) return colors[0];
  if (selection.decoration.id === 'especial') {
    return `conic-gradient(from 45deg, ${colors.join(', ')}, ${colors[0]})`;
  }
  return `linear-gradient(135deg, ${colors.join(', ')})`;
}

function updateSummary() {
  const selection = getSelection();
  const unitPrice = getUnitPrice(selection);
  const shapeProduct = findProducts([selection.shape.productId])[0];

  const colorNames = selection.colors.map((color) => color.name).join(', ');
  const rows = [
    ['Emoción', selection.mood ? selection.mood.name : 'Sin elegir'],
    ['Forma', selection.shape.name],
    ['Chocolate', selection.chocolate.name],
    ['Relleno', selection.filling.name],
    ['Decoración', selection.decoration.name],
    ['Colores', colorNames || 'Ninguno'],
  ];

  document.getElementById('summary-details').innerHTML = rows
    .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
    .join('');

  document.getElementById('preview-img').src = shapeProduct.image;
  document.getElementById('preview-paint').style.background = getPaint(selection);

  document.getElementById('unit-price').textContent = formatPrice(unitPrice);
  document.getElementById('box-quantity').textContent = `${selection.box} bombones`;
  document.getElementById('total-price').textContent = formatPrice(unitPrice * selection.box);
}

/*=============== SUGERENCIAS SEGÚN LA EMOCIÓN ===============*/
/* Junta nombres en una frase: ["A", "B", "C"] -> "A, B o C" */
function joinNames(names, word) {
  if (names.length === 1) return names[0];
  return names.slice(0, -1).join(', ') + ` ${word} ` + names[names.length - 1];
}

function applyMood(mood) {
  /* Marca los rellenos sugeridos con una etiqueta */
  form.querySelectorAll('input[name="filling"]').forEach((input) => {
    input.closest('.customize__option').classList.toggle('suggested', mood.fillings.includes(input.value));
  });

  /* Elige el primer relleno sugerido */
  form.querySelector(`input[name="filling"][value="${mood.fillings[0]}"]`).checked = true;

  /* Si el bombón estaba sin pintar, pasa a degradado para poder usar los colores */
  if (getMaxColors(form.decoration.value) < mood.colors.length) {
    form.querySelector('input[name="decoration"][value="degradado"]').checked = true;
  }

  /* Marca solo los colores sugeridos */
  colorInputs.forEach((input) => {
    input.checked = mood.colors.includes(input.value);
  });

  const fillingNames = mood.fillings.map((id) => findOption(customOptions.fillings, id).name.toLowerCase());
  const colorNames = mood.colors.map((id) => findOption(customOptions.colors, id).name.toLowerCase());
  document.getElementById('mood-hint').textContent =
    `Para ${mood.name.toLowerCase()} te sugerimos relleno de ${joinNames(fillingNames, 'o')} ` +
    `con colores ${joinNames(colorNames, 'y')}. Puedes cambiarlos cuando quieras.`;
}

/*=============== EVENTOS ===============*/
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('customize-success');

/* Cualquier cambio en el formulario actualiza el resumen */
form.addEventListener('change', (event) => {
  if (event.target.name === 'mood') {
    applyMood(moods.find((mood) => mood.id === event.target.value));
  }
  updateColorLimit();
  updateSummary();
  successMessage.textContent = '';
});

messageInput.addEventListener('input', () => {
  document.getElementById('message-count').textContent = messageInput.value.length;
});

/* La caja se agrega al carrito con addToCart (main.js). Cada caja es un
   artículo distinto, porque dos cajas pueden tener opciones diferentes */
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const selection = getSelection();
  const unitPrice = getUnitPrice(selection);

  const details = [
    `Forma: ${selection.shape.name}`,
    `Chocolate: ${selection.chocolate.name}`,
    `Relleno: ${selection.filling.name}`,
    `Decoración: ${selection.decoration.name}`,
  ];
  if (selection.colors.length > 0) {
    details.push(`Colores: ${selection.colors.map((color) => color.name).join(', ')}`);
  }
  if (selection.mood) {
    details.push(`Emoción: ${selection.mood.name}`);
  }
  if (selection.message) {
    details.push(`Mensaje: "${selection.message}"`);
  }

  const added = addToCart({
    key: `caja-${Date.now()}`,
    name: `Caja de ${selection.box} bombones personalizados`,
    image: findProducts([selection.shape.productId])[0].image,
    price: unitPrice * selection.box,
    quantity: 1,
    details: details,
  });

  successMessage.textContent = added
    ? '¡Listo! Agregamos tu caja al carrito.'
    : 'No se pudo guardar en este navegador. Inténtalo de nuevo.';
});

/* Estado inicial */
updateColorLimit();
updateSummary();
