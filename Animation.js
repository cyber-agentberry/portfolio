document.addEventListener('DOMContentLoaded', () => {
  // 1. GRAB REFERENCES
  const navLinks   = document.querySelectorAll('.nav-links li a');
  const sections   = document.querySelectorAll('.section');
  const preloader  = document.querySelector('.preloader');
  
  // The "Know More" button in your Home section
  const knowMoreBtn = document.querySelector('.know-more-btn');

  /**
   * Hide all sections by removing the .active class
   */
  function hideAllSections() {
    sections.forEach(section => {
      section.classList.remove('active');
    });
  }

  /**
   * Show a specific section by ID
   */
  function showSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
  }

  // 2. NAV LINKS: ALLOW DEFAULT ANCHOR BEHAVIOR FOR #HASH
  //    BUT ALSO RUN SINGLE-PAGE SHOW/HIDE LOGIC
  navLinks.forEach(link => {
    const hrefValue = link.getAttribute('href');

    // Check if the link is an internal anchor (starts with '#')
    if (hrefValue && hrefValue.startsWith('#')) {
      link.addEventListener('click', () => {
        // DO NOT call e.preventDefault() here.
        // Let the browser update the URL hash.
        hideAllSections();
        const targetId = hrefValue.replace('#', '');
        showSection(targetId);
        // Now the URL will be something like .../#about,
        // so reloading will keep you on #about.
      });
    }
    else {
      // For external links (PDF or external site), do nothing special
      // or add a new event listener if needed
    }
  });

  // 2.5. KNOW MORE BUTTON LOGIC:
  // If it exists in the DOM, attach the same hide/show logic
  if (knowMoreBtn) {
    knowMoreBtn.addEventListener('click', e => {
      // We do want single-page logic, so prevent default scrolling
      e.preventDefault();
      
      // Hide all other sections
      hideAllSections();
      // Show "about" section
      showSection('about');

      // Optionally update the URL hash so reloading also shows 'about'
      window.location.hash = '#about';
    });
  }

  // 3. ON WINDOW LOAD: CHECK THE HASH & SHOW THE CORRECT SECTION
  window.addEventListener('load', () => {
    // If there's a hash in the URL, show that section
    if (window.location.hash) {
      const sectionId = window.location.hash.replace('#', '');
      hideAllSections();
      showSection(sectionId);
    } 
    // Otherwise, default to home (or whichever you prefer)
    else {
      hideAllSections();
      showSection('home');
    }

    // 4. PRELOADER LOGIC
    // Wait 2s (for example) for the loading bar animation to finish
    setTimeout(() => {
      preloader.classList.add('fade-out');
      // Remove from DOM after fade transition (~0.7s)
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 700);
    }, 2000);
  });
});
