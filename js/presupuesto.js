// presupuesto.js: validación y cálculo en tiempo real
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
    // aplicar descuento según plazo: menos meses => recargo, más meses => descuento
    // ejemplo: si plazo <=1 sin descuento; 2-3 -> 5% descuento; 4-6 -> 10%; >6 -> 15%
    let discount = 0;
    if(months >= 2 && months <=3) discount = 0.05;
    else if(months >=4 && months <=6) discount = 0.10;
    else if(months > 6) discount = 0.15;
    let subtotal = base + extrasSum;
    let total = subtotal * (1 - discount);
    // redondear a 2 decimales
    total = Math.round(total*100)/100;
    presupuestoOut.value = total;
  }

  // recalcular al cambiar cualquier parámetro
  [producto,plazo,...extras].forEach(el => el.addEventListener('change', calcular));
  calcular();

  // validación al enviar
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
      // aquí podrías enviar por AJAX si quisieras
    } else {
      messages.style.color='crimson';
    }
  });

  // reset limpio
  form.addEventListener('reset', () => {
    setTimeout(() => { calcular(); messages.textContent=''; }, 10);
  });
});
