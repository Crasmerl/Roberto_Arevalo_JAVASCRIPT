
document.addEventListener('DOMContentLoaded', () => {
  const nombre = document.getElementById('nombre');
  const apellidos = document.getElementById('apellidos');
  const telefono = document.getElementById('telefono');
  const email = document.getElementById('email');
  const producto = document.getElementById('producto');
  const plazo = document.getElementById('plazo');
  const extras = Array.from(document.querySelectorAll('.extra'));
  const presupuestoOut = document.getElementById('presupuesto');
  const form = document.getElementById('budget-form');
  const acepto = document.getElementById('acepto');
  const messages = document.getElementById('form-messages');

  function validarTextoSoloLetras(el, maxLength) {
    const re = /^[A-Za-zÀ-ÿ\s]+$/;
    return re.test(el.value) && el.value.length <= maxLength;
  }
  function validarTelefono(el) {
    const re = /^\d{1,9}$/;
    return re.test(el.value);
  }

  function calcular() {
    let base = Number(producto.value);
    let extrasSum = extras.filter(e=>e.checked).reduce((s,e)=>s+Number(e.value),0);
    let months = Number(plazo.value) || 1;
    let subtotal = (base + extrasSum) * months;
    let total = subtotal;
    total = Math.round(total*100)/100;
    presupuestoOut.textContent = total;
  }

  [producto,plazo,...extras].forEach(el => el.addEventListener('change', calcular));
  [producto,plazo,...extras].forEach(el => el.addEventListener('input', calcular));
  calcular();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    messages.textContent = '';
    let ok = true;
    if(!validarTextoSoloLetras(nombre,15)) { ok=false; messages.textContent += 'Nombre inválido. '; }
    if(!validarTextoSoloLetras(apellidos,40)) { ok=false; messages.textContent += 'Apellidos inválidos. '; }
    if(!validarTelefono(telefono)) { ok=false; messages.textContent += 'Teléfono inválido. '; }
    if(!email.checkValidity()) { ok=false; messages.textContent += 'Email inválido. '; }
    if(!acepto.checked) { ok=false; messages.textContent += 'Debes aceptar las condiciones. '; }

    if(ok) {
      messages.style.color='green';
      messages.textContent = 'Formulario enviado correctamente (simulado). Presupuesto: ' + presupuestoOut.value + ' €';
    } else {
      messages.style.color='crimson';
    }
  });

  form.addEventListener('reset', () => {
    setTimeout(() => { calcular(); messages.textContent=''; }, 10);
  });
});
