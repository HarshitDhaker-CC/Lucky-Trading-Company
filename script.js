/* ==========================================
   LUCKY TRADING COMPANY — Main JavaScript
   ========================================== */

'use strict';

// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    document.body.style.overflow = '';
    initAOS();
  }, 2200);
});
document.body.style.overflow = 'hidden';

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (sy > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScrollY = sy;
  updateActiveNavLink();
  handleBackToTop();
  handleParallax();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
function handleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH SCROLL for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const colors = ['#d4a017', '#40916c', '#f0c040', '#ffffff', '#2d6a4f'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 8 + 3;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 5}s;
      opacity: ${Math.random() * 0.4 + 0.1};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ===== AOS (Animate on Scroll) =====
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  elements.forEach(el => observer.observe(el));
}

// ===== ANIMATED COUNTERS =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about-counters');
if (aboutSection) counterObserver.observe(aboutSection);

// ===== TICKER — duplicate for seamless loop =====
(function () {
  const inner = document.getElementById('tickerInner');
  if (!inner) return;
  inner.innerHTML += inner.innerHTML; // duplicate
})();

// ===== PRODUCT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    productCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== SEARCH =====
const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');
const searchData = [
  { name: 'Coriander (Dhaniya)', icon: 'fa-seedling', section: '#products' },
  { name: 'Mustard (Sarson)', icon: 'fa-seedling', section: '#products' },
  { name: 'Wheat (Gehun)', icon: 'fa-wheat-awn', section: '#products' },
  { name: 'Soybean', icon: 'fa-seedling', section: '#products' },
  { name: 'Chana (Chickpea)', icon: 'fa-seedling', section: '#products' },
  { name: 'Methi', icon: 'fa-leaf', section: '#products' },
  { name: 'Saunf (Fennel)', icon: 'fa-leaf', section: '#products' },
  { name: 'Wholesale Supply', icon: 'fa-store', section: '#services' },
  { name: 'Mandi Rates', icon: 'fa-chart-line', section: '#mandi-rates' },
  { name: 'Contact Us', icon: 'fa-phone', section: '#contact' },
  { name: 'About Lucky Trading', icon: 'fa-building', section: '#about' },
  { name: 'Gallery', icon: 'fa-images', section: '#gallery' },
];

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    if (!q) { searchDropdown.classList.remove('visible'); return; }
    const results = searchData.filter(d => d.name.toLowerCase().includes(q));
    if (!results.length) { searchDropdown.classList.remove('visible'); return; }
    searchDropdown.innerHTML = results.map(r =>
      `<div class="search-result-item" data-section="${r.section}">
        <i class="fas ${r.icon}"></i> ${r.name}
      </div>`
    ).join('');
    searchDropdown.classList.add('visible');
    searchDropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const sec = document.querySelector(item.getAttribute('data-section'));
        if (sec) {
          sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        searchInput.value = '';
        searchDropdown.classList.remove('visible');
      });
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-search')) {
      searchDropdown.classList.remove('visible');
    }
  });
}

// ===== MANDI RATES =====
const mandiData = {
  ramganj: [
    { name: 'Coriander (Dhaniya)', variety: 'Bold Eagle', min: 6200, max: 7800, modal: 7100, trend: 'up' },
    { name: 'Mustard (Sarson)', variety: 'RH-749', min: 5400, max: 6100, modal: 5750, trend: 'up' },
    { name: 'Wheat (Gehun)', variety: 'Sharbati', min: 2150, max: 2400, modal: 2280, trend: 'stable' },
    { name: 'Soybean', variety: 'JS-9305', min: 4200, max: 4900, modal: 4550, trend: 'down' },
    { name: 'Chana (Desi)', variety: 'Desi Grade A', min: 5100, max: 5800, modal: 5450, trend: 'up' },
    { name: 'Methi (Fenugreek)', variety: 'RMT-1', min: 5600, max: 7200, modal: 6500, trend: 'up' },
    { name: 'Saunf (Fennel)', variety: 'Gujarat DFE', min: 8500, max: 12000, modal: 10200, trend: 'stable' },
  ],
  kota: [
    { name: 'Coriander (Dhaniya)', variety: 'Eagle Grade', min: 6100, max: 7600, modal: 6950, trend: 'up' },
    { name: 'Mustard (Sarson)', variety: 'RH-30', min: 5300, max: 6000, modal: 5650, trend: 'stable' },
    { name: 'Wheat (Gehun)', variety: 'Lok-1', min: 2100, max: 2380, modal: 2250, trend: 'down' },
    { name: 'Soybean', variety: 'MACS-450', min: 4100, max: 4800, modal: 4500, trend: 'down' },
    { name: 'Chana (Kabuli)', variety: 'Kabuli Grade A', min: 7200, max: 8500, modal: 7850, trend: 'up' },
  ],
  jaipur: [
    { name: 'Coriander (Dhaniya)', variety: 'Supreme Grade', min: 6500, max: 8200, modal: 7400, trend: 'up' },
    { name: 'Mustard (Sarson)', variety: 'Pusa Bold', min: 5500, max: 6200, modal: 5850, trend: 'up' },
    { name: 'Wheat (Gehun)', variety: 'K-307', min: 2200, max: 2450, modal: 2320, trend: 'stable' },
    { name: 'Chana (Desi)', variety: 'Medium Grade', min: 5000, max: 5750, modal: 5400, trend: 'stable' },
    { name: 'Methi (Fenugreek)', variety: 'Premium Grade', min: 5800, max: 7500, modal: 6700, trend: 'up' },
    { name: 'Saunf (Fennel)', variety: 'Export Quality', min: 9000, max: 13000, modal: 11000, trend: 'up' },
  ]
};

