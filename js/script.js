document.getElementById('data').textContent = new Date().getFullYear();
document.getElementById('formContacte').addEventListener('submit', (e) => {
  alert('Gràcies! El teu missatge s’ha enviat.');
  e.preventDefault();
});
// Añade botón en HTML y cambia clase en <body>
