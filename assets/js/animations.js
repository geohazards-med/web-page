/* ===== GSAP ANIMATIONS ===== */
/* Borde Nororiental - Gestión del Riesgo V2 */

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ===== UTILITY FUNCTIONS =====

/**
 * Create a counter tween
 * @param {HTMLElement} element - Target element with text content
 * @param {number} target - Target number
 * @param {number} duration - Animation duration in seconds
 * @param {object} options - Additional GSAP options
 */
function animateCounter(element, target, duration = 2, options = {}) {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration,
    ease: "power2.out",
    onUpdate() {
      element.textContent = Math.floor(obj.value).toLocaleString('es-CO');
    },
    ...options
  });
}

/**
 * Batch element animations
 * @param {string|NodeList} selector - Elements to animate
 * @param {object} tweenVars - GSAP animation properties
 * @param {object} options - Stagger and scrollTrigger options
 */
function batchAnimate(selector, tweenVars, options = {}) {
  const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;

  elements.forEach((el, index) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
        ...options.scrollTrigger
      },
      stagger: options.stagger || 0.1,
      ...tweenVars,
      delay: options.delay ? options.delay + (index * (options.stagger || 0.1)) : index * (options.stagger || 0.1)
    });
  });
}

// ===== HERO SECTION =====

function animateHero() {
  const timeline = gsap.timeline();

  // Animate badge
  timeline.from('.hero-badge', {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    ease: 'elastic.out(1.2, 0.75)'
  }, 0);

  // Animate hero title (palabra por palabra)
  const titleWords = document.querySelectorAll('.hero-title-word');
  timeline.from(titleWords, {
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out'
  }, 0.2);

  // Animate description
  timeline.from('.hero-description', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, 0.5);

  // Animate hero image (Doña Reportera)
  timeline.from('.hero-image', {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  }, 0.3);

  // Animate hero background parallax
  const heroBg = document.querySelector('.hero-bg-parallax');
  if (heroBg) {
    gsap.to(heroBg, {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      },
      y: 80,
      ease: 'none'
    });
  }
}

// ===== SECTION TITLES =====

function animateSectionTitles() {
  const titles = document.querySelectorAll('.section-title-gsap');
  const subtitles = document.querySelectorAll('.section-subtitle-gsap');

  titles.forEach(title => {
    gsap.fromTo(title, 
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: title,
          start: 'top 95%',
          once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }
    );
  });

  subtitles.forEach(subtitle => {
    gsap.fromTo(subtitle,
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: subtitle,
          start: 'top 95%',
          once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }
    );
  });
}

// ===== STATS DASHBOARD COUNTERS =====

function animateStatsDashboard() {
  // Stat cards are always visible — only animate the counters
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  statNumbers.forEach(numEl => {
    const target = parseInt(numEl.dataset.target);
    if (isNaN(target)) return;

    // Set initial text to 0 so counter effect is visible
    numEl.textContent = '0';

    ScrollTrigger.create({
      trigger: '.stats-section',
      start: 'top 85%',
      once: true,
      onEnter() {
        animateCounter(numEl, target, 2);
      }
    });
  });
}

// ===== NORMATIVIDAD / GLOSARIO CARDS =====

function animateNormaCards() {
  const normaCards = document.querySelectorAll('.norma-card');

  normaCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: index * 0.1
    });
  });
}

// ===== SOCIAL CARDS =====

function animateSocialCards() {
  const socialCards = document.querySelectorAll('.social-card');

  socialCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        once: true
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: index * 0.08
    });

    // Hover effect with GSAP
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// ===== TIMELINE ITEMS =====

function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        once: true
      },
      scale: 0.85,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.4)',
      delay: index * 0.15
    });
  });

  // Animate timeline connecting line
  const timelineLine = document.querySelector('.timeline-line');
  if (timelineLine) {
    gsap.from(timelineLine, {
      scrollTrigger: {
        trigger: '.timeline-card',
        start: 'top 70%',
        once: true
      },
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.2,
      ease: 'power2.inOut'
    });
  }
}

// ===== TABLE ROWS =====

function animateTableRows() {
  const tableRows = document.querySelectorAll('.barrios-table tbody tr');

  tableRows.forEach((row, index) => {
    gsap.from(row, {
      scrollTrigger: {
        trigger: row,
        start: 'top 85%',
        once: true
      },
      x: -60,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      delay: index * 0.05
    });
  });
}

// ===== EVENT ITEMS =====

function animateEventItems() {
  const eventItems = document.querySelectorAll('.evento-item');

  eventItems.forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 82%',
        once: true
      },
      x: index % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: index * 0.08
    });

    // Subtle shake for high-risk events
    if (item.classList.contains('riesgo-alto')) {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          x: '+=5',
          yoyo: true,
          repeat: 2,
          duration: 0.1,
          ease: 'power1.inOut'
        });
      });
    }
  });
}

