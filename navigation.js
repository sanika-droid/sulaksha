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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initDepartmentsMegaDropdown();
      initMobileDepartmentsDropdown();
      initIcons();
    });
  } else {
    initDepartmentsMegaDropdown();
    initMobileDepartmentsDropdown();
    initIcons();
  }
})();

