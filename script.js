document.addEventListener("DOMContentLoaded", () => {
  /** -------------------------------
   * Scroll Reveal Animations
   ---------------------------------*/
  const revealTargets = document.querySelectorAll(".reveal-target");
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  revealTargets.forEach(target => observer.observe(target));

  /** -------------------------------
   * Navigation Active State
   ---------------------------------*/
  const sections = document.querySelectorAll("section[id], main[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const navHeight = 80;

  function updateNavActive() {
    let currentSection = "";
    let minDistance = Infinity;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight + 200;
      const sectionMidpoint = sectionTop + sectionHeight / 2;
      const viewportMidpoint = window.scrollY + window.innerHeight / 2;
      const distance = Math.abs(viewportMidpoint - sectionMidpoint);

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        if (distance < minDistance) {
          minDistance = distance;
          currentSection = section.getAttribute("id");
        }
      }
    });

    if (window.scrollY < (sections[0]?.offsetTop || 0) - navHeight + 50) {
      currentSection = "home";
    }

    navLinks.forEach(link => {
      link.classList.remove("nav-link-active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("nav-link-active");
      }
    });
  }

  updateNavActive();
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNavActive();
        ticking = false;
      });
      ticking = true;
    }
  });
  window.addEventListener("resize", updateNavActive);

  /** -------------------------------
   * Menu Toggle
   ---------------------------------*/
  const menuButton = document.getElementById("menu-button");
  const navPill = document.querySelector(".nav-pill");
  if (menuButton && navPill) {
    menuButton.addEventListener("click", () => {
      const isExpanded = navPill.classList.toggle("active");
      menuButton.setAttribute("aria-expanded", isExpanded);
    });
  }

  /** -------------------------------
   * Contact Form Mailto
   ---------------------------------*/
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const emailBody = `Name: ${name} \nEmail:(${email}) \n\n${message}`;
      const encodedBody = encodeURIComponent(emailBody);
      const mailtoLink = `mailto:viabiancacelis@gmail.com?subject=Contact%20Form%20Submission&body=${encodedBody}`;

      window.location.href = mailtoLink;
      contactForm.reset();
    });
  }

  /** -------------------------------
   * Badge Card Scroll & Flip
   ---------------------------------*/
  const badges = document.querySelector(".badges");
  if (badges) {
    const prevNav = document.querySelector(".badge-nav.prev");
    const nextNav = document.querySelector(".badge-nav.next");
    if (prevNav) prevNav.addEventListener("click", () => badges.scrollBy({ left: -150, behavior: "smooth" }));
    if (nextNav) nextNav.addEventListener("click", () => badges.scrollBy({ left: 150, behavior: "smooth" }));
  }


  /** -------------------------------
   * Scroll-to-Top Button
   ---------------------------------*/
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("show", window.scrollY > 300);
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
