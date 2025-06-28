const toggleButton = document.getElementById('darkModeToggle');

function updateIcon() {
  toggleButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  updateIcon();
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
  updateIcon();
});