function renderRates(mandi) {
  const tbody = document.getElementById('ratesBody');
  if (!tbody) return;
  const data = mandiData[mandi] || mandiData.ramganj;
  const trendIcon = { up: '↑', down: '↓', stable: '→' };
  const trendClass = { up: 'trend-up', down: 'trend-down', stable: 'trend-stable' };
  tbody.innerHTML = data.map(row => `
    <tr>
      <td>${row.name}</td>
      <td>${row.variety}</td>
      <td>₹${row.min.toLocaleString()}</td>
      <td>₹${row.max.toLocaleString()}</td>
      <td><strong>₹${row.modal.toLocaleString()}</strong></td>
      <td><span class="${trendClass[row.trend]}">${trendIcon[row.trend]} ${row.trend.charAt(0).toUpperCase() + row.trend.slice(1)}</span></td>
    </tr>
  `).join('');
}

function updateMandiTime() {
  const el = document.getElementById('mandiTime');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + ', ' + now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Rate tabs
document.querySelectorAll('.rate-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.rate-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderRates(tab.getAttribute('data-mandi'));
    simulateRateFlash();
  });
});

// Refresh button
const mandiRefresh = document.getElementById('mandiRefresh');
if (mandiRefresh) {
  mandiRefresh.addEventListener('click', () => {
    mandiRefresh.style.animation = 'spin 1s linear infinite';
    mandiRefresh.disabled = true;
    setTimeout(() => {
      const activeMandi = document.querySelector('.rate-tab.active')?.getAttribute('data-mandi') || 'ramganj';
      renderRates(activeMandi);
      updateMandiTime();
      simulateRateFlash();
      mandiRefresh.style.animation = '';
      mandiRefresh.disabled = false;
    }, 900);
  });
}

function simulateRateFlash() {
  const cells = document.querySelectorAll('.rates-table td:nth-child(5)');
  cells.forEach(cell => {
    cell.style.transition = 'background 0s';
    cell.style.background = 'rgba(212,160,23,0.2)';
    setTimeout(() => {
      cell.style.transition = 'background 1s ease';
      cell.style.background = '';
    }, 50);
  });
}

// Auto-update rates every 30 seconds
function startAutoUpdate() {
  renderRates('ramganj');
  updateMandiTime();
  setInterval(() => {
    const activeMandi = document.querySelector('.rate-tab.active')?.getAttribute('data-mandi') || 'ramganj';
    simulateRateFlash();
    updateMandiTime();
  }, 30000);
}
startAutoUpdate();

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox]');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let lightboxIndex = 0;
const lightboxImages = [];

galleryItems.forEach((item, i) => {
  const img = item.querySelector('img');
  const caption = item.querySelector('.gallery-caption');
  lightboxImages.push({ src: img.src, caption: caption ? caption.textContent : '' });
  item.addEventListener('click', () => openLightbox(i));
});

function openLightbox(index) {
  lightboxIndex = index;
  lightboxImg.src = lightboxImages[index].src;
  lightboximg = lightboxImages[index];
  lightboxCaption.textContent = lightboxImages[index].caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
function prevLightbox() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[lightboxIndex].src;
  lightboxCaption.textContent = lightboxImages[lightboxIndex].caption;
}
function nextLightbox() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  lightboxImg.src = lightboxImages[lightboxIndex].src;
  lightboxCaption.textContent = lightboxImages[lightboxIndex].caption;
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);
if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
if (lightbox) {
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
}
document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevLightbox();
  if (e.key === 'ArrowRight') nextLightbox();
});

// ===== TESTIMONIALS SLIDER =====
const testiTrack = document.getElementById('testiTrack');
const testiCards = document.querySelectorAll('.testi-card');
const testiPrev = document.getElementById('testiPrev');
const testiNext = document.getElementById('testiNext');
const testiDotsContainer = document.getElementById('testiDots');

let testiIndex = 0;
let testiAutoplay;
let slidesPerView = getSlidesPerView();

function getSlidesPerView() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function buildTestiDots() {
  if (!testiDotsContainer) return;
  const total = Math.ceil(testiCards.length / slidesPerView);
  testiDotsContainer.innerHTML = Array.from({ length: total }, (_, i) =>
    `<button class="testi-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`
  ).join('');
  testiDotsContainer.querySelectorAll('.testi-dot').forEach(dot => {
    dot.addEventListener('click', () => goToTesti(parseInt(dot.getAttribute('data-index'))));
  });
}

