/**
 * Sulakshaa Multi Speciality Hospital, Mysuru
 * Main JavaScript Controller
 * Modern, Interactive & Accessible Vanilla ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize Official Splash Screen
  initSplashScreen();

  // 1. Initialize Lucide Icons
  initLucideIcons();

  // 2. Set Dynamic Footer Year
  setCurrentYear();

  // 3. Header Scroll States, Reading Progress & Back to Top
  initHeaderScroll();

  // 4. Mobile Navigation Drawer Controls & Morphing Hamburger
  initMobileNavigation();

  // 4b. Navigation Dropdown Controls (More / Services)
  initNavDropdowns();

  // 5. Scroll Reveal System (IntersectionObserver)
  initScrollReveal();

  // 6. Active Section Highlighting
  initActiveNavHighlight();

  // 7. Animated Statistics Counter (Verified Data Only)
  initStatisticsCounter();

  // 8. Interactive Speciality & Doctor Enquiries Connection
  initInteractiveEnquiries();

  // 9. Multi-Step Appointment Booking Form with Transitions & Animated Success
  initMultiStepBookingForm();

  // 10. Informational Modals (Medical Disclaimer, Privacy, Terms, Doctor Profile, Speciality Scope)
  initInfoModals();

  // 11. Facilities Ambient Video Controller
  initFacilityVideoController();

  // 12. Doctors Directory Page Live Search & Filter System
  initDoctorsPageFilters();

  // 13. Doctors Editorial Showcase Carousel
  initDoctorsCarousel();

  // 14. Clinical Specialties Journey Showcase Controller
  initClinicalJourneyShowcase();

  // 15. Doctor Cards 3D Interactive Tilt & Micro-Animations
  initDoctorCards3DTilt();

  // 16. Animated Medical Specialties Cinema Showcase
  initSpecialityCinema();

  // 17. Campus Gallery Modal
  initCampusTourModal();

  // 18. Patient Care Circular-Orbit Card Carousel
  initPatientCareOrbit();

  // 19. Leading Specialists Continuous Infinite Marquee
  initDoctorsMarquee();

  // 20. Specialities Grid 6-Card Toggle Controller
  initSpecialitiesToggle();

  // 21. Hero Facilities Image Crossfade Slideshow
  initHeroSlideshow();

  // 22. Facilities View All / Show Less Toggle Controller
  initFacilitiesViewAllToggle();

  // 23. Featured Leading Specialists Horizontal Swipe Controller
  initFeaturedDoctorsSwipe();

  // 24. Our Departments & Centres of Excellence Horizontal Scroll Controller
  initDepartmentsCarousel();

  // 26. Patient Testimonials Horizontal Carousel Controller
  initTestimonialsCarousel();

  // 27. Health Insights & Hospital Updates View All Toggle Controller
  initBlogViewAll();
});

/**
 * 0. Sulakshaa Multi Speciality Hospital Splash Screen Controller
 * Handles initial visit check via sessionStorage, smooth entrance, loading bar, and cleanup
 */
function initSplashScreen() {
  const splash = document.getElementById('splashScreen');
  if (!splash) {
    try {
      sessionStorage.setItem('sulakshaa_splash_shown', 'true');
    } catch (e) {}
    return;
  }

  // Check accessibility preference
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check if already shown during this browser session
  let alreadyShown = false;
  try {
    alreadyShown = Boolean(sessionStorage.getItem('sulakshaa_splash_shown'));
  } catch (err) {
    // Storage access fallback
  }

  if (alreadyShown || isReducedMotion) {
    if (splash.parentNode) {
      splash.parentNode.removeChild(splash);
    }
    return;
  }

  // Record that splash was shown for this session
  try {
    sessionStorage.setItem('sulakshaa_splash_shown', 'true');
  } catch (err) {
    // Ignore storage errors
  }

  // Lock background scroll during splash
  document.body.classList.add('splash-active');

  const dismissSplash = () => {
    if (splash.classList.contains('splash-fade-out')) return;
    splash.classList.add('splash-fade-out');
    document.body.classList.remove('splash-active');

    setTimeout(() => {
      if (splash.parentNode) {
        splash.parentNode.removeChild(splash);
      }
    }, 650);
  };

  // Skip Intro Button Event Listener
  const skipBtn = document.getElementById('splashSkipBtn');
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dismissSplash();
    });
  }

  const SPLASH_DURATION = 2300; // 2.3 seconds
  const fadeTimer = setTimeout(dismissSplash, SPLASH_DURATION);

  window.addEventListener('pagehide', () => clearTimeout(fadeTimer), { once: true });
}

/**
 * Initialize Lucide icons with error-handling fallback
 */
function initLucideIcons() {
  try {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  } catch (err) {
    console.warn('Lucide icons initialization error:', err);
  }
}

/**
 * Set current year in footer
 */
function setCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Handle header scroll, reading progress bar & circular back-to-top button
 */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  const progressBar = document.getElementById('readingProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progressCircle = document.getElementById('progressRingCircle');
  const circumference = 2 * Math.PI * 20; // r = 20 => ~125.66

  if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;
  }

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.min(Math.max((scrollY / docHeight) * 100, 0), 100) : 0;

    // Header sticky shadow & shrink
    if (header) {
      if (scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    // Reading progress bar
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Back to top button visibility & circular ring fill
    if (backToTopBtn) {
      if (scrollY > 320) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }

    if (progressCircle) {
      const offset = circumference - (scrollPercent / 100) * circumference;
      progressCircle.style.strokeDashoffset = `${offset}`;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Back to top button click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Mobile Navigation Drawer Toggle, Backdrop & Morphing Hamburger
 */
function initMobileNavigation() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const navDrawer = document.getElementById('mobileNavMenu');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link:not(.mobile-dropdown-toggle), .mobile-sub-link, .mobile-drawer-btn');
  const mobileDropdownToggle = document.getElementById('mobileDropdownBtn');
  const mobileDropdownParent = mobileDropdownToggle ? mobileDropdownToggle.closest('.mobile-nav-dropdown') : null;

  if (!mobileBtn || !navDrawer) return;

  const openDrawer = () => {
    navDrawer.classList.add('is-open');
    navDrawer.setAttribute('aria-hidden', 'false');
    mobileBtn.setAttribute('aria-expanded', 'true');
    mobileBtn.classList.add('is-active');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    navDrawer.classList.remove('is-open');
    navDrawer.setAttribute('aria-hidden', 'true');
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileBtn.classList.remove('is-active');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    if (mobileDropdownParent) {
      mobileDropdownParent.classList.remove('is-open');
      if (mobileDropdownToggle) mobileDropdownToggle.setAttribute('aria-expanded', 'false');
    }
  };

  mobileBtn.addEventListener('click', () => {
    const isOpen = navDrawer.classList.contains('is-open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Mobile Dropdown Accordion Toggle
  if (mobileDropdownToggle && mobileDropdownParent) {
    mobileDropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = mobileDropdownParent.classList.toggle('is-open');
      mobileDropdownToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      const subMenu = mobileDropdownParent.querySelector('.mobile-sub-menu');
      if (subMenu) subMenu.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');
    });
  }

  // Close when clicking mobile links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/**
 * Desktop Navigation Dropdowns Keyboard & Click Support
 */
function initNavDropdowns() {
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');

  dropdownItems.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  });

  document.addEventListener('click', (e) => {
    dropdownItems.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/**
 * Scroll Reveal Animation using IntersectionObserver
 */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Animated Statistics Counter using Verified Data
 */
function initStatisticsCounter() {
  const statsSection = document.getElementById('hospital-stats');
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!statNumbers.length) return;

  const runCounterAnimation = () => {
    statNumbers.forEach(numEl => {
      const target = parseInt(numEl.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      if (prefersReducedMotion) {
        numEl.textContent = target;
        return;
      }

      const duration = 1600; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutCubic curve
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        numEl.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          numEl.textContent = target;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    runCounterAnimation();
    return;
  }

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounterAnimation();
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  if (statsSection) {
    observer.observe(statsSection);
  } else {
    runCounterAnimation();
  }
}

/**
 * Active navigation link highlighting on scroll
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href') || '';
          if (href === `#${id}` || href === `index.html#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
}

/**
 * Connect Specialities and Doctor Cards to the Appointment Form
 */
function initInteractiveEnquiries() {
  const specialityButtons = document.querySelectorAll('.speciality-enquire-btn, .cinema-enquire-btn');
  const specialitySelect = document.getElementById('preferredSpeciality');
  const patientMessageInput = document.getElementById('patientMessage');
  const enquirySection = document.getElementById('enquiry');

  const selectSpeciality = (dept) => {
    if (!specialitySelect || !dept) return;

    for (let i = 0; i < specialitySelect.options.length; i++) {
      if (specialitySelect.options[i].value === dept || specialitySelect.options[i].text.includes(dept)) {
        specialitySelect.selectedIndex = i;
        break;
      }
    }

    // Sync quick chip highlight
    const chips = document.querySelectorAll('.dept-chip');
    chips.forEach(chip => {
      if (chip.getAttribute('data-dept') === specialitySelect.value) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  };

  // Speciality Card Enquiry click
  specialityButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dept = btn.getAttribute('data-dept');
      selectSpeciality(dept);

      if (window.SulakshaaForm && window.SulakshaaForm.goToStep) {
        window.SulakshaaForm.goToStep(1);
      }

      if (enquirySection) {
        enquirySection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (specialitySelect) specialitySelect.focus();
        }, 500);
      }
    });
  });

  // Doctor Enquiry click (from featured cards and directory)
  const doctorEnquireButtons = document.querySelectorAll('.doctor-enquire-btn, .featured-doc-book-btn');
  doctorEnquireButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const doctor = btn.getAttribute('data-doctor') || 'Dr. Laxme Gowda';
      const dept = btn.getAttribute('data-dept') || 'General Medicine';
      selectSpeciality(dept);

      const doctorSelect = document.getElementById('preferredDoctor');
      if (doctorSelect) {
        doctorSelect.value = doctor;
      }
      
      if (patientMessageInput && !patientMessageInput.value) {
        patientMessageInput.value = `Enquiring for consultation with ${doctor} (${dept}).`;
      }

      const enquiryTarget = document.getElementById('enquiry') || document.getElementById('contact');
      if (enquiryTarget) {
        enquiryTarget.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Senior Sunday Camp Enquiry click
  const campButtons = document.querySelectorAll('.campaign-enquire-btn');
  campButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectSpeciality('Senior Sunday');
      
      if (patientMessageInput && !patientMessageInput.value) {
        patientMessageInput.value = 'Enquiry regarding upcoming Senior Sunday Health Check-up Camp.';
      }

      const enquiryTarget = document.getElementById('enquiry') || document.getElementById('contact');
      if (enquiryTarget) {
        enquiryTarget.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Handle URL query parameters (e.g. redirected from doctors.html with ?doctor=...&dept=...)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlDept = urlParams.get('dept');
    const urlDoctor = urlParams.get('doctor');

    if (urlDept) {
      selectSpeciality(urlDept);
    }
    const doctorSelect = document.getElementById('preferredDoctor');
    if (urlDoctor && doctorSelect) {
      doctorSelect.value = urlDoctor;
    }
    if (urlDoctor && patientMessageInput && !patientMessageInput.value) {
      patientMessageInput.value = `Consultation appointment requested with ${urlDoctor}${urlDept ? ' (' + urlDept + ')' : ''}.`;
    }
    if ((urlDept || urlDoctor) && window.location.hash === '#enquiry') {
      setTimeout(() => {
        const enquiryTarget = document.getElementById('enquiry') || document.getElementById('contact');
        if (enquiryTarget) {
          enquiryTarget.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    }
  } catch (err) {
    // URL parsing fallback
  }
}

/**
 * Unified Appointment Booking Form with Validation & Animated Success Screen
 */
function initMultiStepBookingForm() {
  const form = document.getElementById('appointmentEnquiryForm');
  if (!form) return;

  const nameInput = document.getElementById('patientName');
  const phoneInput = document.getElementById('patientPhone');
  const emailInput = document.getElementById('patientEmail');
  const specialitySelect = document.getElementById('preferredSpeciality');
  const doctorSelect = document.getElementById('preferredDoctor');
  const dateInput = document.getElementById('preferredDate');
  const messageInput = document.getElementById('patientMessage');
  const consentCheckbox = document.getElementById('patientConsent');

  const successView = document.getElementById('formSuccessView');
  const submitBtn = document.getElementById('submitEnquiryBtn');
  const bookAnotherBtn = document.getElementById('bookAnotherBtn');

  const deptChips = document.querySelectorAll('.dept-chip');
  const datePillToday = document.getElementById('datePillToday');
  const datePillTomorrow = document.getElementById('datePillTomorrow');

  // Set minimum date to today
  const getFormattedDate = (dateObj) => {
    return dateObj.toISOString().split('T')[0];
  };

  const todayStr = getFormattedDate(new Date());
  if (dateInput) {
    dateInput.setAttribute('min', todayStr);
    if (!dateInput.value) {
      dateInput.value = todayStr;
    }
  }

  // Quick Date Pills
  if (datePillToday) {
    datePillToday.addEventListener('click', () => {
      if (dateInput) {
        dateInput.value = todayStr;
        clearFieldError('preferredDate');
      }
    });
  }

  if (datePillTomorrow) {
    datePillTomorrow.addEventListener('click', () => {
      if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = getFormattedDate(tomorrow);
        clearFieldError('preferredDate');
      }
    });
  }

  // Quick Department Chips (if present)
  deptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const dept = chip.getAttribute('data-dept');
      if (specialitySelect && dept) {
        specialitySelect.value = dept;
        clearFieldError('preferredSpeciality');
        deptChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      }
    });
  });

  if (specialitySelect) {
    specialitySelect.addEventListener('change', () => {
      clearFieldError('preferredSpeciality');
      const val = specialitySelect.value;
      deptChips.forEach(chip => {
        if (chip.getAttribute('data-dept') === val) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });
    });
  }

  if (doctorSelect) {
    doctorSelect.addEventListener('change', () => {
      clearFieldError('preferredDoctor');
    });
  }

  // Phone input formatting (numbers only, max 10 digits)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
      clearFieldError('patientPhone');
    });
  }

  // Clear errors on input
  nameInput?.addEventListener('input', () => clearFieldError('patientName'));
  emailInput?.addEventListener('input', () => clearFieldError('patientEmail'));
  dateInput?.addEventListener('change', () => clearFieldError('preferredDate'));
  consentCheckbox?.addEventListener('change', () => clearFieldError('patientConsent'));

  // Backward compatibility object
  window.SulakshaaForm = {
    goToStep: () => {
      const el = document.getElementById('enquiry') || document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Comprehensive Form Validation
  const validateForm = () => {
    let valid = true;

    // 1. Patient Name (minimum 2 characters)
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal || nameVal.length < 2) {
      showFieldError('patientName', 'Please enter patient full name (minimum 2 characters).');
      valid = false;
    } else {
      clearFieldError('patientName');
    }

    // 2. Phone Number (10-digit Indian mobile starting with 6-9)
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneVal) {
      showFieldError('patientPhone', 'Please enter your 10-digit mobile number.');
      valid = false;
    } else if (!phoneRegex.test(phoneVal)) {
      showFieldError('patientPhone', 'Please enter a valid 10-digit Indian mobile number (starts with 6-9).');
      valid = false;
    } else {
      clearFieldError('patientPhone');
    }

    // 3. Email Address
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      showFieldError('patientEmail', 'Please enter your email address for appointment confirmation.');
      valid = false;
    } else if (!emailRegex.test(emailVal)) {
      showFieldError('patientEmail', 'Please enter a valid email address (e.g. name@domain.com).');
      valid = false;
    } else {
      clearFieldError('patientEmail');
    }

    // 4. Medical Department / Speciality
    const specVal = specialitySelect ? specialitySelect.value : '';
    if (!specVal) {
      showFieldError('preferredSpeciality', 'Please select a preferred medical department.');
      valid = false;
    } else {
      clearFieldError('preferredSpeciality');
    }

    // 5. Preferred Date
    const dateVal = dateInput ? dateInput.value : '';
    if (!dateVal) {
      showFieldError('preferredDate', 'Please select your preferred consultation date.');
      valid = false;
    } else {
      clearFieldError('preferredDate');
    }

    // 6. Consent Checkbox
    if (consentCheckbox && !consentCheckbox.checked) {
      showFieldError('patientConsent', 'Please consent to allow our hospital reception to contact you.');
      valid = false;
    } else {
      clearFieldError('patientConsent');
    }

    return valid;
  };

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const specVal = specialitySelect ? specialitySelect.value : '';
    const doctorVal = doctorSelect && doctorSelect.value ? doctorSelect.value : 'Any Available Specialist';
    const dateVal = dateInput ? dateInput.value : '';

    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="icon-sm" style="animation: spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Recording Enquiry...</span>
      `;
    }

    // Simulated submission with animated response
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }

      // Hide form input rows and show success view
      const formRows = form.querySelectorAll('.form-row-2col, .interactive-group, .consent-group, .form-submit-row');
      formRows.forEach(row => { row.style.display = 'none'; });

      if (successView) {
        successView.style.display = 'flex';

        const summaryBox = document.getElementById('successSummaryBox');
        if (summaryBox) {
          summaryBox.innerHTML = `
            <div class="success-summary-row">
              <span class="text-muted">Patient Name:</span>
              <strong>${escapeHtml(nameVal)}</strong>
            </div>
            <div class="success-summary-row">
              <span class="text-muted">Contact Phone:</span>
              <strong>+91 ${escapeHtml(phoneVal)}</strong>
            </div>
            <div class="success-summary-row">
              <span class="text-muted">Email Address:</span>
              <strong>${escapeHtml(emailVal)}</strong>
            </div>
            <div class="success-summary-row">
              <span class="text-muted">Department:</span>
              <strong>${escapeHtml(specVal)}</strong>
            </div>
            <div class="success-summary-row">
              <span class="text-muted">Preferred Doctor:</span>
              <strong>${escapeHtml(doctorVal)}</strong>
            </div>
            <div class="success-summary-row">
              <span class="text-muted">Preferred Date:</span>
              <strong>${escapeHtml(dateVal)}</strong>
            </div>
            <div class="success-summary-row">
              <span class="text-muted">Hospital Campus:</span>
              <span>Sulakshaa Multi Speciality Hospital, Mysuru</span>
            </div>
          `;
        }
      }

      showToast(
        'Enquiry Submitted Successfully',
        `Thank you, ${nameVal}. Your consultation enquiry has been recorded. Our reception coordinator will call +91 ${phoneVal} to confirm your appointment slot.`,
        'success'
      );

      initLucideIcons();
    }, 650);
  });

  // Book Another Appointment button
  if (bookAnotherBtn) {
    bookAnotherBtn.addEventListener('click', () => {
      form.reset();
      if (dateInput) dateInput.value = todayStr;
      
      deptChips.forEach(c => c.classList.remove('active'));

      if (successView) successView.style.display = 'none';
      const formRows = form.querySelectorAll('.form-row-2col, .interactive-group, .consent-group, .form-submit-row');
      formRows.forEach(row => { row.style.display = ''; });

      if (nameInput) nameInput.focus();
    });
  }
}

function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(`${fieldId}Error`);
  if (input) {
    input.classList.add('is-invalid');
  }
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearFieldError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(`${fieldId}Error`);
  if (input) {
    input.classList.remove('is-invalid');
  }
  if (errorElement) {
    errorElement.textContent = '';
  }
}

/**
 * Toast Notification System
 */
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');

  const iconColor = type === 'success' ? '#16865C' : '#0088D1';

  toast.innerHTML = `
    <div class="toast-icon">
      <svg class="icon-md" style="color: ${iconColor};" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
      </svg>
    </div>
    <div class="toast-content">
      <div class="toast-title">${escapeHtml(title)}</div>
      <div class="toast-message">${escapeHtml(message)}</div>
    </div>
  `;

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 6 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 6000);
}

/**
 * Informational Modals System
 */
function initInfoModals() {
  const modal = document.getElementById('infoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const okBtn = document.getElementById('modalOkBtn');

  if (!modal || !modalTitle || !modalBody) return;

  const openModal = (title, contentHtml) => {
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHtml;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    initLucideIcons();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  okBtn?.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Medical Disclaimer Trigger
  const disclaimerBtn = document.getElementById('openDisclaimerBtn');
  disclaimerBtn?.addEventListener('click', () => {
    openModal(
      'Medical Disclaimer',
      `
      <h4>1. General Information Only</h4>
      <p>The information published on this website is for general educational, informative, and navigational purposes only. It is not intended to be a substitute for professional clinical diagnosis, medical advice, or personalized treatment.</p>
      
      <h4>2. No Doctor-Patient Relationship</h4>
      <p>Using this website, submitting an appointment enquiry form, or communicating via phone or email does not automatically establish a formal doctor-patient relationship until an in-person or verified clinical consultation has taken place.</p>
      
      <h4>3. Emergency Services Notice</h4>
      <p>This website and its online enquiry forms are NOT designed for acute or life-threatening emergencies. If you or a loved one are experiencing acute chest pain, stroke symptoms, uncontrolled bleeding, severe trauma, or breathing distress, please report immediately to our 24/7 Casualty at Sulakshaa Multi Speciality Hospital, Mysuru, or dial India's emergency helpline <strong>112</strong>.</p>

      <h4>4. Verification Notice</h4>
      <p>Hospital facility numbers, specific doctor OPD schedules, and infrastructure specifications are subject to official verification and hospital operational updates.</p>
      `
    );
  });

  // Privacy Policy Trigger
  const privacyBtn = document.getElementById('openPrivacyBtn');
  privacyBtn?.addEventListener('click', () => {
    openModal(
      'Privacy Policy',
      `
      <h4>1. Information Collection</h4>
      <p>When you submit an appointment enquiry on this website, we collect minimal personal details including your name, telephone number, preferred speciality, and consultation date solely to assist you in coordinating your visit.</p>

      <h4>2. No Health Data Stored Locally</h4>
      <p>In accordance with healthcare privacy best practices, this website does not store sensitive diagnostic or personal health data in your browser's local storage.</p>

      <h4>3. Use of Information</h4>
      <p>Your contact details are used exclusively by the authorized hospital front desk and reception team to follow up on your appointment request. We do not sell or disclose your information to third-party commercial marketing entities.</p>

      <h4>4. Patient Confidentiality</h4>
      <p>All clinical consultations and inpatient records maintained inside Sulakshaa Multi Speciality Hospital strictly follow established medical confidentiality regulations.</p>
      `
    );
  });

  // Terms of Use Trigger
  const termsBtn = document.getElementById('openTermsBtn');
  termsBtn?.addEventListener('click', () => {
    openModal(
      'Terms of Use',
      `
      <h4>1. Website Usage</h4>
      <p>By accessing the Sulakshaa Multi Speciality Hospital website, you agree to comply with these terms. The content, logo, photographs, and branding are the property of Sulakshaa Multi Speciality Hospital.</p>

      <h4>2. Appointment Requests</h4>
      <p>Submitting an appointment enquiry via this website constitutes a request for contact and does not guarantee an immediate confirmed slot until officially accepted and confirmed by our hospital reception.</p>

      <h4>3. Accuracy of Information</h4>
      <p>While we make every effort to maintain accurate and up-to-date hospital information, doctor timings and clinic rosters are subject to change based on emergencies and clinical duty requirements.</p>
      `
    );
  });

  // View Doctor Profile Trigger
  const doctorProfiles = {
    'Dr. Sarah Johnson': {
      name: 'Dr. Sarah Johnson',
      role: 'Consultant Primary Care Physician (MD) &bull; 14+ Years Experience',
      badge: 'Family Practice Specialist',
      img: 'https://images.unsplash.com/photo-1594824813571-638f02614d3f?auto=format&fit=crop&w=480&h=420&q=80',
      speciality: 'Family Medicine, Preventive Healthcare, Lifestyle Disease Assessment, Routine Health Screening, Vaccinations &amp; Comprehensive Wellness.',
      philosophy: 'Dedicated to compassionate, continuous family healthcare with an emphasis on early detection, preventive guidance, and holistic patient well-being.',
      timings: 'Monday to Friday (9:00 AM - 1:00 PM).'
    },
    'Dr. Michael Chen': {
      name: 'Dr. Michael Chen',
      role: 'Senior Consultant Cardiologist (MD, FACC) &bull; 15+ Years Experience',
      badge: 'Cardiology Specialist',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=480&h=420&q=80',
      speciality: 'Preventative Cardiology, Coronary Artery Disease, Hypertension, Non-Invasive Echocardiography &amp; Cardiac Risk Stratification.',
      philosophy: 'Patient-centred cardiac wellness uniting clinical precision with actionable preventive advice to safeguard long-term cardiovascular vitality.',
      timings: 'Monday to Saturday (10:00 AM - 2:00 PM).'
    },
    'Dr. Amara Okafor': {
      name: 'Dr. Amara Okafor',
      role: 'Consultant Paediatrician (MD, FAAP) &bull; 12+ Years Experience',
      badge: 'Pediatrics Specialist',
      img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=480&h=420&q=80',
      speciality: 'General Paediatrics, Newborn Care, Developmental Milestones, Childhood Vaccinations, Asthma &amp; Allergy Management.',
      philosophy: 'Creating a comforting, joyful clinical environment where children feel secure and parents receive empathetic, expert guidance for growing families.',
      timings: 'Monday to Friday (9:30 AM - 1:30 PM).'
    },
    'Dr. James Rodriguez': {
      name: 'Dr. James Rodriguez',
      role: 'Consultant Orthopedic Surgeon (MS Ortho, FAAOS) &bull; 16+ Years Experience',
      badge: 'Orthopedics Specialist',
      img: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=480&h=420&q=80',
      speciality: 'Musculoskeletal Disorders, Arthroscopic Joint Surgery, Sports Medicine, Complex Fracture Fixation &amp; Mobility Restoration.',
      philosophy: 'Restoring mobility and quality of life through individualized surgical expertise, minimally invasive procedures, and dedicated recovery programs.',
      timings: 'Tuesday, Thursday, Saturday (2:00 PM - 6:00 PM).'
    },
    'Dr. Emily Thompson': {
      name: 'Dr. Emily Thompson',
      role: 'Board-Certified Dermatologist (MD, FAAD) &bull; 11+ Years Experience',
      badge: 'Dermatology Specialist',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&h=420&q=80',
      speciality: 'Clinical Dermatology, Skin Allergy Assessment, Eczema &amp; Psoriasis Management, Acne Therapy &amp; Dermatological Care.',
      philosophy: 'Providing evidence-based, compassionate care for acute and chronic skin conditions to foster lasting health and personal confidence.',
      timings: 'Monday, Wednesday, Friday (3:00 PM - 7:00 PM).'
    },
    'Dr. Laxme Gowda': {
      name: 'Dr. Laxme Gowda',
      role: 'Senior General Physician (MBBS, MD) &bull; 45+ Years Experience',
      badge: 'Verified Senior Faculty',
      img: 'assets/dr-laxme-gowda.png',
      speciality: 'General Medicine, Adult Primary Healthcare, Chronic Disease &amp; Diabetes Management, Geriatric Health, Hypertension, Fever &amp; Infection Evaluation.',
      philosophy: 'Dr. Laxme Gowda is a revered medical practitioner in Mysuru with over four and a half decades of trusted clinical practice. He brings profound diagnostic wisdom and a compassionate bedside manner to patient care at Sulakshaa Multi Speciality Hospital, focusing on accurate physical diagnosis, prudent investigation, and personalized treatment.',
      timings: 'Monday to Saturday (Daily token-based OPD consultations). Please enquire via front desk or online enquiry form.'
    },
    'Dr. Priya S. Sharma': {
      name: 'Dr. Priya S. Sharma',
      role: 'Consultant Cardiologist (MD, DM Cardiology) &bull; 16+ Years Experience',
      badge: 'Cardiology Consultant',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=350&h=380&q=80',
      speciality: 'Clinical Cardiology, 2D Echocardiography, Preventative Heart Health, Coronary Artery Care, Arrhythmia &amp; Hypertension Management.',
      philosophy: 'Committed to evidence-based preventive cardiology and advanced non-invasive cardiac diagnosis, empowering patients with lifestyle awareness and timely therapeutic care.',
      timings: 'Monday to Friday (10:00 AM - 2:00 PM). Prior appointment enquiry recommended.'
    },
    'Dr. Anand R. Kulkarni': {
      name: 'Dr. Anand R. Kulkarni',
      role: 'Senior Orthopedic Surgeon (MS Ortho, DNB) &bull; 14+ Years Experience',
      badge: 'Orthopedic Consultant',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=350&h=380&q=80',
      speciality: 'Joint Reconstruction &amp; Replacement, Arthroscopic Sports Medicine, Complex Trauma &amp; Fracture Fixation, Degenerative Spine Management.',
      philosophy: 'Focuses on surgical precision, minimally invasive techniques, and rapid post-operative rehabilitation for joint mobility and pain-free living.',
      timings: 'Tuesday, Thursday, Saturday (3:00 PM - 7:00 PM). Token consultations upon confirmation.'
    },
    'Dr. Sneha Hegde': {
      name: 'Dr. Sneha Hegde',
      role: 'Consultant Paediatrician (MD Paediatrics) &bull; 12+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'assets/dr-sneha-hegde.jpg',
      speciality: 'General Paediatrics, Newborn Health, Childhood Immunisation, Developmental Milestones &amp; Paediatric Emergency Assessment.',
      philosophy: 'Providing gentle, family-centred healthcare for newborns, children, and adolescents with empathetic communication and meticulous paediatric care.',
      timings: 'Monday to Saturday (9:00 AM - 1:00 PM).'
    },
    'Dr. Vikram M. Rao': {
      name: 'Dr. Vikram M. Rao',
      role: 'Consultant Neurologist (MBBS, DM Neurology) &bull; 15+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=350&h=380&q=80',
      speciality: 'Clinical Neurology, Stroke Recovery, Epilepsy &amp; Seizure Disorders, Neuropathy, Migraine &amp; Chronic Headache Assessment.',
      philosophy: 'Dedicated to precision diagnostic mapping and compassionate management for chronic neurological and neuromuscular conditions.',
      timings: 'Monday, Wednesday, Friday (2:00 PM - 6:00 PM).'
    },
    'Dr. Meera N. Iyer': {
      name: 'Dr. Meera N. Iyer',
      role: 'Consultant Obstetrician &amp; Gynaecologist (MBBS, MS OBG, DGO) &bull; 18+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'assets/dr-meera-iyer.jpg',
      speciality: 'Maternity Care, High-Risk Pregnancy Management, Antenatal &amp; Postnatal Wellness, Women Health Consultations &amp; Minimally Invasive Gynaecology.',
      philosophy: 'Empowering mothers and families with supportive, attentive, and clinically rigorous maternity care at every step.',
      timings: 'Monday to Saturday (10:00 AM - 3:00 PM).'
    },
    'Dr. Rajesh K. Varma': {
      name: 'Dr. Rajesh K. Varma',
      role: 'Consultant Gastroenterologist (MBBS, MD, DNB Gastroenterology) &bull; 13+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=350&h=380&q=80',
      speciality: 'Digestive Health, Liver Disorders, Gastrointestinal Endoscopy, Acid Peptic Disease &amp; Irritable Bowel Syndrome Care.',
      philosophy: 'Evidence-based digestive care combining modern diagnostic endoscopy with tailored nutritional and therapeutic support.',
      timings: 'Tuesday, Thursday, Saturday (11:00 AM - 3:00 PM).'
    },
    'Dr. Rashmi Desai': {
      name: 'Dr. Rashmi Desai',
      role: 'Consultant Dermatologist (MBBS, MD DVL) &bull; 10+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=350&h=380&q=80',
      speciality: 'Clinical Dermatology, Eczema, Psoriasis, Skin Allergies, Dermatological Infections &amp; Adolescent Acne Care.',
      philosophy: 'Holistic clinical evaluation for acute and chronic skin ailments, enhancing patient confidence through evidence-based dermatological care.',
      timings: 'Monday, Wednesday, Friday (4:00 PM - 7:30 PM).'
    },
    'Dr. Suresh Babu': {
      name: 'Dr. Suresh Babu',
      role: 'Senior General &amp; Laparoscopic Surgeon (MBBS, MS General Surgery, FMAS) &bull; 20+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=350&h=380&q=80',
      speciality: 'Minimally Invasive Laparoscopy, Hernia Repair, Appendicectomy, Gallbladder Surgery, Wound Care &amp; Minor Operative Procedures.',
      philosophy: 'Patient safety, surgical diligence, and swift post-operative rehabilitation through advanced minimally invasive surgical protocols.',
      timings: 'Monday to Saturday (On-Call &amp; OPD 12:00 PM - 4:00 PM).'
    },
    'Dr. Kavitha Sundaram': {
      name: 'Dr. Kavitha Sundaram',
      role: 'Consultant Psychiatrist (MBBS, MD Psychiatry) &bull; 11+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=350&h=380&q=80',
      speciality: 'Adult Mental Health, Anxiety &amp; Depression Counseling, Stress Management, Sleep Disorders &amp; Behavioral Health Therapy.',
      philosophy: 'Confidential, empathetic, and de-stigmatized mental health care tailored to the psychological and emotional wellness of each individual.',
      timings: 'Tuesday, Thursday, Saturday (2:00 PM - 5:00 PM).'
    },
    'Dr. Arun Kumar S.': {
      name: 'Dr. Arun Kumar S.',
      role: 'Consultant Pulmonologist (MBBS, MD, DTCD) &bull; 14+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&h=400&q=80',
      speciality: 'Pulmonology, Respiratory Disorders, Asthma &amp; COPD Care, Bronchoscopy, Sleep Apnea &amp; Post-Infectious Lung Health.',
      philosophy: 'Dedicated to comprehensive pulmonary care, early intervention in chronic airways disease, and breathing rehabilitation.',
      timings: 'Monday to Saturday (10:00 AM - 2:00 PM).'
    },
    'Dr. Jayanth Murthy': {
      name: 'Dr. Jayanth Murthy',
      role: 'Consultant Nephrologist (MBBS, MD, DM Nephrology) &bull; 16+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=400&h=400&q=80',
      speciality: 'Clinical Nephrology, Chronic Kidney Disease, Hypertension Management, Hemodialysis Supervision &amp; Glomerular Disorders.',
      philosophy: 'Compassionate renal medicine focusing on preserving kidney function, proactive disease management, and patient quality of life.',
      timings: 'Tuesday, Thursday, Saturday (3:00 PM - 7:00 PM).'
    },
    'Dr. Deepa K. Adiga': {
      name: 'Dr. Deepa K. Adiga',
      role: 'Consultant ENT Surgeon (MBBS, MS ENT) &bull; 12+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=400&h=400&q=80',
      speciality: 'Otorhinolaryngology, Sinusitis &amp; Allergy Management, Micro-Ear Surgery, Hearing Assessment &amp; Tonsillitis Treatment.',
      philosophy: 'Gentle and precise ear, nose, and throat treatment integrating modern endoscopic diagnostic examination with patient-centric therapies.',
      timings: 'Monday to Friday (11:00 AM - 3:00 PM).'
    },
    'Dr. Sandeep K. Shenoy': {
      name: 'Dr. Sandeep K. Shenoy',
      role: 'Consultant Urologist &amp; Andrologist (MBBS, MS, MCh Urology) &bull; 15+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&h=400&q=80',
      speciality: 'Endourology, Kidney Stones Laser Removal, Prostate Health (BPH), Urinary Tract Infections &amp; Reconstructive Urology.',
      philosophy: 'Minimally invasive urological techniques ensuring optimal surgical outcomes, rapid recovery, and minimal patient discomfort.',
      timings: 'Monday, Wednesday, Saturday (2:00 PM - 6:00 PM).'
    },
    'Dr. Divya R. Prasad': {
      name: 'Dr. Divya R. Prasad',
      role: 'Consultant Eye Surgeon (MBBS, MS Ophthalmology, FICO) &bull; 11+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
      speciality: 'Comprehensive Ophthalmology, Cataract Evaluation, Glaucoma Screening, Diabetic Retinopathy Assessment &amp; Refractive Care.',
      philosophy: 'Dedicated to protecting and restoring visual health through thorough clinical examinations and evidence-based eye therapies.',
      timings: 'Monday to Saturday (9:00 AM - 1:00 PM).'
    },
    'Dr. Vinay S. Gowda': {
      name: 'Dr. Vinay S. Gowda',
      role: 'Consultant Medical Oncologist (MBBS, MD, DM Oncology) &bull; 13+ Years Experience',
      badge: 'Consulting Specialist (Demo Faculty)',
      img: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=400&h=400&q=80',
      speciality: 'Medical Oncology, Targeted Cancer Therapies, Chemotherapy Protocols, Cancer Screening &amp; Multidisciplinary Tumor Board Care.',
      philosophy: 'Empathetic, scientifically advanced cancer care prioritizing patient comfort, holistic nutritional support, and tailored treatment plans.',
      timings: 'Tuesday, Thursday, Friday (1:00 PM - 5:00 PM).'
    }
  };

  const profileButtons = document.querySelectorAll('.view-profile-btn');
  profileButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const docName = btn.getAttribute('data-doctor') || 'Dr. Laxme Gowda';
      const doc = doctorProfiles[docName] || doctorProfiles['Dr. Laxme Gowda'];

      openModal(
        `Doctor Profile: ${doc.name}`,
        `
        <div class="modal-doctor-banner">
          <div class="modal-doctor-avatar">
            <img src="${doc.img}" alt="${doc.name}" class="modal-doctor-img">
          </div>
          <div class="modal-doctor-heading">
            <h4 class="modal-doc-name">${doc.name}</h4>
            <span class="modal-doc-role">${doc.role}</span>
            <span class="modal-doc-badge">${doc.badge}</span>
          </div>
        </div>

        <h4>Speciality &amp; Scope of Care</h4>
        <p><strong>Clinical Focus:</strong> ${doc.speciality}</p>
        
        <h4>Clinical Practice Philosophy</h4>
        <p>${doc.philosophy}</p>

        <h4>Consultation Timings</h4>
        <p>${doc.timings}</p>
        `
      );
    });
  });

  // Speciality Details Data & Modal Triggers
  const specialityDetails = {
    'Cardiac Care': {
      title: 'Cardiac Care & Cardiovascular Medicine',
      badge: 'Flagship Department &bull; 24/7 Triage',
      img: 'assets/cardiac-care.jpg',
      scope: 'Comprehensive preventive, diagnostic, and emergency cardiology for adult heart diseases, hypertension, and coronary conditions.',
      conditions: 'Hypertension, Coronary Artery Disease, Angina / Chest Pain, Heart Failure, Arrhythmias, Dyslipidemia &amp; Post-Infarction Rehabilitation.',
      diagnostics: 'Digital 12-Lead ECG, 2D Echocardiography with Color Doppler, Cardiac Biomarkers (Troponin I), Ambulatory BP Monitoring, Treadmill Stress Testing.',
      doctors: 'Dr. Priya S. Sharma (MD, DM Cardiology &bull; 16+ Years Experience)'
    },
    'Orthopedics': {
      title: 'Orthopedics, Joint Care & Trauma Surgery',
      badge: 'Bone, Joint &amp; Spine Care',
      img: 'assets/orthopedics-joint-replacement.png',
      scope: 'Specialized management of musculoskeletal conditions, accidental trauma, fractures, arthritis, and back/spinal ailments.',
      conditions: 'Complex Fractures, Osteoarthritis, Degenerative Disc Disease, Joint Dislocations, Tendon Injuries &amp; Osteoporosis.',
      diagnostics: 'Digital High-Resolution X-Ray, Musculoskeletal Ultrasound, Multi-Slice CT Scanning, Joint Aspiration &amp; Fluid Analysis.',
      doctors: 'Dr. Anand R. Kulkarni (MS Orthopedics &bull; 15+ Years Experience)'
    },
    'Neurology': {
      title: 'Neurology & Brain Health Sciences',
      badge: 'Acute Stroke &amp; Epilepsy Center',
      img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&h=380&q=80',
      scope: 'Clinical diagnosis and therapeutic management of neurological, neuromuscular, cerebrovascular, and cognitive disorders.',
      conditions: 'Acute Ischemic Stroke, Chronic Migraine &amp; Cluster Headaches, Epilepsy &amp; Seizures, Peripheral Neuropathy, Parkinsonian Tremors.',
      diagnostics: 'High-Slice CT Neuroimaging, High-Field MRI, Digital Reflex Testing, Neurological Metabolic Panels.',
      doctors: 'Dr. Vikram M. Rao (MD, DM Neurology &bull; 14+ Years Experience)'
    },
    'General Medicine': {
      title: 'General Medicine & Internal Medicine',
      badge: 'Senior Faculty Leadership',
      img: 'assets/general-medicine.png',
      scope: 'Comprehensive primary adult care, acute fevers, multi-system disorders, diabetes control, and geriatric wellness.',
      conditions: 'Acute Infectious Fevers, Diabetes Mellitus (Type 1 &amp; 2), Hypertension, Respiratory Infections, Dyslipidemia &amp; Geriatric Multimorbidity.',
      diagnostics: 'Full Automated Haematology, Glycated Hemoglobin (HbA1c), Comprehensive Metabolic Panel, Stat Electrolytes &amp; ABG.',
      doctors: 'Dr. Laxme Gowda (Senior General Physician &bull; 45+ Years Leadership)'
    },
    'Paediatrics': {
      title: 'Paediatrics & Child Healthcare',
      badge: 'Infant, Child &amp; Adolescent Care',
      img: 'assets/paediatrics.png',
      scope: 'Dedicated paediatric and adolescent medicine, immunization schedules, newborn screening, and childhood illness intervention.',
      conditions: 'Paediatric Fevers, Childhood Asthma &amp; Bronchiolitis, Growth &amp; Milestone Delays, Neonatal Jaundice, Nutritional Deficiencies.',
      diagnostics: 'Paediatric Ultrasound, Bilirubin Assays, Digital Pediatric Growth Charting, Stool &amp; Urine Micro-Assays.',
      doctors: 'Dr. Sneha Hegde (MD Paediatrics &bull; 12+ Years Experience)'
    },
    'Maternity Care': {
      title: 'Maternity Care & Obstetrics / Gynaecology',
      badge: 'Mother &amp; Child Health',
      img: 'assets/maternity-obstetrics-gynaecology.png',
      scope: 'Evidence-based obstetric care, high-risk pregnancy monitoring, labour suites, and comprehensive women\'s health.',
      conditions: 'Antenatal Consultations, High-Risk Pregnancies, Gestational Diabetes, Pre-Eclampsia, PCOS/PCOD, Menstrual Health.',
      diagnostics: '4D Obstetric Sonography, Fetal Heart Doppler, Complete Maternal Antenatal Profiling, Pap Smear &amp; Pelvic Ultrasound.',
      doctors: 'Dr. Meera N. Iyer (MS OBG, DGO &bull; 18+ Years Experience)'
    },
    'Gastroenterology': {
      title: 'Gastroenterology & Digestive Health',
      badge: 'GI &amp; Hepatology',
      img: 'assets/gastroenterology-digestive-health.png',
      scope: 'Comprehensive clinical diagnosis of digestive tract, gastric, liver, gallbladder, and pancreatic disorders.',
      conditions: 'Acid Reflux (GERD), Peptic Ulcers, Irritable Bowel Syndrome (IBS), Fatty Liver Disease, Acute Pancreatitis, Jaundice.',
      diagnostics: 'High-Resolution Abdominal Ultrasound, Liver Function Assays, Viral Hepatitis Screening, Stool Occult Blood.',
      doctors: 'Dr. Rajeshwar Rao (Consultant Gastroenterologist)'
    },
    'Oncology': {
      title: 'Medical Oncology & Cancer Screening',
      badge: 'Screening &amp; Supportive Care',
      img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&h=380&q=80',
      scope: 'Preventive cancer screening, early symptom assessment, medical oncology coordination, and compassionate supportive therapy.',
      conditions: 'Early Tumor Screening, Breast &amp; Cervical Health Checks, Gastrointestinal Screening, Supportive Pain Management.',
      diagnostics: 'High-Slice CT Cross-Sectional Imaging, Tumor Marker Assays, Biopsy Histopathology Coordination, Digital Mammography.',
      doctors: 'Dr. Manjunath Swamy (Consultant Medical Oncologist)'
    },
    'Dermatology': {
      title: 'Dermatology & Skin Healthcare',
      badge: 'Clinical Dermatology',
      img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&h=380&q=80',
      scope: 'Diagnosis and medical management of dermatological diseases, allergies, chronic skin conditions, and hair disorders.',
      conditions: 'Psoriasis, Atopic Eczema, Severe Acne Vulgaris, Urticaria &amp; Skin Allergies, Fungal &amp; Bacterial Dermatitis, Alopecia.',
      diagnostics: 'Dermoscopy, Skin Biopsy &amp; Scraping Analysis, Woods Lamp Examination, Allergy Patch Testing.',
      doctors: 'Dr. Ananya Deshmukh (Consultant Dermatologist)'
    },
    'Psychiatry': {
      title: 'Psychiatry & Behavioral Health',
      badge: 'Confidential Mental Health',
      img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=600&h=380&q=80',
      scope: 'Confidential, empathetic clinical evaluation and psychological support for mood, anxiety, and behavioral health.',
      conditions: 'Depressive Illness, Generalized Anxiety &amp; Panic, Insomnia &amp; Sleep Cycle Disorders, Stress &amp; Somatoform Conditions.',
      diagnostics: 'Structured Psychometric Assessments, Sleep Profiling, Comprehensive Neuropsychiatric Review.',
      doctors: 'Dr. Kavitha Sundaram (Consultant Psychiatrist)'
    },
    'General Surgery': {
      title: 'General & Minimally Invasive Surgery',
      badge: 'Modular Surgical OT',
      img: 'assets/general-laparoscopic-surgery.png',
      scope: 'Elective and emergency surgical consultations for abdominal, soft-tissue, hernia, and acute operative conditions.',
      conditions: 'Inguinal &amp; Umbilical Hernias, Acute Appendicitis, Gallstone Disease, Wound Care &amp; Diabetic Ulcers, Hydrocele, Minor Surgeries.',
      diagnostics: 'Pre-Operative CT Imaging, Doppler Ultrasound, Pre-Anesthetic Fitness Workup, Sterile Modular OT Readiness.',
      doctors: 'Dr. Suresh Babu (Senior General &amp; Laparoscopic Surgeon)'
    },
    'Anaesthesiology': {
      title: 'Anaesthesiology & Critical Care Support',
      badge: 'Perioperative Safety',
      img: 'assets/anaesthesiology-critical-care.png',
      scope: 'Comprehensive perioperative monitoring, safe general &amp; regional anaesthesia administration, and acute post-op analgesia.',
      conditions: 'Surgical Pain Management, Acute Perioperative Monitoring, Difficult Airway Management, Critical Resuscitation.',
      diagnostics: 'Pre-Anesthetic Risk Evaluation, Invasive Arterial Monitoring, Capnography, Blood Gas Assays.',
      doctors: 'Dr. Sandeep Shenoy (Consultant Anaesthesiologist)'
    },
    'ENT': {
      title: 'Otorhinolaryngology & ENT Care',
      badge: 'Ear, Nose &amp; Throat Centre',
      img: 'assets/ent-care-otorhinolaryngology.png',
      scope: 'Specialized diagnosis and clinical treatment for ear infections, hearing loss, vertigo, chronic sinusitis, deviated nasal septum, and throat disorders.',
      conditions: 'Chronic Otitis Media, Ear Pain &amp; Discharge, Conductive &amp; Sensorineural Hearing Loss, Chronic Sinusitis, Deviated Nasal Septum (DNS), Tonsillitis, BPPV Vertigo.',
      diagnostics: 'Diagnostic Nasal Endoscopy (DNE), Video Otoscopy &amp; Microsuction, Pure Tone Audiometry Screening, Emergency ENT Triage.',
      doctors: 'Dr. Rekha Srinivas (Consultant ENT Surgeon &bull; MBBS, MS ENT, DNB)'
    },
    'Urology': {
      title: 'Urology & Genitourinary Surgery',
      badge: 'Surgical Specialty Centre',
      img: 'assets/urology-genitourinary-surgery.jpg',
      scope: 'Comprehensive diagnosis and evidence-based clinical management for kidney stones, prostate enlargement (BPH), urinary tract infections, and bladder health.',
      conditions: 'Kidney &amp; Ureteric Stones, Benign Prostatic Hyperplasia (BPH), Recurrent UTIs, Hematuria, Overactive Bladder, Male Genitourinary Disorders.',
      diagnostics: 'Urinary Stone Evaluation &amp; NCCT, Computerized Uroflowmetry, Serum PSA Testing, Emergency Renal Colic Intervention.',
      doctors: 'Dr. Chandrashekar B. (Senior Consultant Urologist &bull; MBBS, MS, MCh)'
    },
    'Nephrology': {
      title: 'Nephrology & Renal Medicine',
      badge: 'Renal Care Centre',
      img: 'assets/nephrology-renal-medicine.png',
      scope: 'Comprehensive clinical management for acute and chronic kidney disease, diabetic nephropathy, electrolyte imbalances, and hypertension-related renal care.',
      conditions: 'Chronic Kidney Disease (CKD), Diabetic Nephropathy, Acute Kidney Injury (AKI), Hypertensive Renal Disease, Electrolyte Imbalances, Nephritis.',
      diagnostics: 'Renal Function &amp; eGFR Profiling, Renal Doppler Ultrasonography, Diabetic Kidney Protection Protocol, Medical ICU Renal Support.',
      doctors: 'Dr. Harish Kumar N. (Consultant Nephrologist &bull; MD, DM Nephrology)'
    },
    'Pulmonology': {
      title: 'Pulmonology & Chest Medicine',
      badge: 'Respiratory Care Centre',
      img: 'assets/pulmonology-chest-medicine.png',
      scope: 'Advanced diagnosis and clinical treatment for chronic bronchial asthma, COPD, pneumonia, sleep apnea, and persistent cough disorders.',
      conditions: 'Bronchial Asthma, COPD &amp; Chronic Bronchitis, Pneumonia &amp; Lung Infections, Allergic Rhinitis, Sleep Apnea, Post-Infection Fibrosis.',
      diagnostics: 'Spirometry &amp; Pulmonary Function Tests (PFT), Emergency Nebulization Suites, Low-Dose Chest HRCT, Non-Invasive ICU Ventilation.',
      doctors: 'Dr. Ramesh Narayan (Consultant Pulmonologist &bull; MBBS, MD Pulmonary Medicine)'
    }
  };

  const specialityTriggers = document.querySelectorAll('.view-speciality-details-btn');
  specialityTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const specKey = btn.getAttribute('data-speciality');
      const spec = specialityDetails[specKey];
      if (!spec) return;

      openModal(
        spec.title,
        `
        <div class="doctor-modal-profile">
          <div class="doctor-modal-photo-wrap">
            <img src="${spec.img}" alt="${spec.title}" class="doctor-modal-photo">
          </div>
          <div>
            <span class="doctor-modal-badge">${spec.badge}</span>
            <h3 class="doctor-modal-name">${spec.title}</h3>
            <p class="doctor-modal-role">${spec.scope}</p>
          </div>
        </div>

        <h4>Conditions Diagnosed &amp; Treated</h4>
        <p>${spec.conditions}</p>

        <h4>Diagnostic &amp; Clinical Facilities</h4>
        <p>${spec.diagnostics}</p>

        <h4>Lead Specialists &amp; Consultants</h4>
        <p><strong>${spec.doctors}</strong></p>

        <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="#enquiry" class="btn btn-primary btn-sm speciality-modal-book-btn" data-dept="${specKey}">
            <i data-lucide="calendar" class="icon-xs"></i> Book Appointment in this Department
          </a>
          <a href="tel:+918212345678" class="btn btn-outline btn-sm">
            <i data-lucide="phone" class="icon-xs"></i> Call Reception
          </a>
        </div>
        `
      );

      // Handle the booking button inside modal
      setTimeout(() => {
        const bookBtn = document.querySelector('.speciality-modal-book-btn');
        bookBtn?.addEventListener('click', () => {
          closeModal();
          const dept = bookBtn.getAttribute('data-dept');
          const specialitySelect = document.getElementById('preferredSpeciality');
          if (specialitySelect && dept) {
            for (let i = 0; i < specialitySelect.options.length; i++) {
              if (specialitySelect.options[i].value === dept || specialitySelect.options[i].text.includes(dept)) {
                specialitySelect.selectedIndex = i;
                break;
              }
            }
          }
          const enquirySection = document.getElementById('enquiry');
          if (enquirySection) {
            enquirySection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }, 50);
    });
  });
}

/**
 * 11. Facilities Ambient Video Controller
 * Handles video playback, play/pause toggle button, and respects reduced motion
 */
function initFacilityVideoController() {
  const video = document.getElementById('facilityHeroVideo');
  const toggleBtn = document.getElementById('facilityVideoToggle');
  if (!video || !toggleBtn) return;

  const btnIcon = toggleBtn.querySelector('.video-btn-icon');
  const btnText = toggleBtn.querySelector('.video-btn-text');

  // Check prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    video.pause();
    updateButtonState(false);
  }

  function updateButtonState(isPlaying) {
    if (isPlaying) {
      if (btnText) btnText.textContent = 'Pause Video';
      toggleBtn.setAttribute('aria-label', 'Pause background ambient video');
      toggleBtn.setAttribute('title', 'Pause ambient video');
      if (btnIcon) {
        btnIcon.setAttribute('data-lucide', 'pause');
      }
    } else {
      if (btnText) btnText.textContent = 'Play Video';
      toggleBtn.setAttribute('aria-label', 'Play background ambient video');
      toggleBtn.setAttribute('title', 'Play ambient video');
      if (btnIcon) {
        btnIcon.setAttribute('data-lucide', 'play');
      }
    }
    initLucideIcons();
  }

  toggleBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play().then(() => {
        updateButtonState(true);
      }).catch(err => {
        console.warn('Video playback notice:', err);
      });
    } else {
      video.pause();
      updateButtonState(false);
    }
  });

  // Listen for reduced motion preference changes
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) {
      video.pause();
      updateButtonState(false);
    }
  });
}

/**
 * 11. Doctors Directory Page Live Search & Filter System
 */
function initDoctorsPageFilters() {
  const searchInput = document.getElementById('doctorSearchInput');
  const searchClearBtn = document.getElementById('doctorSearchClear');
  const specialitySelect = document.getElementById('doctorSpecialitySelect');
  const filterChips = document.querySelectorAll('.doctor-chip[data-filter]');
  const countBadge = document.getElementById('doctorsCountBadge');
  const clearFiltersBtn = document.getElementById('clearDoctorFiltersBtn');
  const emptyState = document.getElementById('noDoctorsFound');
  const resetFiltersBtn = document.getElementById('resetDoctorFiltersBtn');
  const doctorCards = document.querySelectorAll('.doctor-dir-card');

  if (!doctorCards.length) return; // Not on the doctors directory page

  let activeSpeciality = 'all';
  let searchQuery = '';

  const applyFilters = () => {
    let visibleCount = 0;
    const q = searchQuery.toLowerCase().trim();

    doctorCards.forEach(card => {
      const cardName = (card.getAttribute('data-doctor-name') || '').toLowerCase();
      const cardSpec = (card.getAttribute('data-speciality') || '').toLowerCase();
      const cardBio = (card.textContent || '').toLowerCase();

      const matchesSpeciality = (activeSpeciality === 'all') || 
        cardSpec === activeSpeciality.toLowerCase() ||
        cardSpec.includes(activeSpeciality.toLowerCase());

      const matchesSearch = !q || cardName.includes(q) || cardSpec.includes(q) || cardBio.includes(q);

      if (matchesSpeciality && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update count badge
    if (countBadge) {
      countBadge.textContent = `Showing ${visibleCount} of ${doctorCards.length} Specialists`;
    }

    // Toggle empty state
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.add('is-visible');
        const emptyQueryText = document.getElementById('emptySearchQueryText');
        if (emptyQueryText) {
          emptyQueryText.textContent = searchQuery ? `"${searchQuery}"` : activeSpeciality;
        }
      } else {
        emptyState.classList.remove('is-visible');
      }
    }

    // Toggle clear filters button visibility
    if (clearFiltersBtn) {
      if (activeSpeciality !== 'all' || searchQuery.length > 0) {
        clearFiltersBtn.style.display = 'inline-flex';
      } else {
        clearFiltersBtn.style.display = 'none';
      }
    }

    // Toggle search clear 'x' button
    if (searchClearBtn) {
      if (searchQuery.length > 0) {
        searchClearBtn.classList.add('is-visible');
      } else {
        searchClearBtn.classList.remove('is-visible');
      }
    }
  };

  // Search input event
  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    applyFilters();
  });

  // Search clear button
  searchClearBtn?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      searchQuery = '';
      searchInput.focus();
      applyFilters();
    }
  });

  // Select dropdown event
  specialitySelect?.addEventListener('change', (e) => {
    activeSpeciality = e.target.value;
    // Sync chips
    filterChips.forEach(chip => {
      if (chip.getAttribute('data-filter') === activeSpeciality) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
    applyFilters();
  });

  // Filter chips click
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.getAttribute('data-filter') || 'all';
      activeSpeciality = filter;

      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      if (specialitySelect) {
        specialitySelect.value = filter;
      }

      applyFilters();
    });
  });

  // Reset/Clear buttons
  const resetAll = () => {
    activeSpeciality = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    if (specialitySelect) specialitySelect.value = 'all';
    filterChips.forEach(chip => {
      if (chip.getAttribute('data-filter') === 'all') {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
    applyFilters();
  };

  clearFiltersBtn?.addEventListener('click', resetAll);
  resetFiltersBtn?.addEventListener('click', resetAll);
}

/**
 * Basic HTML escaping helper
 */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 13. Doctors Editorial Showcase Carousel Controller
 */
function initDoctorsCarousel() {
  const track = document.getElementById('doctorsCarouselTrack');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  if (!track) return;

  const getScrollStep = () => {
    const firstCard = track.querySelector('.editorial-doc-card');
    return firstCard ? firstCard.offsetWidth + 20 : 300;
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });
  }

  // Spotlight active card toggle on hover
  const cards = track.querySelectorAll('.editorial-doc-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      cards.forEach(c => c.classList.remove('is-active-spotlight'));
      card.classList.add('is-active-spotlight');
    });
  });
}

/**
 * 14. Clinical Specialties Journey Showcase Controller
 * Handles interactive clicks on the 4 journey cards, filtering and highlighting the matching doctors
 */
function initClinicalJourneyShowcase() {
  const journeyCards = document.querySelectorAll('.journey-card');
  const specialitySelect = document.getElementById('doctorSpecialitySelect');
  const filterChips = document.querySelectorAll('.doctor-chip');
  const dirSection = document.querySelector('.doctors-directory-section');

  journeyCards.forEach(card => {
    const activateDepartment = () => {
      const targetSpeciality = card.getAttribute('data-speciality-target');
      if (!targetSpeciality) return;

      // Update select dropdown
      if (specialitySelect) {
        specialitySelect.value = targetSpeciality;
        specialitySelect.dispatchEvent(new Event('change'));
      }

      // Update filter chips
      filterChips.forEach(chip => {
        if (chip.getAttribute('data-filter') === targetSpeciality) {
          chip.click();
        }
      });

      // Add pulse animation to matching doctor cards
      setTimeout(() => {
        const matchingCards = document.querySelectorAll(`.doctor-dir-card[data-speciality="${targetSpeciality}"]`);
        matchingCards.forEach(mc => {
          mc.classList.add('highlight-pulse');
          setTimeout(() => mc.classList.remove('highlight-pulse'), 3600);
        });
      }, 500);
    };

    card.addEventListener('click', activateDepartment);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateDepartment();
      }
    });
  });
}

/**
 * 15. Doctor Cards Hover Controller (Smooth CSS transitions handle elevation without JS layout shifts)
 */
function initDoctorCards3DTilt() {
  // Pure CSS transitions handle the clean 4-6px lift smoothly without mousemove jitter or layout shifts
}

/**
 * 16. Animated Medical Specialties Cinema Showcase Controller
 * Smooth auto-advancing slideshow with crossfades, progress bar, play/pause controls,
 * swipe gestures, keyboard navigation, and prefers-reduced-motion support.
 */
function initSpecialityCinema() {
  const cinemaContainer = document.getElementById('specialityCinema');
  if (!cinemaContainer) return;

  const slides = cinemaContainer.querySelectorAll('.cinema-slide');
  const dots = cinemaContainer.querySelectorAll('.cinema-dot');
  const playPauseBtn = document.getElementById('cinemaPlayPauseBtn');
  const prevBtn = document.getElementById('cinemaPrevBtn');
  const nextBtn = document.getElementById('cinemaNextBtn');
  const progressFill = document.getElementById('cinemaProgressFill');

  if (!slides.length) return;

  let currentIndex = 0;
  let isPlaying = true;
  let timer = null;
  const slideDuration = 5500; // 5.5 seconds per specialty

  // Accessibility: Respect reduced motion preference
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) {
    isPlaying = false;
  }

  const updateProgressAnimation = (start = true) => {
    if (!progressFill) return;
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    if (start && isPlaying) {
      // Force repaint
      void progressFill.offsetWidth;
      progressFill.style.transition = `width ${slideDuration}ms linear`;
      progressFill.style.width = '100%';
    }
  };

  const goToSlide = (newIndex) => {
    slides[currentIndex].classList.remove('active');
    slides[currentIndex].setAttribute('aria-hidden', 'true');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.remove('active');
      dots[currentIndex].setAttribute('aria-selected', 'false');
    }

    currentIndex = (newIndex + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    slides[currentIndex].setAttribute('aria-hidden', 'false');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
      dots[currentIndex].setAttribute('aria-selected', 'true');
    }

    updateProgressAnimation(true);
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  const startAutoplay = () => {
    if (isReducedMotion) return;
    stopAutoplay();
    isPlaying = true;
    updateProgressAnimation(true);
    timer = setInterval(nextSlide, slideDuration);
    if (playPauseBtn) {
      playPauseBtn.innerHTML = '<i data-lucide="pause" class="icon-xs"></i>';
      playPauseBtn.setAttribute('aria-label', 'Pause slideshow');
      initLucideIcons();
    }
  };

  const stopAutoplay = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    isPlaying = false;
    if (progressFill) {
      const computedWidth = window.getComputedStyle(progressFill).width;
      progressFill.style.transition = 'none';
      progressFill.style.width = computedWidth;
    }
    if (playPauseBtn) {
      playPauseBtn.innerHTML = '<i data-lucide="play" class="icon-xs"></i>';
      playPauseBtn.setAttribute('aria-label', 'Play slideshow');
      initLucideIcons();
    }
  };

  // Play/Pause button toggle
  playPauseBtn?.addEventListener('click', () => {
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Prev / Next controls
  prevBtn?.addEventListener('click', () => {
    prevSlide();
    if (isPlaying) startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    if (isPlaying) startAutoplay();
  });

  // Dot button clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIdx = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(targetIdx) && targetIdx !== currentIndex) {
        goToSlide(targetIdx);
        if (isPlaying) startAutoplay();
      }
    });
  });

  // Pause on hover, resume on mouse leave (if was playing)
  let resumeOnLeave = false;
  cinemaContainer.addEventListener('mouseenter', () => {
    if (isPlaying) {
      resumeOnLeave = true;
      stopAutoplay();
    }
  });

  cinemaContainer.addEventListener('mouseleave', () => {
    if (resumeOnLeave) {
      resumeOnLeave = false;
      startAutoplay();
    }
  });

  // Keyboard navigation
  cinemaContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      if (isPlaying) startAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      if (isPlaying) startAutoplay();
    }
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  cinemaContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  cinemaContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      if (isPlaying) startAutoplay();
    }
  }, { passive: true });

  // Initial autoplay start
  if (!isReducedMotion) {
    startAutoplay();
  }
}

/**
 * 17. Campus Gallery Modal Controller
 * Connects hero "Watch Tour" button to an interactive high-resolution gallery modal with thumbnails
 */
function initCampusTourModal() {
  const tourModal = document.getElementById('tourModal');
  const heroTourBtn = document.getElementById('heroTourPlayBtn');
  const closeBtn = document.getElementById('tourModalCloseBtn');
  const doneBtn = document.getElementById('tourModalDoneBtn');
  const bookBtn = document.getElementById('tourBookBtn');
  const tourImg = document.getElementById('tourModalImg');
  const captionTitle = document.getElementById('tourModalCaptionTitle');
  const captionDesc = document.getElementById('tourModalCaptionDesc');
  const thumbs = document.querySelectorAll('.tour-thumb-btn');

  if (!tourModal) return;

  const openTourModal = () => {
    tourModal.classList.add('is-open');
    tourModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    initLucideIcons();
  };

  const closeTourModal = () => {
    tourModal.classList.remove('is-open');
    tourModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (heroTourBtn) {
    heroTourBtn.addEventListener('click', openTourModal);
  }
  closeBtn?.addEventListener('click', closeTourModal);
  doneBtn?.addEventListener('click', closeTourModal);

  // Close when clicking backdrop
  tourModal.addEventListener('click', (e) => {
    if (e.target === tourModal) {
      closeTourModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tourModal.classList.contains('is-open')) {
      closeTourModal();
    }
  });

  // Switch image on thumbnail click
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const src = thumb.getAttribute('data-src');
      const title = thumb.getAttribute('data-title');
      const desc = thumb.getAttribute('data-desc');

      if (tourImg && src) {
        tourImg.style.opacity = '0.4';
        tourImg.src = src;
        setTimeout(() => {
          tourImg.style.opacity = '1';
        }, 120);
      }
      if (captionTitle && title) captionTitle.textContent = title;
      if (captionDesc && desc) captionDesc.textContent = desc;
    });
  });

  // Connect .gallery-item cards to open tour modal preview
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    const handleGalleryOpen = () => {
      const img = item.querySelector('.gallery-img');
      const caption = item.querySelector('.gallery-caption');
      const subcaption = item.querySelector('.gallery-subcaption');

      if (img && tourImg) {
        tourImg.style.opacity = '0.4';
        tourImg.src = img.src;
        tourImg.alt = img.alt || 'Sulakshaa Hospital Facility';
        setTimeout(() => {
          tourImg.style.opacity = '1';
        }, 120);
      }
      if (captionTitle && caption) {
        captionTitle.textContent = caption.textContent;
      }
      if (captionDesc && subcaption) {
        captionDesc.textContent = subcaption.textContent;
      }

      // Sync active state on thumbnails
      thumbs.forEach(thumb => {
        const thumbSrc = thumb.getAttribute('data-src');
        if (img && (thumbSrc === img.getAttribute('src') || img.src.includes(thumbSrc))) {
          thumb.classList.add('active');
        } else {
          thumb.classList.remove('active');
        }
      });

      openTourModal();
    };

    item.addEventListener('click', handleGalleryOpen);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleGalleryOpen();
      }
    });
  });

  // Book Consultation inside tour modal
  bookBtn?.addEventListener('click', () => {
    closeTourModal();
    const enquiry = document.getElementById('enquiry');
    if (enquiry) {
      enquiry.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/**
 * 18. Patient Care Circular-Orbit Card Carousel Controller
 * Handles continuous orbit pause/resume controls, keyboard accessibility,
 * and mobile swipe pagination sync.
 */
function initPatientCareOrbit() {
  const orbitStage = document.getElementById('patientCareOrbitStage');
  const playPauseBtn = document.getElementById('orbitPlayPauseBtn');
  const playPauseIcon = document.getElementById('orbitPlayPauseIcon');
  const playPauseText = document.getElementById('orbitPlayPauseText');
  const orbitTrack = document.getElementById('patientCareOrbitTrack');
  const mobileDots = document.querySelectorAll('.orbit-mob-dot');
  const cards = orbitStage ? orbitStage.querySelectorAll('.care-pillar-card') : [];

  if (!orbitStage) return;

  let isPaused = false;

  const updatePlayPauseUI = (paused) => {
    isPaused = paused;
    if (paused) {
      orbitStage.classList.add('is-paused');
      if (playPauseBtn) {
        playPauseBtn.setAttribute('aria-label', 'Resume circular orbit animation');
      }
      if (playPauseIcon) {
        playPauseIcon.innerHTML = '<i data-lucide="play" class="icon-xs"></i>';
      }
      if (playPauseText) {
        playPauseText.textContent = 'Orbit Paused (Click to resume)';
      }
    } else {
      orbitStage.classList.remove('is-paused');
      if (playPauseBtn) {
        playPauseBtn.setAttribute('aria-label', 'Pause circular orbit animation');
      }
      if (playPauseIcon) {
        playPauseIcon.innerHTML = '<i data-lucide="pause" class="icon-xs"></i>';
      }
      if (playPauseText) {
        playPauseText.textContent = 'Continuous Orbit (Hover any card to pause)';
      }
    }
    initLucideIcons();
  };

  playPauseBtn?.addEventListener('click', () => {
    updatePlayPauseUI(!isPaused);
  });

  // Keyboard accessibility: pause when card focused, resume on blur
  cards.forEach(card => {
    card.addEventListener('focus', () => {
      orbitStage.classList.add('is-paused');
    });
    card.addEventListener('blur', () => {
      if (!isPaused) {
        orbitStage.classList.remove('is-paused');
      }
    });
  });

  // Mobile Swipe Dots Sync (when in swipeable slider mode)
  if (orbitTrack && mobileDots.length > 0) {
    let scrollTimeout;
    orbitTrack.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const trackLeft = orbitTrack.scrollLeft;
        const cardWidth = orbitTrack.firstElementChild ? orbitTrack.firstElementChild.offsetWidth : 280;
        const activeIdx = Math.round(trackLeft / cardWidth);

        mobileDots.forEach((dot, idx) => {
          if (idx === activeIdx) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }, 60);
    }, { passive: true });

    // Click dot to scroll to card on mobile
    mobileDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
        const cardSlot = orbitTrack.children[targetIdx];
        if (cardSlot) {
          cardSlot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    });
  }
}

/**
 * 19. Leading Specialists Responsive Grid Controller
 * Converted to a clean responsive grid allowing manual vertical scrolling.
 */
function initDoctorsMarquee() {
  // Static responsive grid with manual scrolling enabled; automatic marquee animation disabled.
}

/**
 * 20. Specialities Grid Expand / Collapse Controller
 * Displays 6 cards initially, toggles remaining cards on click with smooth scroll/reveal
 */
function initSpecialitiesToggle() {
  const toggleBtn = document.getElementById('toggleSpecialitiesBtn');
  const grid = document.getElementById('specialitiesGrid');
  if (!toggleBtn || !grid) return;

  const btnText = toggleBtn.querySelector('.btn-toggle-text');

  toggleBtn.addEventListener('click', () => {
    const isExpanded = grid.classList.toggle('is-expanded');
    toggleBtn.classList.toggle('is-expanded', isExpanded);
    toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

    if (btnText) {
      btnText.textContent = isExpanded ? 'View Less Specialities' : 'View More Specialities';
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // When collapsing, smoothly scroll to top of specialities if past it
    if (!isExpanded) {
      const specialitiesSection = document.getElementById('specialities');
      if (specialitiesSection) {
        const rect = specialitiesSection.getBoundingClientRect();
        if (rect.top < -50) {
          specialitiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  });
}

/**
 * 21. Hero Facilities Image Crossfade Slideshow
 * Smoothly transitions between authentic Sulakshaa Hospital images (Exterior, Reception, OPD Lounge)
 * Features auto-advance, interactive dot navigation, and hover pause.
 */
function initHeroSlideshow() {
  const container = document.getElementById('heroSlideshow');
  if (!container) return;

  const slides = container.querySelectorAll('.hero-slide');
  const dots = container.querySelectorAll('.hero-dot');
  const prevBtn = container.querySelector('.hero-prev-btn');
  const nextBtn = container.querySelector('.hero-next-btn');
  if (slides.length <= 1) return;

  let currentIndex = 0;
  let intervalId = null;
  const slideDuration = 4500; // 4.5 seconds per slide for gentle, comfortable pace

  function showSlide(index) {
    if (index === currentIndex) return;

    slides.forEach((slide, i) => {
      const isActive = i === index;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    dots.forEach((dot, i) => {
      const isActive = i === index;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAutoplay() {
    stopAutoplay();
    intervalId = setInterval(nextSlide, slideDuration);
  }

  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Interactive Arrow Clicks
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      startAutoplay();
    });
  }

  // Interactive Dot Clicks
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetIndex = parseInt(dot.getAttribute('data-slide-index') || dot.getAttribute('data-slide-to'), 10);
      if (!isNaN(targetIndex)) {
        showSlide(targetIndex);
        startAutoplay(); // Reset timer after manual selection
      }
    });
  });

  // Keyboard navigation when slideshow is focused
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    }
  });

  // Pause when hovering over the slideshow container
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);
  container.addEventListener('touchstart', stopAutoplay, { passive: true });
  container.addEventListener('touchend', () => {
    setTimeout(startAutoplay, 2500);
  }, { passive: true });

  // Start initial autoplay
  startAutoplay();
}

/**
 * 22. Facilities View All / Show Less Toggle Controller
 */
function initFacilitiesViewAllToggle() {
  const toggleBtn = document.getElementById('viewAllFacilitiesBtn');
  if (!toggleBtn) return;

  const extraCards = document.querySelectorAll('.facility-card-extra');
  if (!extraCards.length) {
    toggleBtn.style.display = 'none';
    return;
  }

  let isExpanded = false;

  toggleBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    toggleBtn.classList.toggle('is-active', isExpanded);

    const btnText = toggleBtn.querySelector('.btn-text');
    const btnIcon = toggleBtn.querySelector('.btn-icon');

    extraCards.forEach(card => {
      card.classList.toggle('is-expanded', isExpanded);
      card.classList.toggle('is-revealed', isExpanded);
    });

    if (btnText) {
      btnText.textContent = isExpanded ? 'Show Less' : 'View All Facilities';
    }

    if (btnIcon) {
      btnIcon.setAttribute('data-lucide', isExpanded ? 'chevron-up' : 'chevron-down');
    }

    if (window.lucide) {
      lucide.createIcons();
    }

    // If collapsing, smoothly scroll back to facilities top
    if (!isExpanded) {
      const facilitiesSection = document.getElementById('facilities');
      if (facilitiesSection) {
        facilitiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

/**
 * 23. Featured Leading Specialists Continuous Right-to-Left Moving Cards Controller
 */
function initFeaturedDoctorsSwipe() {
  const viewport = document.getElementById('doctorsMarqueeViewport');
  const group1 = document.getElementById('doctorsMarqueeGroup1');
  const group2 = document.getElementById('doctorsMarqueeGroup2');
  const container = document.getElementById('doctorsMarqueeContainer');
  const prevBtn = document.getElementById('docSwipePrevBtn');
  const nextBtn = document.getElementById('docSwipeNextBtn');
  if (!viewport || !group1) return;

  if (group2) {
    group2.style.display = 'flex';
  }

  let currentScroll = viewport.scrollLeft || 0;
  let isPaused = false;
  let resumeTimer = null;
  const speed = 0.85; // smooth subpixel movement right-to-left (~50px/sec)

  function getCardWidth() {
    const card = viewport.querySelector('.featured-doctor-card');
    return card ? (card.getBoundingClientRect().width + 20) : 320;
  }

  function tick() {
    if (!isPaused) {
      currentScroll += speed;
      const groupWidth = group1.scrollWidth + 20; // width + gap
      if (groupWidth > 0 && currentScroll >= groupWidth) {
        currentScroll -= groupWidth;
      }
      viewport.scrollLeft = currentScroll;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Pause on hover
  if (container) {
    container.addEventListener('mouseenter', () => {
      isPaused = true;
      clearTimeout(resumeTimer);
    });
    container.addEventListener('mouseleave', () => {
      currentScroll = viewport.scrollLeft;
      isPaused = false;
    });

    // Pause on touch for mobile interaction
    container.addEventListener('touchstart', () => {
      isPaused = true;
      clearTimeout(resumeTimer);
    }, { passive: true });

    container.addEventListener('touchend', () => {
      resumeTimer = setTimeout(() => {
        currentScroll = viewport.scrollLeft;
        isPaused = false;
      }, 1500);
    }, { passive: true });
  }

  // Smooth button navigation
  function manualScroll(direction) {
    isPaused = true;
    clearTimeout(resumeTimer);
    const step = getCardWidth();
    currentScroll += direction * step;
    viewport.scrollTo({
      left: currentScroll,
      behavior: 'smooth'
    });
    resumeTimer = setTimeout(() => {
      currentScroll = viewport.scrollLeft;
      isPaused = false;
    }, 2500);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      manualScroll(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      manualScroll(1);
    });
  }

  // Reset scroll position on page visibility change to avoid large jumps
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isPaused = true;
    } else {
      currentScroll = viewport.scrollLeft;
      isPaused = false;
    }
  });
}

/**
 * 24. Our Departments & Centres of Excellence Horizontal Scroll Controller
 */
function initDepartmentsCarousel() {
  const viewport = document.getElementById('departmentsCarouselViewport');
  const prevBtn = document.getElementById('deptScrollPrevBtn');
  const nextBtn = document.getElementById('deptScrollNextBtn');
  if (!viewport || !prevBtn || !nextBtn) return;

  function getScrollAmount() {
    const item = viewport.querySelector('.speciality-card');
    if (item) {
      return item.getBoundingClientRect().width + 24;
    }
    return 340;
  }

  function updateArrowState() {
    const tolerance = 6;
    const isAtStart = viewport.scrollLeft <= tolerance;
    const isAtEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - tolerance;

    prevBtn.disabled = isAtStart;
    prevBtn.classList.toggle('is-disabled', isAtStart);

    nextBtn.disabled = isAtEnd;
    nextBtn.classList.toggle('is-disabled', isAtEnd);
  }

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    viewport.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    setTimeout(updateArrowState, 350);
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    viewport.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    setTimeout(updateArrowState, 350);
  });

  viewport.addEventListener('scroll', updateArrowState, { passive: true });
  window.addEventListener('resize', updateArrowState);

  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      viewport.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      viewport.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
  });

  setTimeout(updateArrowState, 150);
  initDepartmentCardClicks();
}

/**
 * 25. Department Card Navigation Controller
 * Makes each department card clickable to open department-details.html?dept=<slug>
 * while preserving inner button behaviors (Book Appointment & Scope)
 */
function initDepartmentCardClicks() {
  const cards = document.querySelectorAll('.departments-carousel-track .speciality-card, #specialitiesGrid .speciality-card, .dept-item');
  cards.forEach(card => {
    const slug = card.getAttribute('data-dept-slug') || 'cardiac-care';
    card.style.cursor = 'pointer';

    card.addEventListener('click', (e) => {
      // If user clicked directly on an anchor or button inside, allow its natural click
      if (e.target.closest('a, button')) return;
      window.location.href = `department-details.html?dept=${slug}`;
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('a, button')) return;
        e.preventDefault();
        window.location.href = `department-details.html?dept=${slug}`;
      }
    });

    const knowMoreBtn = card.querySelector('.speciality-know-more-btn');
    if (knowMoreBtn) {
      knowMoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = `department-details.html?dept=${slug}`;
      });
    }
  });
}



/**
 * 26. Patient Testimonials Horizontal Carousel Controller
 * Continuous right-to-left auto-scrolling with pause on hover/touch,
 * seamless infinite loop, manual controls, and single-card mobile layout.
 */
function initTestimonialsCarousel() {
  const container = document.querySelector('.testimonials-carousel-container');
  const viewport = document.getElementById('testimonialsCarouselViewport');
  const track = document.getElementById('testimonialsCarouselTrack');
  const prevBtn = document.getElementById('testimonialScrollPrevBtn');
  const nextBtn = document.getElementById('testimonialScrollNextBtn');
  if (!viewport || !track) return;

  // Clone existing cards once to create an infinite seamless loop
  const originalCards = Array.from(track.children);
  if (!originalCards.length) return;

  originalCards.forEach((card, idx) => {
    card.setAttribute('data-original-index', idx);
  });

  // Duplicate cards for seamless infinite scroll
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add('is-clone');
    const focusable = clone.querySelectorAll('button, a, [tabindex]');
    focusable.forEach(el => el.setAttribute('tabindex', '-1'));
    track.appendChild(clone);
  });

  let singleSetWidth = 0;
  function calculateSetWidth() {
    singleSetWidth = track.scrollWidth / 2;
  }
  calculateSetWidth();
  window.addEventListener('resize', calculateSetWidth);

  let isPaused = false;
  let resumeTimeout = null;
  const speed = 0.65; // pixels per frame for a smooth, readable continuous flow

  function step() {
    if (!isPaused && singleSetWidth > 0) {
      viewport.scrollLeft += speed;
      // Seamless reset: when first set completes, loop back by subtracting singleSetWidth
      if (viewport.scrollLeft >= singleSetWidth) {
        viewport.scrollLeft -= singleSetWidth;
      }
    }
    requestAnimationFrame(step);
  }

  // Start continuous right-to-left movement
  requestAnimationFrame(step);

  function pauseAutoScroll(tempDuration = 0) {
    isPaused = true;
    if (resumeTimeout) clearTimeout(resumeTimeout);
    if (tempDuration > 0) {
      resumeTimeout = setTimeout(() => {
        isPaused = false;
      }, tempDuration);
    }
  }

  function resumeAutoScroll() {
    if (resumeTimeout) clearTimeout(resumeTimeout);
    isPaused = false;
  }

  // Pause on hover over container or viewport
  const hoverTarget = container || viewport;
  hoverTarget.addEventListener('mouseenter', () => pauseAutoScroll(0));
  hoverTarget.addEventListener('mouseleave', () => resumeAutoScroll());

  // Pause on touch interactions and focus
  viewport.addEventListener('touchstart', () => pauseAutoScroll(0), { passive: true });
  viewport.addEventListener('touchend', () => pauseAutoScroll(2500), { passive: true });
  viewport.addEventListener('focusin', () => pauseAutoScroll(0));
  viewport.addEventListener('focusout', () => resumeAutoScroll());

  function getScrollAmount() {
    const card = viewport.querySelector('.testimonial-card');
    if (card) {
      const cardWidth = card.getBoundingClientRect().width;
      const computedGap = parseFloat(window.getComputedStyle(track).gap) || 24;
      return cardWidth + computedGap;
    }
    return 374;
  }

  // Manual Previous Button
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      pauseAutoScroll(3500);
      const amount = getScrollAmount();
      if (viewport.scrollLeft < amount) {
        viewport.scrollLeft += singleSetWidth;
      }
      viewport.scrollBy({ left: -amount, behavior: 'smooth' });
    });
  }

  // Manual Next Button
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      pauseAutoScroll(3500);
      const amount = getScrollAmount();
      if (viewport.scrollLeft + amount >= singleSetWidth * 2 - viewport.clientWidth) {
        viewport.scrollLeft -= singleSetWidth;
      }
      viewport.scrollBy({ left: amount, behavior: 'smooth' });
    });
  }

  // Keyboard navigation when focused
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (prevBtn) prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (nextBtn) nextBtn.click();
    }
  });

  // Delegated Read More / Read Less toggles on review cards
  track.addEventListener('click', (e) => {
    const btn = e.target.closest('.testimonial-read-more-btn');
    if (!btn) return;
    e.preventDefault();
    const wrap = btn.closest('.testimonial-quote-wrap');
    if (!wrap) return;
    const quote = wrap.querySelector('.testimonial-quote');
    if (!quote) return;

    const isCurrentlyClamped = quote.classList.contains('is-clamped');
    if (isCurrentlyClamped) {
      quote.classList.remove('is-clamped');
      quote.classList.add('is-expanded');
      btn.textContent = 'Read Less';
      btn.setAttribute('aria-expanded', 'true');
    } else {
      quote.classList.remove('is-expanded');
      quote.classList.add('is-clamped');
      btn.textContent = 'Read More';
      btn.setAttribute('aria-expanded', 'false');
    }
    setTimeout(calculateSetWidth, 120);
  });

  // Re-run icons for cloned elements if needed
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // Pause when tab is inactive to prevent scroll drift
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isPaused = true;
    } else {
      isPaused = false;
      calculateSetWidth();
    }
  });
}

/**
 * 25. Health Insights & Hospital Updates View All Toggle Controller
 */
function initBlogViewAll() {
  const btn = document.getElementById('blogViewAllBtn');
  const grid = document.getElementById('blogGrid');
  const textSpan = document.getElementById('blogViewAllText');
  if (!btn || !grid) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const isExpanded = grid.classList.toggle('show-all');
    btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

    if (textSpan) {
      textSpan.textContent = isExpanded ? 'Show Less Insights' : 'View All Insights & Articles';
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }

    if (!isExpanded) {
      const blogSection = document.getElementById('blog');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}


