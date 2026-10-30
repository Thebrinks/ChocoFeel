/*=============== CONTÁCTANOS ===============*/
/* Solo se usa en contact.html. No hay servidor que envíe correos: al enviar,
   se abre la aplicación de correo del cliente con el mensaje ya escrito
   (un enlace "mailto:" con asunto y texto) */
const CONTACT_EMAIL = 'juanpablofm809@gmail.com';
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = contactForm.elements;
  let error = '';

  if (!fields.fullname.value.trim()) error = 'Escribe tu nombre.';
  else if (!fields.email.checkValidity()) error = 'Escribe un correo electrónico válido.';
  else if (!fields.message.value.trim()) error = 'Escribe tu mensaje.';

  contactForm.querySelector('.form__error').textContent = error;
  if (error) return;

  const subject = `ChocoFeel - ${fields.subject.value}`;
  const body = `${fields.message.value.trim()}\n\n` +
    `Nombre: ${fields.fullname.value.trim()}\nCorreo: ${fields.email.value.trim()}`;

  /* encodeURIComponent convierte espacios, tildes y saltos de línea al formato de un enlace */
  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