function goToTesti(index) {
  if (!testiTrack) return;
  const cardWidth = testiCards[0].offsetWidth + 28;
  testiIndex = index;
  testiTrack.style.transform = `translateX(-${testiIndex * cardWidth * slidesPerView}px)`;
  testiDotsContainer?.querySelectorAll('.testi-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === testiIndex);
  });
}

function nextTesti() {
  const total = Math.ceil(testiCards.length / slidesPerView);
  goToTesti((testiIndex + 1) % total);
}
function prevTesti() {
  const total = Math.ceil(testiCards.length / slidesPerView);
  goToTesti((testiIndex - 1 + total) % total);
}

buildTestiDots();
testiNext?.addEventListener('click', () => { clearInterval(testiAutoplay); nextTesti(); startTestiAutoplay(); });
testiPrev?.addEventListener('click', () => { clearInterval(testiAutoplay); prevTesti(); startTestiAutoplay(); });

function startTestiAutoplay() {
  testiAutoplay = setInterval(nextTesti, 4500);
}
startTestiAutoplay();

window.addEventListener('resize', () => {
  const newSpv = getSlidesPerView();
  if (newSpv !== slidesPerView) {
    slidesPerView = newSpv;
    testiIndex = 0;
    goToTesti(0);
    buildTestiDots();
  }
});

// ===== FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm()) {
      const btn = document.getElementById('submitBtn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        contactForm.reset();
        document.getElementById('formSuccess').classList.add('show');
        setTimeout(() => document.getElementById('formSuccess')?.classList.remove('show'), 5000);
      }, 1600);
    }
  });
}

function setError(fieldId, errId, message) {
  const field = document.getElementById(fieldId);
  const errEl = document.getElementById(errId);
  if (field) field.closest('.input-wrap').querySelector('input,select,textarea')?.classList.add('error');
  if (errEl) errEl.textContent = message;
  return false;
}
function clearError(fieldId, errId) {
  const field = document.getElementById(fieldId)?.closest('.input-wrap');
  if (field) field.querySelector('input,select,textarea')?.classList.remove('error');
  const errEl = document.getElementById(errId);
  if (errEl) errEl.textContent = '';
}

function validateForm() {
  let valid = true;
  const name = document.getElementById('fname')?.value.trim();
  const phone = document.getElementById('fphone')?.value.trim();
  const email = document.getElementById('femail')?.value.trim();
  const message = document.getElementById('fmessage')?.value.trim();

  clearError('fname', 'fnameError');
  clearError('fphone', 'fphoneError');
  clearError('femail', 'femailError');
  clearError('fmessage', 'fmessageError');

  if (!name || name.length < 3) {
    setError('fname', 'fnameError', 'Please enter your full name (min 3 characters).');
    valid = false;
  }
  if (!phone || !/^[6-9]\d{9}$/.test(phone.replace(/[\s\-\+]/g, ''))) {
    setError('fphone', 'fphoneError', 'Enter a valid 10-digit Indian mobile number.');
    valid = false;
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('femail', 'femailError', 'Please enter a valid email address.');
    valid = false;
  }
  if (!message || message.length < 10) {
    setError('fmessage', 'fmessageError', 'Please describe your requirement (min 10 characters).');
    valid = false;
  }
  return valid;
}

// Real-time validation feedback
['fname', 'fphone', 'femail', 'fmessage'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', () => {
    el.closest('.input-wrap')?.querySelector('input,select,textarea')?.classList.remove('error');
    const errEl = document.getElementById(`${id}Error`);
    if (errEl) errEl.textContent = '';
  });
});

// ===== PARALLAX =====
const parallaxBg = document.querySelector('.parallax-bg');
function handleParallax() {
  if (!parallaxBg) return;
  const section = document.querySelector('.parallax-section');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  const scrolled = -rect.top * 0.3;
  parallaxBg.style.transform = `translateY(${scrolled}px)`;
}

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn, .filter-btn, .nav-cta').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute; border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: scale(0); animation: ripple 0.6s linear;
      width: 100px; height: 100px;
      left: ${e.clientX - btn.getBoundingClientRect().left - 50}px;
      top: ${e.clientY - btn.getBoundingClientRect().top - 50}px;
      pointer-events: none;
    `;
    if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframe
const style = document.createElement('style');
style.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(style);

// ===== SERVICE CARD HOVER 3D =====
document.querySelectorAll('.service-card:not(.featured), .why-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `translateY(-6px) rotateY(${x / 30}deg) rotateX(${-y / 30}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== INIT on DOM ready =====
document.addEventListener('DOMContentLoaded', () => {
  // Call AOS if preloader already hidden (safety)
  if (document.getElementById('preloader')?.classList.contains('hidden')) {
    initAOS();
  }
});
