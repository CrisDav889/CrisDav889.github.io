const nav = document.getElementById('nav');
const mobileMenu = document.getElementById('mobileMenu');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menuClose = document.querySelector('[data-menu-close]');
const menuLinks = document.querySelectorAll('[data-menu-link]');

function init() {
  setupNavbar();
  setupMobileMenu();
  setupSmoothScroll();
  setupReveal();
  setupCarousel();
  setupHeroInteraction();
  setupCarouselTouch();
}

function setupNavbar() {
  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  });
}

function setupMobileMenu() {
  if (!mobileMenu) return;

  const toggleMenu = () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  menuToggle?.addEventListener('click', toggleMenu);
  menuClose?.addEventListener('click', toggleMenu);
  menuLinks.forEach(link => link.addEventListener('click', toggleMenu));
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      const offset = target.offsetTop - 90;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
}

function setupReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach(el => observer.observe(el));
}

function setupCarousel() {
  const carousel = document.querySelector('[data-carousel]');
  const track = document.querySelector('[data-carousel-track]');
  if (!carousel || !track) return;

  carousel.querySelectorAll('[data-carousel-btn]').forEach(button => {
    button.addEventListener('click', () => {
      const direction = button.dataset.carouselBtn === 'next' ? 1 : -1;
      const scrollAmount = track.clientWidth * 0.75 * direction;
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
}

function setupCarouselTouch() {
  const track = document.querySelector('[data-carousel-track]');
  if (!track) return;

  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    isDragging = false;
  }, { passive: true });

  track.addEventListener('mousedown', e => {
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    isDragging = true;
    track.style.cursor = 'grabbing';
  });

  track.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  track.addEventListener('mouseup', () => {
    isDragging = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mouseleave', () => {
    isDragging = false;
    track.style.cursor = 'grab';
  });
}

function setupHeroInteraction() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    let angle = 0;
    setInterval(() => {
      angle += 0.008;
      const x = Math.sin(angle) * 30;
      const y = Math.cos(angle * 0.7) * 20;
      hero.style.setProperty('--mx', `${x}px`);
      hero.style.setProperty('--my', `${y}px`);
    }, 50);
    return;
  }

  const updateVars = (event) => {
    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    hero.style.setProperty('--mx', `${x}px`);
    hero.style.setProperty('--my', `${y}px`);
  };

  hero.addEventListener('mousemove', updateVars);
  hero.addEventListener('mouseleave', () => {
    hero.style.setProperty('--mx', '0px');
    hero.style.setProperty('--my', '0px');
  });
}

document.addEventListener('DOMContentLoaded', init);
