
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

//////////////////////////////// Watch Project youtube
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach(card => {
    const button = card.querySelector(".toggleVideoBtn");
    const videoDiv = card.querySelector(".project-video");
    const thumbnail = card.querySelector(".project-thumbnail");
    const iframe = videoDiv.querySelector("iframe");
    const videoSrc = iframe.src; // store original src

    button.addEventListener("click", () => {
      if (videoDiv.style.display === "none") {
        // Show video, hide thumbnail
        videoDiv.style.display = "block";
        thumbnail.style.display = "none";
        iframe.src = videoSrc;
        button.textContent = "Hide";
        
      } else {
        // Hide video, show thumbnail and stop playback
        videoDiv.style.display = "none";
        thumbnail.style.display = "block";
        iframe.src = "";
        button.textContent = "Watch";
      }
    });
  });
});


////////////////////////////////////////////////

const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            if (navLinks.classList.contains('show')) {
                menuToggle.textContent = 'x'; // change to close icon
            } else {
                menuToggle.textContent = '☰'; // change back to hamburger
            }
        });

        document.getElementById('darkModeToggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        window.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
            }
        });


        // Navigation click logic to switch sections
        const links = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('.page-section');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.textContent.trim().toLowerCase() + 'Section';

                sections.forEach(sec => sec.classList.remove('active'));
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }

                // Hide menu after click (mobile UX)
                navLinks.classList.remove('show');
                menuToggle.textContent = '☰';
            });
        });

        document.addEventListener("DOMContentLoaded", function () {
            const images = document.querySelectorAll(".certificate img");

            images.forEach((img) => {
                img.addEventListener("click", function (e) {
                    e.stopPropagation(); // prevent it from triggering the document click
                    // Remove enlarged from other images
                    images.forEach(i => {
                        if (i !== img) i.classList.remove("enlarged");
                    });
                    // Toggle enlarged
                    img.classList.toggle("enlarged");
                });
            });

            // Click outside to close enlarged image
            document.addEventListener("click", function () {
                images.forEach(img => img.classList.remove("enlarged"));
            });
        });

        ///////////////////dark mode function and other 

