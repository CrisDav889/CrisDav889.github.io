/**
 * Portafolio - Main JavaScript
 * Handles navigation, animations, and interactions
 */

// DOM Elements
const nav = document.getElementById('nav');
const mobileMenu = document.getElementById('mobileMenu');

/**
 * Initialize all event listeners
 */
function init() {
  setupNavbar();
  setupMobileMenu();
  setupSmoothScroll();
  setupAnimations();
}

/**
 * Navbar scroll behavior
 */
function setupNavbar() {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/**
 * Mobile menu toggle
 */
function setupMobileMenu() {
  window.toggleMenu = function() {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  window.closeMenu = function() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  };
}

/**
 * Smooth scroll for anchor links
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({ 
          top: target.offsetTop - 80, 
          behavior: 'smooth' 
        });
        closeMenu();
      }
    });
  });
}

/**
 * Anime.js animations
 */
function setupAnimations() {
  if (typeof anime === 'undefined') return;

  document.addEventListener('DOMContentLoaded', () => {
    // Hero animations
    const heroTimeline = anime.timeline({ easing: 'easeOutExpo' });
    
    heroTimeline
      .add({
        targets: '.hero-label',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
      })
      .add({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000
      }, '-=500')
      .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        duration: 600
      }, '-=600')
      .add({
        targets: '.hero-desc',
        opacity: [0, 1],
        duration: 600
      }, '-=400')
      .add({
        targets: '.hero-cta .btn',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 500,
        delay: anime.stagger(100)
      }, '-=400')
      .add({
        targets: '.hero-image img',
        opacity: [0, 0.15],
        duration: 1500
      }, '-=1000');

    // About section
    anime({
      targets: '.about-content',
      opacity: [0, 1],
      translateX: [30, 0],
      duration: 800,
      delay: 300,
      easing: 'easeOutExpo'
    });

    // Projects
    anime({
      targets: '.project-card',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      delay: anime.stagger(150),
      easing: 'easeOutExpo'
    });

    // Skills
    anime({
      targets: '.skill-item',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 600,
      delay: anime.stagger(100),
      easing: 'easeOutExpo'
    });

    // Quote
    anime({
      targets: '.quote-text, .quote-author',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1000,
      delay: anime.stagger(200),
      easing: 'easeOutExpo'
    });

    // Certifications
    anime({
      targets: '.cert-card',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700,
      delay: anime.stagger(120),
      easing: 'easeOutExpo'
    });

    // Contact
    anime({
      targets: '.contact-info > *',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: anime.stagger(100),
      easing: 'easeOutExpo'
    });

    // Footer
    anime({
      targets: '.footer-inner',
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
    });
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
