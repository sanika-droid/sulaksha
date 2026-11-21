/**
 * Sulakshaa Multi Speciality Hospital - Navigation & Departments Mega Dropdown
 */
(function() {
  'use strict';

  function initDepartmentsMegaDropdown() {
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown, .dept-mega-nav-item');

    function alignMegaDropdowns() {
      const megaDropdowns = document.querySelectorAll('.dept-mega-dropdown');
      megaDropdowns.forEach(dropdown => {
        const parent = dropdown.closest('.dept-mega-nav-item');
        if (!parent) return;
        const parentRect = parent.getBoundingClientRect();
        const dropdownWidth = dropdown.offsetWidth || 740;
        const screenWidth = window.innerWidth;
        
        // Default left offset
        let targetLeft = -90;
        
        // Prevent overflow beyond right viewport edge
        const rightEdge = parentRect.left + targetLeft + dropdownWidth;
        if (rightEdge > screenWidth - 20) {
          targetLeft -= (rightEdge - (screenWidth - 20));
        }
        
        // Prevent overflow beyond left viewport edge
        if (parentRect.left + targetLeft < 16) {
          targetLeft = -(parentRect.left - 16);
        }
        
        dropdown.style.left = `${targetLeft}px`;
      });
    }

    // Align on load and resize
    alignMegaDropdowns();
    window.addEventListener('resize', alignMegaDropdowns);

    dropdownItems.forEach(dropdown => {
      const toggle = dropdown.querySelector('.nav-dropdown-toggle, .dept-dropdown-link');
      const menu = dropdown.querySelector('.dept-mega-dropdown, .nav-dropdown-menu');
      if (!toggle || !menu) return;

      // Align on mouse hover
      dropdown.addEventListener('mouseenter', alignMegaDropdowns);

      // Support click interaction on desktop
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth > 1120) {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = dropdown.classList.toggle('is-open');
          toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          if (isOpen) {
            alignMegaDropdowns();
          }
        }
      });

      // Escape key to close
      dropdown.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          dropdown.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      dropdownItems.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('is-open');
          const toggle = dropdown.querySelector('.nav-dropdown-toggle, .dept-dropdown-link');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function initMobileDepartmentsDropdown() {
    const mobileDeptToggle = document.getElementById('mobileDeptToggle');
    const mobileDeptParent = mobileDeptToggle ? mobileDeptToggle.closest('.mobile-nav-item-dropdown') : null;
    if (mobileDeptToggle && mobileDeptParent) {
      mobileDeptToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isExpanded = mobileDeptParent.classList.toggle('is-open');
        mobileDeptToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        const panel = document.getElementById('mobileDeptPanel');
        if (panel) panel.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');
      });
    }
  }

  function initIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  function initFooterHelpers() {
    // 1. Dynamic Year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // 2. Legal Policy Modals
    const disclaimerBtn = document.getElementById('openDisclaimerBtn');
    const privacyBtn = document.getElementById('openPrivacyBtn');
    const termsBtn = document.getElementById('openTermsBtn');
    const modal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalCloseBtn');
    const okBtn = document.getElementById('modalOkBtn');

    if (modal && modalTitle && modalBody && !window.__footerModalInit) {
      window.__footerModalInit = true;

      function openLegalModal(title, html) {
        modalTitle.textContent = title;
        modalBody.innerHTML = html;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      function closeLegalModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }

      closeBtn?.addEventListener('click', closeLegalModal);
      okBtn?.addEventListener('click', closeLegalModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLegalModal();
      });

      disclaimerBtn?.addEventListener('click', () => {
        openLegalModal(
          'Medical Disclaimer',
          '<h4>1. General Information Only</h4><p>The information on this website is published for general public education and awareness only. It does not replace professional clinical diagnosis, physical examination, or tailored medical advice from a registered medical practitioner.</p><h4>2. Emergency Situations</h4><p>In case of acute medical emergencies, chest pain, stroke symptoms, major trauma, or poisoning, please call our 24/7 Emergency Casualty immediately at <strong>9535747478</strong> or visit Sulakshaa Multi Speciality Hospital, Mysuru.</p>'
        );
      });

      privacyBtn?.addEventListener('click', () => {
        openLegalModal(
          'Privacy Policy',
          '<h4>1. Confidentiality Commitment</h4><p>Sulakshaa Multi Speciality Hospital is deeply committed to upholding patient privacy and medical confidentiality. All clinical records, enquiry details, and personal data are held strictly secure and never sold or shared with unauthorized commercial entities.</p><h4>2. Data Protection</h4><p>Appointment inquiries submitted through our website are transmitted securely to authorized hospital reception coordinators exclusively for consultation scheduling and patient assistance.</p>'
        );
      });

      termsBtn?.addEventListener('click', () => {
        openLegalModal(
          'Terms of Use',
          '<h4>1. Terms Acceptance</h4><p>By accessing and utilizing this website, you agree to abide by all applicable Indian healthcare guidelines, digital laws, and hospital regulations.</p><h4>2. Hospital Enquiries</h4><p>Online appointment and second-opinion requests are subject to specialist availability and confirmed subsequent to hospital desk verification.</p>'
        );
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initDepartmentsMegaDropdown();
      initMobileDepartmentsDropdown();
      initIcons();
      initFooterHelpers();
    });
  } else {
    initDepartmentsMegaDropdown();
    initMobileDepartmentsDropdown();
    initIcons();
    initFooterHelpers();
  }
})();

