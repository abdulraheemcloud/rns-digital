document.addEventListener('DOMContentLoaded', function () {

  /* ── Active Nav Link ─────────────────────────────────── */
  const page = window.location.pathname.split('/').pop().split('?')[0] || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('?')[0];
    if (href === page) a.classList.add('active');
  });

  /* ── Mobile Nav Toggle ───────────────────────────────── */
  const toggle   = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  let overlay    = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }
  if (toggle && navLinks) {
    const closeNav = () => {
      navLinks.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '1';
      spans[2].style.transform = '';
    };
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      overlay.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
      spans[1].style.opacity   = open ? '0' : '1';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
    overlay.addEventListener('click', closeNav);
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  }

  /* ── Scroll-reveal Animation ─────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.portfolio-card,.why-card,.process-step,.include-item,.pricing-card,.suitability-item,.support-card'
  ).forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    io.observe(el);
  });

  /* ── Contact Form (Formspree AJAX) ───────────────────── */
  const form = document.getElementById('contact-form');
  if (form) {
    const btn          = form.querySelector('button[type="submit"]');
    const originalHTML = btn ? btn.innerHTML : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn) { btn.innerHTML = 'Sending…'; btn.disabled = true; }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(res => {
        if (res.ok) {
          const formFields  = document.getElementById('form-fields');
          const formSuccess = document.getElementById('form-success');
          if (formFields)  formFields.style.display  = 'none';
          if (formSuccess) formSuccess.style.display  = 'block';
        } else {
          alert('Something went wrong. Please try WhatsApp or Email.');
          if (btn) { btn.innerHTML = originalHTML; btn.disabled = false; }
        }
      })
      .catch(() => {
        alert('Network error. Please try WhatsApp or Email.');
        if (btn) { btn.innerHTML = originalHTML; btn.disabled = false; }
      });
    });
  }

  /* ── Navbar shadow on scroll ─────────────────────────── */
  const nb = document.querySelector('.navbar');
  if (nb) window.addEventListener('scroll', () => {
    nb.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,.25)' : 'none';
  }, { passive: true });

  /* ── FAQ accordion ───────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => item.classList.toggle('open'));
  });

  /* ── Portfolio Filter Tabs ───────────────────────────── */
  const filterBar     = document.getElementById('filterBar');
  const portfolioGrid = document.getElementById('portfolioGrid');

  if (filterBar && portfolioGrid) {
    filterBar.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.cat;
      portfolioGrid.querySelectorAll('.portfolio-card').forEach(card => {
        const match = cat === 'all' || card.dataset.cat === cat;
        card.style.display = match ? 'flex' : 'none';
      });
    });
  }

});
