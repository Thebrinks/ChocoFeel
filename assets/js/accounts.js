/*=============== MI CUENTA ===============*/
/* Solo se usa en accounts.html. Necesita main.js (getUser, saveUser,
   logout, getOrders, formatPrice y escapeHTML), cargado antes */

const user = getUser();

document.getElementById('accounts-guest').hidden = Boolean(user);
document.getElementById('accounts-user').hidden = !user;

/*=============== PESTAÑAS ===============*/
/* Cada pestaña (botón con aria-controls) muestra su panel y oculta el otro */
const accountTabs = document.querySelectorAll('.accounts__tab[aria-controls]');

accountTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    accountTabs.forEach((otherTab) => {
      const selected = otherTab === tab;
      otherTab.classList.toggle('active-tab', selected);
      otherTab.setAttribute('aria-selected', selected);
      document.getElementById(otherTab.getAttribute('aria-controls')).hidden = !selected;
    });
  });
});

/*=============== PEDIDOS ===============*/
/* Fecha guardada en formato ISO -> "31 de octubre de 2026" */
function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function createOrderCard(order) {
  const items = order.items
    .map((item) => `<li>${item.quantity} × ${escapeHTML(item.name)}</li>`)
    .join('');

  return `
    <article class="accounts__order">
      <div class="accounts__order-header">
        <h4>Pedido ${order.number}</h4>
        <span>${formatDate(order.date)}</span>
      </div>
      <ul class="accounts__order-items">${items}</ul>
      <div class="accounts__order-footer">
        <span>Pago: ${escapeHTML(order.payment)}</span>
        <strong>Total: ${formatPrice(order.total)}</strong>
      </div>
    </article>`;
}

/* Solo se muestran los pedidos hechos con el correo de esta cuenta */
function renderOrders() {
  const orders = getOrders().filter((order) => order.email === user.email);

  document.getElementById('orders-list').innerHTML = orders.map(createOrderCard).join('');
  document.getElementById('orders-empty').hidden = orders.length > 0;
}

/*=============== MIS DATOS ===============*/
const profileForm = document.getElementById('profile-form');
const profileSaved = document.getElementById('profile-saved');

/* Llena el formulario con lo guardado (los campos vacíos quedan vacíos) */
function fillProfile() {
  const fields = profileForm.elements;

  fields.fullname.value = user.name;
  fields.email.value = user.email;
  fields.phone.value = user.phone || '';
  fields.address.value = user.address || '';
  fields.district.value = user.district || '';
}

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = profileForm.elements;
  const phone = fields.phone.value.replace(/\s/g, '');
  let error = '';

  if (!fields.fullname.value.trim()) error = 'Escribe tu nombre completo.';
  else if (!fields.email.checkValidity()) error = 'Escribe un correo electrónico válido.';
  /* El celular es opcional, pero si se escribe debe ser válido */
  else if (phone && !/^3\d{9}$/.test(phone)) error = 'Escribe un celular de 10 dígitos que empiece por 3.';

  profileForm.querySelector('.form__error').textContent = error;
  profileSaved.textContent = '';
  if (error) return;

  user.name = fields.fullname.value.trim();
  user.email = fields.email.value.trim().toLowerCase();
  user.phone = phone;
  user.address = fields.address.value.trim();
  user.district = fields.district.value.trim();

  if (saveUser(user)) {
    document.getElementById('accounts-name').textContent = user.name.split(' ')[0];
    topAction.textContent = `Hola, ${user.name.split(' ')[0]} · Mi cuenta`;
    profileSaved.textContent = 'Datos guardados.';
  } else {
    profileSaved.textContent = 'No se pudieron guardar los datos en este navegador.';
  }
});

/*=============== CERRAR SESIÓN ===============*/
document.getElementById('accounts-logout').addEventListener('click', () => {
  logout();
  window.location.href = 'index.html';
});

/* Estado inicial (solo si hay sesión) */
if (user) {
  document.getElementById('accounts-name').textContent = user.name.split(' ')[0];
  renderOrders();
  fillProfile();
}
