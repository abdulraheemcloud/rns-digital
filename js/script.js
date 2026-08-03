/**
 * RNS Digital - Main JavaScript
 * Optimized for performance, accessibility, and maintainability
 * All Vanilla JS - No dependencies
 */

(function() {
  'use strict';

  // ============================================
  // DOM CACHE - Single source of truth
  // ============================================
  const DOM = {
    nav: {
      toggle: null,
      links: null,
      overlay: null,
      items: null
    },
    forms: {
      contact: null,
      submitBtn: null
    },
    elements: {
      navbar: null,
      faqItems: null,
      filterBar: null,
      portfolioGrid: null,
      revealElements: null
    }
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  const utils = {
    /**
     * Debounce function for performance optimization
     */
    debounce: function(fn, delay = 250) {
      let timeoutId;
      return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    /**
     * Get current page filename
     */
    getCurrentPage: function() {
      const path = window.location.pathname;
      const page = path.split('/').pop().split('?')[0] || 'index.html';
      return page;
    },

    /**
     * Safely query selector with error handling
     */
    qs: function(selector, context = document) {
      try {
        return context.querySelector(selector);
      } catch (e) {
        return null;
      }
    },

    /**
     * Safely query selector all with error handling
     */
    qsa: function(selector, context = document) {
      try {
        return context.querySelectorAll(selector);
      } catch (e) {
        return [];
      }
    }
  };

  // ============================================
  // NAVIGATION MODULE
  // ============================================
  const NavModule = {
    init: function() {
      DOM.nav.toggle = utils.qs('.nav-toggle');
      DOM.nav.links = utils.qs('.nav-links');
      
      // Create overlay if not exists
      DOM.nav.overlay = utils.qs('.nav-overlay');
      if (!DOM.nav.overlay) {
        DOM.nav.overlay = document.createElement('div');
        DOM.nav.overlay.className = 'nav-overlay';
        document.body.appendChild(DOM.nav.overlay);
      }

      // Get all nav items
      DOM.nav.items = utils.qsa('.nav-links a');

      this.setActiveLink();
      this.setupMobileToggle();
      this.setupScrollShadow();
    },

    /**
     * Set active navigation link based on current page
     */
    setActiveLink: function() {
      const currentPage = utils.getCurrentPage();
      DOM.nav.items.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          const linkPage = href.split('?')[0];
          if (linkPage === currentPage) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    },

    /**
     * Setup mobile navigation toggle with accessibility
     */
    setupMobileToggle: function() {
      if (!DOM.nav.toggle || !DOM.nav.links) return;

      const toggle = DOM.nav.toggle;
      const links = DOM.nav.links;
      const overlay = DOM.nav.overlay;
      const spans = toggle.querySelectorAll('span');

      const closeNav = () => {
        links.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
        
        // Reset toggle icon
        if (spans.length >= 3) {
          spans[0].style.transform = '';
          spans[1].style.opacity = '1';
          spans[2].style.transform = '';
        }
      };

      const openNav = () => {
        links.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        toggle.setAttribute('aria-expanded', 'true');
        
        // Animate toggle to X
        if (spans.length >= 3) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        }
      };

      // Toggle click handler
      toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = links.classList.contains('open');
        if (isOpen) {
          closeNav();
        } else {
          openNav();
        }
      });

      // Close on overlay click
      overlay.addEventListener('click', closeNav);

      // Close on link click
      links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
      });

      // Close on Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && links.classList.contains('open')) {
          closeNav();
        }
      });

      // Trap focus within mobile menu
      links.addEventListener('keydown', function(e) {
        if (!links.classList.contains('open')) return;
        
        const focusable = links.querySelectorAll('a, button');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    },

    /**
     * Setup navbar shadow on scroll with debounce
     */
    setupScrollShadow: function() {
      DOM.elements.navbar = utils.qs('.navbar');
      if (!DOM.elements.navbar) return;

      const updateShadow = utils.debounce(function() {
        const scrollY = window.pageYOffset || window.scrollY;
        DOM.elements.navbar.style.boxShadow = scrollY > 20 
          ? '0 4px 24px rgba(0,0,0,.25)' 
          : 'none';
      }, 10);

      window.addEventListener('scroll', updateShadow, { passive: true });
      
      // Initial check
      updateShadow();
    }
  };

  // ============================================
  // SCROLL REVEAL MODULE
  // ============================================
  const RevealModule = {
    init: function() {
      const selectors = [
        '.portfolio-card',
        '.why-card',
        '.process-step',
        '.include-item',
        '.pricing-card',
        '.suitability-item',
        '.support-card'
      ].join(',');

      DOM.elements.revealElements = utils.qsa(selectors);

      if (!DOM.elements.revealElements.length) return;

      // Set initial state
      DOM.elements.revealElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
      });

      // Setup Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      DOM.elements.revealElements.forEach(el => observer.observe(el));
    }
  };

  // ============================================
  // CONTACT FORM MODULE
  // ============================================
  const ContactFormModule = {
    init: function() {
      DOM.forms.contact = document.getElementById('contact-form');
      if (!DOM.forms.contact) return;

      DOM.forms.submitBtn = DOM.forms.contact.querySelector('button[type="submit"]');
      
      // Store original button HTML for reset
      const originalHTML = DOM.forms.submitBtn ? DOM.forms.submitBtn.innerHTML : '';

      DOM.forms.contact.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable button and show loading state
        if (DOM.forms.submitBtn) {
          DOM.forms.submitBtn.innerHTML = 'Sending…';
          DOM.forms.submitBtn.disabled = true;
        }

        fetch(this.action, {
          method: 'POST',
          body: new FormData(this),
          headers: { 'Accept': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            // Hide form, show success
            const formFields = document.getElementById('form-fields');
            const formSuccess = document.getElementById('form-success');
            if (formFields) formFields.style.display = 'none';
            if (formSuccess) formSuccess.style.display = 'block';
            
            // Reset form
            this.reset();
          } else {
            throw new Error('Server responded with error');
          }
        })
        .catch(() => {
          // Show user-friendly error
          alert('Something went wrong. Please try WhatsApp or Email.');
        })
        .finally(() => {
          // Re-enable button
          if (DOM.forms.submitBtn) {
            DOM.forms.submitBtn.innerHTML = originalHTML;
            DOM.forms.submitBtn.disabled = false;
          }
        });
      });
    }
  };

  // ============================================
  // FAQ MODULE
  // ============================================
  const FaqModule = {
    init: function() {
      DOM.elements.faqItems = utils.qsa('.faq-item');
      
      DOM.elements.faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        if (!question) return;

        // Add click handler
        question.addEventListener('click', function() {
          const isOpen = item.classList.contains('open');
          
          // Close all items (accordion behavior)
          DOM.elements.faqItems.forEach(other => {
            if (other !== item) {
              other.classList.remove('open');
            }
          });
          
          // Toggle current
          item.classList.toggle('open', !isOpen);
        });

        // Keyboard support
        question.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
          }
        });
      });
    }
  };

  // ============================================
  // PORTFOLIO FILTER MODULE
  // ============================================
  const PortfolioFilterModule = {
    init: function() {
      DOM.elements.filterBar = document.getElementById('filterBar');
      DOM.elements.portfolioGrid = document.getElementById('portfolioGrid');

      if (!DOM.elements.filterBar || !DOM.elements.portfolioGrid) return;

      DOM.elements.filterBar.addEventListener('click', function(e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        // Update active button
        this.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        // Filter cards
        const category = btn.dataset.cat;
        const cards = DOM.elements.portfolioGrid.querySelectorAll('.portfolio-card');
        
        cards.forEach(card => {
          const match = category === 'all' || card.dataset.cat === category;
          card.style.display = match ? 'flex' : 'none';
          
          // Add smooth transition
          if (match) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }
        });
      });

      // Set initial active state
      const firstBtn = DOM.elements.filterBar.querySelector('.filter-btn');
      if (firstBtn) {
        firstBtn.classList.add('active');
        firstBtn.setAttribute('aria-pressed', 'true');
      }
    }
  };

  // ============================================
  // LAZY LOADING IMAGES MODULE
  // ============================================
  const LazyLoadModule = {
    init: function() {
      // Images with loading="lazy" are handled by browser
      // Additional lazy loading for background images can be added here
      
      // Intersection Observer for images without loading attribute
      if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img:not([loading="lazy"])');
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              // Load if data-src exists
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              imageObserver.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px'
        });
        
        images.forEach(img => imageObserver.observe(img));
      }
    }
  };

  // ============================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================
  const PerformanceModule = {
    init: function() {
      // Use passive event listeners where possible
      this.passiveEvents();
      
      // Reduce layout thrashing
      this.optimizeAnimations();
    },

    passiveEvents: function() {
      // Touch events on mobile
      document.addEventListener('touchstart', function() {}, { passive: true });
      document.addEventListener('touchmove', function() {}, { passive: true });
      document.addEventListener('touchend', function() {}, { passive: true });
    },

    optimizeAnimations: function() {
      // Use will-change for animated elements
      const animatedElements = utils.qsa('.float-badge, .hero-logo-img, .portfolio-card');
      animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
      });
    }
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    NavModule.init();
    RevealModule.init();
    ContactFormModule.init();
    FaqModule.init();
    PortfolioFilterModule.init();
    LazyLoadModule.init();
    PerformanceModule.init();

    // Log performance (dev only)
    if (window.performance && window.performance.mark) {
      performance.mark('js-loaded');
    }
  });

})();