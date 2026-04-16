/* ============================================================
   LUXURY WEDDING INVITATION — script.js
   ============================================================ */

/* ── Utility: DOM ready ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. STICKY NAVBAR ─────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const checkScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  /* ── 2. MOBILE MENU TOGGLE ─────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── 3. ACTIVE NAV LINK ────────────────────────────────── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── 4. SCROLL REVEAL ──────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ── 5. COUNTDOWN TIMER ────────────────────────────────── */
  const weddingDate = new Date('2025-09-20T17:00:00');
  const updateCountdown = () => {
    const now = new Date();
    const diff = weddingDate - now;
    if (diff <= 0) {
      document.querySelectorAll('.countdown-number').forEach((el, i) => {
        el.textContent = ['00','00','00','00'][i] ?? '00';
      });
      return;
    }
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const els = {
      days:    document.getElementById('cd-days'),
      hours:   document.getElementById('cd-hours'),
      minutes: document.getElementById('cd-minutes'),
      seconds: document.getElementById('cd-seconds'),
    };
    if (els.days)    els.days.textContent    = String(days).padStart(2,'0');
    if (els.hours)   els.hours.textContent   = String(hours).padStart(2,'0');
    if (els.minutes) els.minutes.textContent = String(minutes).padStart(2,'0');
    if (els.seconds) els.seconds.textContent = String(seconds).padStart(2,'0');
  };
  if (document.getElementById('cd-days')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ── 6. GALLERY LIGHTBOX ───────────────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox     = document.getElementById('lightbox');
  if (lightbox && galleryItems.length) {
    const lbImg     = lightbox.querySelector('.lightbox-img');
    const lbCounter = lightbox.querySelector('.lightbox-counter');
    let currentIdx  = 0;
    const images    = Array.from(galleryItems).map(item => ({
      src: item.querySelector('img').src,
      alt: item.querySelector('img').alt,
    }));

    const openLightbox = (idx) => {
      currentIdx = idx;
      lbImg.src = images[idx].src;
      lbImg.alt = images[idx].alt;
      if (lbCounter) lbCounter.textContent = `${idx + 1} / ${images.length}`;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };
    const showNext = () => openLightbox((currentIdx + 1) % images.length);
    const showPrev = () => openLightbox((currentIdx - 1 + images.length) % images.length);

    galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next')?.addEventListener('click', showNext);
    lightbox.querySelector('.lightbox-prev')?.addEventListener('click', showPrev);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft')  showPrev();
    });
  }

  /* ── 7. GALLERY FILTER ─────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.opacity = '1';
          item.style.pointerEvents = 'auto';
        } else {
          item.style.opacity = '0.25';
          item.style.pointerEvents = 'none';
        }
      });
    });
  });

  /* ── 8. RSVP FORM VALIDATION ───────────────────────────── */
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    const showError = (group, msg) => {
      group.classList.add('error');
      const errEl = group.querySelector('.form-error');
      if (errEl) errEl.textContent = msg;
    };
    const clearError = (group) => group.classList.remove('error');

    rsvpForm.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
      field.addEventListener('input', () => clearError(field.closest('.form-group')));
    });

    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Validate first name
      const firstName = rsvpForm.querySelector('#first-name');
      const firstGroup = firstName?.closest('.form-group');
      if (firstName && !firstName.value.trim()) {
        showError(firstGroup, 'Please enter your first name.');
        valid = false;
      }

      // Validate last name
      const lastName = rsvpForm.querySelector('#last-name');
      const lastGroup = lastName?.closest('.form-group');
      if (lastName && !lastName.value.trim()) {
        showError(lastGroup, 'Please enter your last name.');
        valid = false;
      }

      // Validate email
      const email = rsvpForm.querySelector('#email');
      const emailGroup = email?.closest('.form-group');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email.value)) {
        showError(emailGroup, 'Please enter a valid email address.');
        valid = false;
      }

      // Validate attendance
      const attendance = rsvpForm.querySelector('input[name="attendance"]:checked');
      const attendanceGroup = rsvpForm.querySelector('.attendance-group');
      if (!attendance && attendanceGroup) {
        showError(attendanceGroup, 'Please indicate your attendance.');
        valid = false;
      }

      if (valid) {
        // Simulate submission
        rsvpForm.style.display = 'none';
        const success = document.getElementById('rsvp-success');
        if (success) {
          success.classList.add('show');
          // Personalise with name
          const nameEl = success.querySelector('.success-name');
          if (nameEl && firstName) nameEl.textContent = firstName.value;
        }
        // Scroll to success
        document.querySelector('.rsvp-form-area')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ── 9. CONTACT FORM ───────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.innerHTML = '<span>Message Sent ✓</span>';
        btn.style.pointerEvents = 'none';
        btn.style.borderColor = '#4CAF50';
        btn.style.color = '#4CAF50';
      }
    });
  }

  /* ── 10. PARALLAX HERO ─────────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY * 0.4;
      heroBg.style.transform = `scale(1) translateY(${offset}px)`;
    }, { passive: true });
  }

});
