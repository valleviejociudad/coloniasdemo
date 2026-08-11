// =============================================
//  COLONIAS DE VERANO 2027 — App JS
// =============================================

const history = [];
let pasoActual = 1;

/** Navega a una pantalla por su ID */
function goTo(screenId) {
  const current = document.querySelector('.screen.active');
  if (current) {
    history.push(current.id);
    current.classList.remove('active');
  }
  const next = document.getElementById(screenId);
  if (next) next.classList.add('active');

  // Si va al registro, siempre resetea al paso 1
  if (screenId === 'screen-registro') {
    irPaso(1, false);
    document.getElementById('registro-scroll').scrollTop = 0;
  }
}

/** Vuelve a la pantalla anterior */
function goBack() {
  if (history.length === 0) return;
  const prevId = history.pop();
  const current = document.querySelector('.screen.active');
  if (current) current.classList.remove('active');
  const prev = document.getElementById(prevId);
  if (prev) prev.classList.add('active');
}

/** Cancela el registro y vuelve atrás sin guardar historial extra */
function cancelarRegistro() {
  goBack();
}

/** Cambia el tab activo en la lista de fichas */
function setTab(el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

/** Filtra la lista de fichas por nombre */
function filterList() {
  const query = document.getElementById('search-input').value.toLowerCase();
  document.querySelectorAll('.ficha-item').forEach(item => {
    const name = item.querySelector('.ficha-name').textContent.toLowerCase();
    item.style.display = name.includes(query) ? '' : 'none';
  });
}

/** Imprime / guarda como PDF */
function imprimirFicha() {
  window.print();
}

// =============================================
//  OBSERVACIONES
// =============================================

/** Alterna entre modo lectura y modo edición en Observaciones */
function toggleEditObs() {
  const view = document.getElementById('obs-view');
  const edit = document.getElementById('obs-edit');
  const isEditing = !edit.classList.contains('hidden');
  if (isEditing) {
    view.classList.remove('hidden');
    edit.classList.add('hidden');
  } else {
    view.classList.add('hidden');
    edit.classList.remove('hidden');
    document.getElementById('obs-textarea-input').focus();
  }
}

/** Guarda el texto de observaciones y vuelve al modo lectura */
function guardarObs() {
  const newText = document.getElementById('obs-textarea-input').value.trim();
  const view    = document.getElementById('obs-view');
  const edit    = document.getElementById('obs-edit');

  // Actualizar los párrafos de texto en la vista
  const paras = view.querySelectorAll('.obs-text');
  const lines  = newText.split('\n\n').filter(l => l.trim());
  paras.forEach((p, i) => { p.textContent = lines[i] || ''; });

  // Actualizar meta fecha
  const now = new Date();
  view.querySelector('.obs-meta').textContent =
    `Última actualización: ${now.toLocaleDateString('es-AR')} · Por coordinación`;

  view.classList.remove('hidden');
  edit.classList.add('hidden');
}

// =============================================
//  FORMULARIO MULTI-PASO
// =============================================

/** Navega entre pasos del formulario */
function irPaso(num, doScroll = true) {
  // Ocultar todos los pasos
  document.querySelectorAll('.reg-step-section').forEach(s => s.classList.add('hidden'));
  // Mostrar el paso actual
  const stepEl = document.getElementById('reg-step-' + num);
  if (stepEl) stepEl.classList.remove('hidden');

  // Actualizar los indicadores
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById('step-dot-' + i);
    if (!dot) continue;
    dot.classList.remove('active', 'done');
    if (i < num) dot.classList.add('done');
    else if (i === num) dot.classList.add('active');
  }

  // Actualizar las líneas
  const lines = document.querySelectorAll('.reg-step-line');
  lines.forEach((line, idx) => {
    line.classList.toggle('done', idx < num - 1);
  });

  pasoActual = num;

  if (doScroll) {
    const scroll = document.getElementById('registro-scroll');
    if (scroll) scroll.scrollTop = 0;
  }
}

/** Muestra u oculta el detalle de alergias */
function toggleAlergiaDetalle(select) {
  const detalle = document.getElementById('reg-alergia-detalle');
  if (select.value === 'si') detalle.classList.remove('hidden');
  else detalle.classList.add('hidden');
}

/** Guarda la ficha y muestra el modal de éxito */
function guardarFicha() {
  const nombre = document.getElementById('reg-nombre').value.trim();
  if (!nombre) {
    irPaso(1);
    alert('Por favor completá el nombre del niño/a.');
    document.getElementById('reg-nombre').focus();
    return;
  }

  // Mostrar modal de éxito
  document.getElementById('modal-nombre-guardado').textContent = nombre;
  document.getElementById('modal-exito').classList.remove('hidden');
}

/** Cierra el modal y regresa a la lista */
function cerrarModal() {
  document.getElementById('modal-exito').classList.add('hidden');
  // Volver a la lista limpiando el historial del registro
  while (history.length && history[history.length - 1] === 'screen-registro') {
    history.pop();
  }
  const current = document.querySelector('.screen.active');
  if (current) current.classList.remove('active');
  document.getElementById('screen-list').classList.add('active');
  history.length = 0; // reset history
  history.push('screen-splash');
}

// Tecla Escape = volver atrás
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('modal-exito');
    if (!modal.classList.contains('hidden')) {
      cerrarModal();
    } else {
      goBack();
    }
  }
});
