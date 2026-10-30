/*=============== INICIAR SESIÓN Y REGISTRO ===============*/
/* Solo se usa en login-register.html. Todavía no hay servidor: los
   formularios se revisan aquí y la "sesión" se guarda en el navegador
   con saveUser (main.js). La contraseña nunca se guarda */

/* Muestra un error debajo del formulario (o lo borra si el texto está vacío) */
function showError(form, text) {
  form.querySelector('.form__error').textContent = text;
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

  /* Sin servidor no se puede comprobar la contraseña: si este navegador ya
     tiene una cuenta con ese correo se usa su nombre; si no, la primera parte
     del correo (laura@correo.co -> laura) */
  const email = loginForm.email.value.trim().toLowerCase();
  const savedUser = getUser();
  const user = savedUser && savedUser.email === email
    ? savedUser
    : { name: email.split('@')[0], email: email };

  saveUser(user);
  window.location.href = 'accounts.html';
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

  saveUser({ name: name, email: registerForm.email.value.trim().toLowerCase() });
  window.location.href = 'accounts.html';
});
