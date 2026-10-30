/*=============== INICIAR SESIÓN Y REGISTRO ===============*/
/* Solo se usa en login-register.html. Todavía no hay servidor:
   los formularios se revisan aquí y muestran un mensaje, pero los
   datos no se guardan ni se envían a ningún lado */

/* Muestra un error debajo del formulario (o lo borra si el texto está vacío) */
function showError(form, text) {
  form.querySelector('.form__error').textContent = text;
}

/* Cambia el formulario por un mensaje, como en la newsletter */
function showSuccess(form, text) {
  const message = document.createElement('p');
  message.className = 'form__success';
  message.textContent = text;
  form.replaceWith(message);
}

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  /* checkValidity() usa las reglas del HTML: required y type="email" */
  if (!loginForm.email.checkValidity()) {
    showError(loginForm, 'Escribe un correo electrónico válido.');
    return;
  }
  if (!loginForm.password.value) {
    showError(loginForm, 'Escribe tu contraseña.');
    return;
  }

  showSuccess(loginForm, '¡Bienvenido de nuevo a ChocoFeel!');
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  /* Se usa elements.name porque registerForm.name es el nombre del propio formulario */
  const name = registerForm.elements.name.value.trim();

  if (!name) {
    showError(registerForm, 'Escribe tu nombre.');
    return;
  }
  if (!registerForm.email.checkValidity()) {
    showError(registerForm, 'Escribe un correo electrónico válido.');
    return;
  }
  if (registerForm.password.value.length < 8) {
    showError(registerForm, 'La contraseña debe tener mínimo 8 caracteres.');
    return;
  }
  if (registerForm.password.value !== registerForm.confirm.value) {
    showError(registerForm, 'Las contraseñas no coinciden.');
    return;
  }
  if (!registerForm.terms.checked) {
    showError(registerForm, 'Debes aceptar los términos para crear la cuenta.');
    return;
  }

  showSuccess(registerForm, `¡Bienvenido, ${name}! Tu cuenta fue creada.`);
});
