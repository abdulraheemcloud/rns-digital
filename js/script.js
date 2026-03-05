<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function () {
  // Active nav
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const o = navLinks.classList.contains('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = o ? 'rotate(45deg) translate(5px,5px)' : '';
      spans[1].style.opacity   = o ? '0' : '1';
      spans[2].style.transform = o ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  // Scroll animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.wyg-card,.portfolio-card,.why-card,.process-step,.include-item,.pricing-card,.suitability-item,.support-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity 0.5s ease ${i*0.06}s, transform 0.5s ease ${i*0.06}s`;
    io.observe(el);
  });

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...'; btn.disabled = true;
      setTimeout(() => {
        document.getElementById('form-fields').style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      }, 1400);
    });
  }

  // Navbar shadow on scroll
  const nb = document.querySelector('.navbar');
  if (nb) window.addEventListener('scroll', () => {
    nb.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,.25)' : 'none';
  }, { passive: true });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => item.classList.toggle('open'));
  });
});
=======
document.addEventListener('DOMContentLoaded', function () {
  // Active nav
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const o = navLinks.classList.contains('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = o ? 'rotate(45deg) translate(5px,5px)' : '';
      spans[1].style.opacity   = o ? '0' : '1';
      spans[2].style.transform = o ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  // Scroll animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.wyg-card,.portfolio-card,.why-card,.process-step,.include-item,.pricing-card,.suitability-item,.support-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity 0.5s ease ${i*0.06}s, transform 0.5s ease ${i*0.06}s`;
    io.observe(el);
  });

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...'; btn.disabled = true;
      setTimeout(() => {
        document.getElementById('form-fields').style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      }, 1400);
    });
  }

  // Navbar shadow on scroll
  const nb = document.querySelector('.navbar');
  if (nb) window.addEventListener('scroll', () => {
    nb.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,.25)' : 'none';
  }, { passive: true });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => item.classList.toggle('open'));
  });
});
>>>>>>> 7c23245a11fb93e9bd18580505516e996e700bab
