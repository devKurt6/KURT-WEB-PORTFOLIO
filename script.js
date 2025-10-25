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

/************************** */
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".zoom-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.remove("animate-zoom-in");
      entry.target.classList.remove("animate-zoom-out");
      if (entry.isIntersecting) {
        // Add animation when visible
        
        entry.target.classList.add("animate-zoom-in");
      } else {
        // Remove animation when hidden (so it can replay)
        entry.target.classList.add("animate-zoom-out");
      }
    });
  }, { threshold: 0.3 }); // Trigger at 20% visibility

  images.forEach(img => observer.observe(img));
});

/********************************************************************** */
document.addEventListener("DOMContentLoaded", () => {
  const textElements = document.querySelectorAll(".slide-in-elliptic-top-fwd");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.remove("bounce-top");
      
      if (entry.isIntersecting) {
        // Add animation when visible
        
        entry.target.classList.add("bounce-top");
      } else {
        // Remove animation when hidden (so it can replay)
        entry.target.classList.remove("bounce-top");
      }
    });
  }, { threshold: 0.3 }); // Trigger at 20% visibility

  textElements.forEach(txt => observer.observe(txt));
});