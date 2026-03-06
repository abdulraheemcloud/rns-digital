document.addEventListener('DOMContentLoaded', function () {

  // FIX 1: Strip query string + hash before matching active nav link
  const page = window.location.pathname.split('/').pop().split('?')[0] || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('?')[0];
    if (href === page) a.classList.add('active');
  });

  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      overlay.classList.toggle('open');
      const o = navLinks.classList.contains('open');
      document.body.style.overflow = o ? 'hidden' : '';
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = o ? 'rotate(45deg) translate(5px,5px)' : '';
      spans[1].style.opacity   = o ? '0' : '1';
      spans[2].style.transform = o ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });

    overlay.addEventListener('click', () => {
      navLinks.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '1';
      spans[2].style.transform = '';
    });

    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  // FIX 2: Removed typo '.wyg-card' (was duplicate of '.why-card', causing no-match selector noise)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.portfolio-card,.why-card,.process-step,.include-item,.pricing-card,.suitability-item,.support-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    io.observe(el);
  });

  // FIX 3: Use innerHTML instead of textContent so the SVG icon inside the button is preserved
  const form = document.getElementById('contact-form');
  if (form) {
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn ? btn.innerHTML : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn) {
        btn.innerHTML = 'Sending…';
        btn.disabled = true;
      }
      setTimeout(() => {
        const formFields = document.getElementById('form-fields');
        const formSuccess = document.getElementById('form-success');
        if (formFields) formFields.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
        // Reset button in case user navigates back
        if (btn) { btn.innerHTML = originalHTML; btn.disabled = false; }
      }, 1400);
    });
  }

  const nb = document.querySelector('.navbar');
  if (nb) window.addEventListener('scroll', () => {
    nb.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,.25)' : 'none';
  }, { passive: true });

  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => item.classList.toggle('open'));
  });
});