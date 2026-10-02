/**
 * Wealth Wise Financial, Inc.
 * Modern Client-Side Controller & Interactive Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWealthSimulator();
  initFaqAccordion();
  initModals();
  initForms();
  initBackToTop();
  initSmoothScroll();
});

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-links a, .mobile-actions a, .mobile-actions button');

  // Sticky Navbar blur and background transition
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer toggle
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   Interactive Wealth & Growth Simulator (Compound Interest Engine)
   ========================================================================== */
function initWealthSimulator() {
  const inputInitial = document.getElementById('calc-initial');
  const inputMonthly = document.getElementById('calc-monthly');
  const inputYears = document.getElementById('calc-years');
  const inputReturn = document.getElementById('calc-return');

  const displayInitial = document.getElementById('val-initial');
  const displayMonthly = document.getElementById('val-monthly');
  const displayYears = document.getElementById('val-years');
  const displayReturn = document.getElementById('val-return');

  const totalValueEl = document.getElementById('calc-total-result');
  const totalPrincipalEl = document.getElementById('calc-principal-result');
  const totalGrowthEl = document.getElementById('calc-growth-result');
  const barPrincipal = document.getElementById('calc-bar-p');
  const barGrowth = document.getElementById('calc-bar-g');

  if (!inputInitial || !inputMonthly || !inputYears || !inputReturn) return;

  function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  }

  function calculate() {
    const P = parseFloat(inputInitial.value) || 0;
    const PMT = parseFloat(inputMonthly.value) || 0;
    const years = parseFloat(inputYears.value) || 0;
    const annualRate = (parseFloat(inputReturn.value) || 0) / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = years * 12;

    // Display formatted input values
    displayInitial.textContent = formatCurrency(P);
    displayMonthly.textContent = formatCurrency(PMT) + '/mo';
    displayYears.textContent = `${years} Years`;
    displayReturn.textContent = `${inputReturn.value}%`;

    // Compound Interest Calculation with regular monthly additions
    let futureValue = 0;
    if (monthlyRate === 0) {
      futureValue = P + (PMT * totalMonths);
    } else {
      // FV = P * (1 + r/n)^(n*t) + PMT * [ ((1 + r/n)^(n*t) - 1) / (r/n) ]
      const compoundFactor = Math.pow(1 + monthlyRate, totalMonths);
      const principalGrowth = P * compoundFactor;
      const contributionsGrowth = PMT * ((compoundFactor - 1) / monthlyRate);
      futureValue = principalGrowth + contributionsGrowth;
    }

    const totalPrincipal = P + (PMT * totalMonths);
    const totalGrowth = Math.max(0, futureValue - totalPrincipal);

    // Update displays
    totalValueEl.textContent = formatCurrency(futureValue);
    totalPrincipalEl.textContent = formatCurrency(totalPrincipal);
    totalGrowthEl.textContent = formatCurrency(totalGrowth);

    // Visual proportional progress bar
    if (futureValue > 0) {
      const principalPct = Math.min(100, Math.max(5, (totalPrincipal / futureValue) * 100));
      const growthPct = 100 - principalPct;
      barPrincipal.style.width = `${principalPct}%`;
      barGrowth.style.width = `${growthPct}%`;
    }
  }

  [inputInitial, inputMonthly, inputYears, inputReturn].forEach(input => {
    input.addEventListener('input', calculate);
  });

  // Initial calculation trigger
  calculate();
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
      questionBtn.setAttribute('aria-expanded', (!isActive).toString());
    });
  });
}

/* ==========================================================================
   Modals (Client Portal & Consultation Quick Booker)
   ========================================================================== */
function initModals() {
  const portalTriggers = document.querySelectorAll('[data-open-modal="portal-modal"]');
  const portalModal = document.getElementById('portal-modal');
  const closeBtns = document.querySelectorAll('[data-close-modal]');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  portalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(portalModal);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Click outside backdrop to close
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => {
        closeModal(modal);
      });
    }
  });
}

/* ==========================================================================
   Form Handling & Consultation Scheduler
   ========================================================================== */
function initForms() {
  const contactForm = document.getElementById('consultation-form');
  const successMsg = document.getElementById('form-success-box');
  const newsletterForm = document.getElementById('newsletter-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"/>
        </svg>
        <span>Securing Request...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 8000);
        }
      }, 900);
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        const btn = newsletterForm.querySelector('button');
        const orig = btn.textContent;
        btn.textContent = 'Subscribed ✓';
        input.value = '';
        setTimeout(() => {
          btn.textContent = orig;
        }, 3000);
      }
    });
  }
}

/* ==========================================================================
   Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   Smooth Scroll Handling for Internal Anchors
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
