// =============================================
//  COLONIAS DE VERANO — App JS
// =============================================

const history = [];

/**
 * Navega a una pantalla por su ID
 * @param {string} screenId
 */
function goTo(screenId) {
  const current = document.querySelector('.screen.active');
  if (current) {
    history.push(current.id);
    current.classList.remove('active');
  }
  const next = document.getElementById(screenId);
  if (next) next.classList.add('active');
}

/**
 * Vuelve a la pantalla anterior
 */
function goBack() {
  if (history.length === 0) return;
  const prevId = history.pop();
  const current = document.querySelector('.screen.active');
  if (current) current.classList.remove('active');
  const prev = document.getElementById(prevId);
  if (prev) prev.classList.add('active');
}

/**
 * Cambia el tab activo en la lista de fichas
 */
function setTab(el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

/**
 * Filtra la lista de fichas por nombre
 */
function filterList() {
  const query = document.getElementById('search-input').value.toLowerCase();
  document.querySelectorAll('.ficha-item').forEach(item => {
    const name = item.querySelector('.ficha-name').textContent.toLowerCase();
    item.style.display = name.includes(query) ? '' : 'none';
  });
}

/**
 * Abre el diálogo de impresión del navegador
 * (Ctrl+P → Guardar como PDF funciona de forma nativa)
 */
function imprimirFicha() {
  window.print();
}

// Tecla Escape = volver atrás
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') goBack();
});
