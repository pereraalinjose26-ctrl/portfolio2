// =============================================
// 1. NAVBAR: Change style when scrolling
// =============================================
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('mainNav');
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =============================================
// 2. ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function () {
  let current = '';

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// =============================================
// 3. BACK TO TOP BUTTON
// =============================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
  if (window.scrollY > 400) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================================
// 4. CONTACT FORM - Validation & Success Message
// =============================================
const contactForm = document.getElementById('contactForm');
const formMsg    = document.getElementById('formMsg');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('inputName').value.trim();
  const email   = document.getElementById('inputEmail').value.trim();
  const message = document.getElementById('inputMessage').value.trim();

  if (!name || !email || !message) {
    formMsg.innerHTML = '⚠️ Please fill in all the fields before sending!';
    formMsg.className = 'mt-3 text-center';
    formMsg.style.color = '#f50b0b';
    formMsg.classList.remove('d-none');
    return;
  }

  formMsg.innerHTML = '🎉 Thank you, <strong>' + name + '</strong>! Your message has been sent.';
  formMsg.className = 'mt-3 text-center';
  formMsg.style.color = '#e6351a';
  formMsg.classList.remove('d-none');

  contactForm.reset();

  setTimeout(function () {
    formMsg.classList.add('d-none');
  }, 5000);
});

// =============================================
// 5. SKILL BAR ANIMATION (triggers on scroll)
// =============================================
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;

  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    document.querySelectorAll('.skill-fill').forEach(function (bar) {
      const target = bar.getAttribute('data-width');
      bar.style.width = target;
    });
    skillsAnimated = true;
  }
}

// Listen on scroll
window.addEventListener('scroll', animateSkills);
// Also try on page load (in case user is already scrolled there)
window.addEventListener('load', animateSkills);

// =============================================
// 6. CUSTOM CURSOR TRACKING
// =============================================
const cursorDot = document.querySelector('.cursor-dot');

if (cursorDot) {
  window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
  });

  // Adding hover effect class toggling for non-CSS hover states if needed
  document.querySelectorAll('a, button, .clickable').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.width = '12px';
      cursorDot.style.height = '12px';
      cursorDot.style.backgroundColor = 'var(--secondary)';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.width = '8px';
      cursorDot.style.height = '8px';
      cursorDot.style.backgroundColor = 'var(--primary)';
    });
  });
}

// =============================================
// 7. ENHANCED SLIDE ANIMATIONS ON SCROLL
// =============================================
const enhancedObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: stop observing once visible
      // observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-up, .slide-left, .slide-right').forEach(function (el) {
  enhancedObserver.observe(el);
});

console.log('⚡ Portfolio loaded — Keep building, Parthiv!');
