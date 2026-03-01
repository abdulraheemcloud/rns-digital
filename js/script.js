/* ============================================================
   RNS Digital — Main Script v2.0
   ============================================================ */

// ── Load Google Fonts async ──
(function(){
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Outfit:wght@400;500;600;700;800&display=swap';
  document.head.appendChild(l);
})();

// ── Enable scroll animations ──
document.documentElement.classList.add('js-ready');

// ── Navbar scroll effect ──
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function(){
  if(window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

// ── Hamburger menu ──
var hamburger = document.getElementById('hamburger');
var navMenu   = document.getElementById('navMenu');

if(hamburger && navMenu){
  hamburger.addEventListener('click', function(){
    navMenu.classList.toggle('open');
    var spans = hamburger.querySelectorAll('span');
    if(navMenu.classList.contains('open')){
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(function(s){ s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  navMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(function(s){ s.style.transform=''; s.style.opacity=''; });
    });
  });
}

// ── Scroll reveal ──
var revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && revealEls.length){
  var ro = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -36px 0px' });
  revealEls.forEach(function(el){ ro.observe(el); });
} else {
  revealEls.forEach(function(el){ el.classList.add('in-view'); });
}

// ── Animated counters ──
function runCounter(el){
  var target   = parseInt(el.getAttribute('data-target'), 10);
  var suffix   = el.getAttribute('data-suffix') || '';
  var duration = 1800;
  var steps    = 55;
  var step     = target / steps;
  var current  = 0;
  var t = setInterval(function(){
    current += step;
    if(current >= target){ current = target; clearInterval(t); }
    el.textContent = Math.floor(current) + suffix;
  }, duration / steps);
}
if('IntersectionObserver' in window){
  var co = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting && !e.target.dataset.counted){
        e.target.dataset.counted = '1';
        runCounter(e.target);
        co.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(function(el){ co.observe(el); });
}

// ── Smooth scroll (same-page anchors) ──
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click', function(e){
    var href = a.getAttribute('href');
    if(href === '#') return;
    var target = document.querySelector(href);
    if(target){
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// ── Active nav link highlight ──
(function(){
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function(a){
    var href = a.getAttribute('href');
    if(href && (href === path || href.endsWith(path))){
      a.classList.add('active');
    }
  });
})();
