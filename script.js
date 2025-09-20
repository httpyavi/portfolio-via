document.addEventListener("DOMContentLoaded", () => {
const roles = [
  "an Ambitious IT Student",
  "a Passionate Designer",
  "a Visionary Dreamer",
  "a Frontend Developer",
  "a Curious Data Analyst"
];

const achievements = [
  "🤵 SIT Department Secretary, 2024-2025",
  "🏅 3rd Place, SIT WEEK 2024 Speed Programming Competition",
  "🌟 Best in C++ Programming, Academic Excellence Award (PARANGAL 2024)",
  "🧠 7th Place, National iSITE Quiz Bee",
  "🏅 3rd Place, SIT WEEK 2025 Speed Programming Competition",
  "🎨 Champion, SIT WEEK 2025 Graphic Design Competition"
];

const roleElement = document.getElementById("role");
const achievementElement = document.getElementById("achievement-display");

if (!roleElement || !achievementElement) {
  console.error("Role or Achievement element not found");
  return;
}

/**
 * Generic updater for text with flip/fade animations
 * @param {HTMLElement} element - target element
 * @param {string[]} items - array of strings
 * @param {string} outClass - class for "out" animation
 * @param {string} inClass - class for "in" animation
 * @param {number} interval - time between changes in ms
 */
function createTextCarousel(element, items, outClass, inClass, interval) {
  let index = 0;

  const update = async () => {
    element.classList.add(outClass);
    await new Promise(resolve => setTimeout(resolve, 500)); // matches CSS transition

    element.textContent = items[index];
    element.classList.remove(outClass);
    element.classList.add(inClass);
    await new Promise(resolve => setTimeout(resolve, 500));

    element.classList.remove(inClass);
    index = (index + 1) % items.length;
  };

  update(); // initial call
  return setInterval(update, interval);
}

// Start the carousels
createTextCarousel(roleElement, roles, "flip-out", "flip-in", 3000);
createTextCarousel(achievementElement, achievements, "fade-out", "fade-in", 3000);

// Scroll-driven reveal animations
const revealTargets = document.querySelectorAll('.reveal-target');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-active');
    } else {
      entry.target.classList.remove('reveal-active'); // Remove class when out of view
    }
  });
}, observerOptions);

revealTargets.forEach(target => {
  observer.observe(target);
});

// Navigation active state on scroll
const sections = document.querySelectorAll('section[id], main[id]');
const navLinks = document.querySelectorAll('.nav-link');

// Debug: Log sections to ensure Works is included
sections.forEach(section => {
  console.log(`Observing section: ${section.getAttribute('id')}`);
});

const navObserverOptions = {
  root: null,
  threshold: [0.1, 0.3, 0.5], // Multiple thresholds for better detection
  rootMargin: '-80px 0px -40% 0px' // Adjusted for fixed header and section height
};

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute('id');
      console.log(`Section in view: ${sectionId}`); // Debug: Log visible section
      navLinks.forEach(link => {
        link.classList.remove('nav-link-active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('nav-link-active');
        }
      });
    }
  });
}, navObserverOptions);

sections.forEach(section => {
  navObserver.observe(section);
});

// Fallback: Highlight Home on page load or if at top
window.addEventListener('scroll', () => {
  if (window.scrollY < 100) {
    navLinks.forEach(link => {
      link.classList.remove('nav-link-active');
      if (link.getAttribute('href') === '#home') {
        link.classList.add('nav-link-active');
      }
    });
  }
});

const menuButton = document.getElementById('menu-button');
const navPill = document.querySelector('.nav-pill');

menuButton.addEventListener('click', () => {
    navPill.classList.toggle('active');
});

  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Construct the custom email body
      const emailBody = `Name: ${name} \nEmail:(${email}) \n\n${message}`;
      const encodedBody = encodeURIComponent(emailBody);
      const mailtoLink = `mailto:viabiancacelis@gmail.com?subject=Contact%20Form%20Submission&body=${encodedBody}`;

      // Open email client
      window.location.href = mailtoLink;

      // Optional: Reset form after submission
      contactForm.reset();
    });
  } else {
    console.error("Contact form not found");
  }
});
