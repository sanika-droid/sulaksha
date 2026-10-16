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

  // 10. Informational Modals (Medical Disclaimer, Privacy, Terms, Doctor Profile)
  initInfoModals();
});

/**
 * 0. Sulakshaa Multi Speciality Hospital Splash Screen Controller
 * Handles initial visit check via sessionStorage, smooth entrance, loading bar, and cleanup
 */
function initSplashScreen() {
  const splash = document.getElementById('splashScreen');
  if (!splash) return;

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

  const SPLASH_DURATION = 2400; // 2.4 seconds

  const fadeTimer = setTimeout(() => {
    splash.classList.add('splash-fade-out');
    document.body.classList.remove('splash-active');

    const removeTimer = setTimeout(() => {
      if (splash.parentNode) {
        splash.parentNode.removeChild(splash);
      }
    }, 600);

    window.addEventListener('pagehide', () => clearTimeout(removeTimer), { once: true });
  }, SPLASH_DURATION);

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
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-btn');

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
          if (link.getAttribute('href') === `#${id}`) {
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
  const specialityButtons = document.querySelectorAll('.speciality-enquire-btn');
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

  // Doctor Enquiry click
  const doctorEnquireButtons = document.querySelectorAll('.doctor-enquire-btn');
  doctorEnquireButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const doctor = btn.getAttribute('data-doctor') || 'Dr. Laxme Gowda';
      const dept = btn.getAttribute('data-dept') || 'General Medicine';
      selectSpeciality(dept);
      
      if (patientMessageInput && !patientMessageInput.value) {
        patientMessageInput.value = `Enquiring for consultation with ${doctor} (${dept}).`;
      }

      if (window.SulakshaaForm && window.SulakshaaForm.goToStep) {
        window.SulakshaaForm.goToStep(1);
      }

      if (enquirySection) {
        enquirySection.scrollIntoView({ behavior: 'smooth' });
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

      if (window.SulakshaaForm && window.SulakshaaForm.goToStep) {
        window.SulakshaaForm.goToStep(1);
      }

      if (enquirySection) {
        enquirySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/**
 * Multi-Step Appointment Booking Form with Smooth Step Transitions & Animated Success
 */
function initMultiStepBookingForm() {
  const form = document.getElementById('appointmentEnquiryForm');
  const nameInput = document.getElementById('patientName');
  const phoneInput = document.getElementById('patientPhone');
  const specialitySelect = document.getElementById('preferredSpeciality');
  const dateInput = document.getElementById('preferredDate');
  const messageInput = document.getElementById('patientMessage');
  const consentCheckbox = document.getElementById('patientConsent');

  const step1 = document.getElementById('formStep1');
  const step2 = document.getElementById('formStep2');
  const step3 = document.getElementById('formStep3');
  const successView = document.getElementById('formSuccessView');
  const progressFill = document.getElementById('stepsProgressFill');
  const stepIndicators = document.querySelectorAll('.step-indicator');

  const step1NextBtn = document.getElementById('step1NextBtn');
  const step2PrevBtn = document.getElementById('step2PrevBtn');
  const step2NextBtn = document.getElementById('step2NextBtn');
  const step3PrevBtn = document.getElementById('step3PrevBtn');
  const submitBtn = document.getElementById('submitEnquiryBtn');
  const bookAnotherBtn = document.getElementById('bookAnotherBtn');

  const summarySpeciality = document.getElementById('summarySpeciality');
  const summaryDate = document.getElementById('summaryDate');
  const summaryName = document.getElementById('summaryName');
  const summaryPhone = document.getElementById('summaryPhone');

  const deptChips = document.querySelectorAll('.dept-chip');
  const datePillToday = document.getElementById('datePillToday');
  const datePillTomorrow = document.getElementById('datePillTomorrow');

  let currentStep = 1;

  if (!form) return;

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

  // Quick Department Chips
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

  // Phone input formatting (numbers only, max 10 digits)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
      clearFieldError('patientPhone');
    });
  }

  // Clear errors on input
  nameInput?.addEventListener('input', () => clearFieldError('patientName'));
  dateInput?.addEventListener('change', () => clearFieldError('preferredDate'));
  consentCheckbox?.addEventListener('change', () => clearFieldError('patientConsent'));

  // Multi-step navigation logic
  const goToStep = (stepNumber) => {
    currentStep = stepNumber;

    // Toggle container classes
    if (step1) step1.classList.toggle('active', stepNumber === 1);
    if (step2) step2.classList.toggle('active', stepNumber === 2);
    if (step3) step3.classList.toggle('active', stepNumber === 3);

    // Update progress fill
    if (progressFill) {
      if (stepNumber === 1) progressFill.style.width = '33.33%';
      else if (stepNumber === 2) progressFill.style.width = '66.66%';
      else if (stepNumber === 3) progressFill.style.width = '100%';
    }

    // Update step indicator states
    stepIndicators.forEach(ind => {
      const stepIdx = parseInt(ind.getAttribute('data-step-indicator'), 10);
      if (stepIdx === stepNumber) {
        ind.classList.add('active');
        ind.classList.remove('completed');
      } else if (stepIdx < stepNumber) {
        ind.classList.remove('active');
        ind.classList.add('completed');
      } else {
        ind.classList.remove('active');
        ind.classList.remove('completed');
      }
    });

    initLucideIcons();
  };

  // Expose to global window for external buttons
  window.SulakshaaForm = { goToStep };

  // Validation helpers
  const validateStep1 = () => {
    let valid = true;
    const specVal = specialitySelect ? specialitySelect.value : '';
    if (!specVal) {
      showFieldError('preferredSpeciality', 'Please select a preferred medical speciality.');
      valid = false;
    } else {
      clearFieldError('preferredSpeciality');
    }

    const dateVal = dateInput ? dateInput.value : '';
    if (!dateVal) {
      showFieldError('preferredDate', 'Please select your preferred consultation date.');
      valid = false;
    } else {
      clearFieldError('preferredDate');
    }

    return valid;
  };

  const validateStep2 = () => {
    let valid = true;
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal || nameVal.length < 2) {
      showFieldError('patientName', 'Please enter your full name (minimum 2 characters).');
      valid = false;
    } else {
      clearFieldError('patientName');
    }

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

    return valid;
  };

  const updateSummaryCard = () => {
    if (summarySpeciality && specialitySelect) {
      summarySpeciality.textContent = specialitySelect.value || 'General Medicine';
    }
    if (summaryDate && dateInput) {
      summaryDate.textContent = dateInput.value || todayStr;
    }
    if (summaryName && nameInput) {
      summaryName.textContent = nameInput.value.trim() || '-';
    }
    if (summaryPhone && phoneInput) {
      summaryPhone.textContent = `+91 ${phoneInput.value.trim()}` || '-';
    }
  };

  // Step 1 -> Step 2
  step1NextBtn?.addEventListener('click', () => {
    if (validateStep1()) {
      goToStep(2);
      if (nameInput) nameInput.focus();
    }
  });

  // Step 2 -> Step 1
  step2PrevBtn?.addEventListener('click', () => {
    goToStep(1);
  });

  // Step 2 -> Step 3
  step2NextBtn?.addEventListener('click', () => {
    if (validateStep2()) {
      updateSummaryCard();
      goToStep(3);
    }
  });

  // Step 3 -> Step 2
  step3PrevBtn?.addEventListener('click', () => {
    goToStep(2);
  });

  // Direct Step Indicator Clicks
  stepIndicators.forEach(ind => {
    ind.addEventListener('click', () => {
      const targetStep = parseInt(ind.getAttribute('data-step-indicator'), 10);
      if (targetStep === 1) {
        goToStep(1);
      } else if (targetStep === 2) {
        if (validateStep1()) goToStep(2);
      } else if (targetStep === 3) {
        if (validateStep1() && validateStep2()) {
          updateSummaryCard();
          goToStep(3);
        }
      }
    });
  });

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Verify all steps
    if (!validateStep1()) {
      goToStep(1);
      return;
    }
    if (!validateStep2()) {
      goToStep(2);
      return;
    }

    // Verify Step 3 consent
    if (consentCheckbox && !consentCheckbox.checked) {
      showFieldError('patientConsent', 'Please consent to allow our hospital reception to contact you.');
      return;
    } else {
      clearFieldError('patientConsent');
    }

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const specVal = specialitySelect ? specialitySelect.value : '';
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

    // Simulated receipt with animated transitions
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }

      // Hide steps and tracker, display animated success card
      if (step1) step1.style.display = 'none';
      if (step2) step2.style.display = 'none';
      if (step3) step3.style.display = 'none';

      const tracker = document.querySelector('.form-steps-tracker');
      if (tracker) tracker.style.display = 'none';

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
              <span class="text-muted">Department:</span>
              <strong>${escapeHtml(specVal)}</strong>
            </div>
            <div class="success-summary-row">
              <span class="text-muted">Preferred Date:</span>
              <strong>${escapeHtml(dateVal)}</strong>
            </div>
            <div class="success-summary-row">
              <span class="text-muted">Contact Phone:</span>
              <strong>+91 ${escapeHtml(phoneVal)}</strong>
            </div>
            <div class="success-summary-row">
              <span class="text-muted">Facility:</span>
              <span>Sulakshaa Multi Speciality Hospital, Mysuru</span>
            </div>
          `;
        }
      }

      // Backward compatibility with #formSuccessAlert
      const successAlert = document.getElementById('formSuccessAlert');
      const alertMsg = document.getElementById('alertMessageContent');
      if (successAlert) {
        if (alertMsg) {
          alertMsg.textContent = `Thank you, ${nameVal}. Your enquiry for ${specVal} on ${dateVal} has been recorded. Our reception coordinator will call ${phoneVal} to verify doctor availability and confirm your token.`;
        }
        successAlert.style.display = 'flex';
      }

      // Show toast
      showToast(
        'Enquiry Submitted Successfully',
        `Thank you, ${nameVal}. Your enquiry for ${specVal} has been received. Our reception team will call ${phoneVal} to confirm your slot.`,
        'success'
      );

      initLucideIcons();
    }, 850);
  });

  // Book Another Appointment button
  if (bookAnotherBtn) {
    bookAnotherBtn.addEventListener('click', () => {
      form.reset();
      if (dateInput) dateInput.value = todayStr;
      
      deptChips.forEach(c => c.classList.remove('active'));

      if (successView) successView.style.display = 'none';
      const tracker = document.querySelector('.form-steps-tracker');
      if (tracker) tracker.style.display = 'block';

      if (step1) step1.style.display = '';
      if (step2) step2.style.display = '';
      if (step3) step3.style.display = '';

      goToStep(1);
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

  const iconColor = type === 'success' ? '#16865C' : '#087DC1';

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
      badge: 'Paediatrics &amp; Neonatology',
      img: 'https://images.unsplash.com/photo-1594824813583-11a5113bfcf4?auto=format&fit=crop&w=350&h=380&q=80',
      speciality: 'General Paediatrics, Newborn Health, Childhood Immunisation, Developmental Milestones &amp; Paediatric Emergency Assessment.',
      philosophy: 'Providing gentle, family-centred healthcare for newborns, children, and adolescents with empathetic communication and meticulous paediatric care.',
      timings: 'Monday to Saturday (9:00 AM - 1:00 PM).'
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