// ===== FAQ ACCORDION WITH GSAP =====

function animateFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item, index) => {
    // Entrance animation
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 95%',
        once: true
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: index * 0.05
    });

    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const chevron = item.querySelector('.faq-chevron');

    if (header && content) {
      header.addEventListener('click', function(e) {
        const isOpen = item.classList.contains('open');
        console.log('FAQ Clicked:', item.querySelector('.faq-question').textContent, 'Current state:', isOpen ? 'Open' : 'Closed');

        // Close all others
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherContent = otherItem.querySelector('.faq-content');
            const otherHeader = otherItem.querySelector('.faq-header');
            const otherChevron = otherItem.querySelector('.faq-chevron');
            
            if (otherItem.classList.contains('open')) {
              gsap.to(otherContent, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut' });
              otherItem.classList.remove('open');
              otherHeader.classList.remove('open');
              if (otherChevron) gsap.to(otherChevron, { rotate: 0, duration: 0.3 });
            }
          }
        });

        // Toggle current
        if (isOpen) {
          gsap.to(content, { 
            height: 0, 
            opacity: 0, 
            duration: 0.3, 
            ease: 'power2.inOut',
            onComplete: () => {
              item.classList.remove('open');
              header.classList.remove('open');
            }
          });
          if (chevron) gsap.to(chevron, { rotate: 0, duration: 0.3 });
        } else {
          item.classList.add('open');
          header.classList.add('open');
          
          gsap.fromTo(content, 
            { height: 0, opacity: 0 },
            { 
              height: 'auto', 
              opacity: 1, 
              duration: 0.4, 
              ease: 'power2.out',
              onComplete: () => {
                ScrollTrigger.refresh();
              }
            }
          );
          if (chevron) gsap.to(chevron, { rotate: 180, duration: 0.3 });
        }
      });
    }
  });
}

// ===== PHOTO INTERPRETATION CARDS =====

function animateFotoCards() {
  const fotoCards = document.querySelectorAll('.foto-card');

  fotoCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        once: true
      },
      rotationY: 90,
      opacity: 0,
      duration: 0.7,
      ease: 'back.out(1.4)',
      delay: index * 0.15
    });
  });
}

// ===== PERFORATIONS SECTION =====

function animatePerforationsSection() {
  const perfoCards = document.querySelectorAll('.perforations-card');
  const perfoNumbers = document.querySelectorAll('.perfor-num');

  // Animate cards
  perfoCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: '.perforations-section',
        start: 'top 70%',
        once: true
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.4)',
      delay: index * 0.15
    });
  });

  // Animate numbers
  perfoNumbers.forEach(numEl => {
    const target = parseInt(numEl.textContent);

    gsap.to('.perforations-section', {
      scrollTrigger: {
        trigger: '.perforations-section',
        start: 'top 70%',
        once: true,
        onEnter() {
          animateCounter(numEl, target, 2);
        }
      }
    });
  });
}

// ===== NAVBAR ACTIVE SECTION INDICATOR =====

function animateNavActiveIndicator() {
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    let currentSection = null;

    document.querySelectorAll('[id]').forEach(section => {
      if (section.id && section.offsetTop <= window.scrollY + 100) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const targetId = href ? href.replace('#', '') : null;

      if (targetId === currentSection) {
        link.classList.add('active');
        gsap.to(link, { color: '#1e6fb5', duration: 0.3 });
      } else {
        link.classList.remove('active');
        gsap.to(link, { color: 'inherit', duration: 0.3 });
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
}

// ===== SMOOTH SCROLL NAVIGATION =====

function animateSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        gsap.to(window, {
          scrollTo: {
            y: target,
            autoKill: false
          },
          duration: 0.8,
          ease: 'power2.inOut'
        });
      }
    });
  });
}

// ===== DOCUMENT CARDS =====

function animateDocCards() {
  const docCards = document.querySelectorAll('.doc-card');

  docCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: index * 0.1
    });
  });
}

// ===== INITIALIZE ALL ANIMATIONS =====

function initializeAnimations() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Run all animation functions
    animateHero();
    animateSectionTitles();
    animateStatsDashboard();
    animateNormaCards();
    animateSocialCards();
    animateTimeline();
    animateTableRows();
    animateEventItems();
    animateFAQAccordion();
    animateFotoCards();
    animatePerforationsSection();
    animateDocCards();
    animateNavActiveIndicator();
    animateSmoothScroll();

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
  }
}

// Start animations
initializeAnimations();
