// =============================================================================
// T. PAVAN GOWDA - PORTFOLIO INTERACTION SCRIPT
// Night Mode Toggle with CSS Media Query Sync
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const rootElement = document.documentElement;

  // Media query listener for system theme preference
  const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Retrieve saved preference or default to null
  const savedTheme = localStorage.getItem('pavan_portfolio_theme');

  /**
   * Determine the effective active theme
   */
  function getEffectiveTheme() {
    const currentExplicit = rootElement.getAttribute('data-theme');
    if (currentExplicit === 'dark' || currentExplicit === 'light') {
      return currentExplicit;
    }
    return mediaQueryDark.matches ? 'dark' : 'light';
  }

  /**
   * Update the UI toggle button state
   */
  function updateToggleUI(theme) {
    if (theme === 'dark') {
      themeIcon.textContent = '🌙';
      themeText.textContent = 'NIGHT';
      themeToggleBtn.setAttribute('title', 'Switch to Day Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Day Mode');
    } else {
      themeIcon.textContent = '☀️';
      themeText.textContent = 'DAY';
      themeToggleBtn.setAttribute('title', 'Switch to Night Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Night Mode');
    }
  }

  /**
   * Apply theme: 'dark', 'light', or 'auto'
   */
  function applyTheme(theme, save = true) {
    if (theme === 'dark' || theme === 'light') {
      rootElement.setAttribute('data-theme', theme);
      if (save) localStorage.setItem('pavan_portfolio_theme', theme);
      updateToggleUI(theme);
    } else {
      rootElement.removeAttribute('data-theme');
      if (save) localStorage.removeItem('pavan_portfolio_theme');
      updateToggleUI(mediaQueryDark.matches ? 'dark' : 'light');
    }
  }

  // Initialize theme on load
  if (savedTheme) {
    applyTheme(savedTheme, false);
  } else {
    // Rely on CSS Media Query by default
    updateToggleUI(mediaQueryDark.matches ? 'dark' : 'light');
  }

  // Respond to OS / Browser theme change dynamically if no manual override is active
  mediaQueryDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('pavan_portfolio_theme')) {
      updateToggleUI(e.matches ? 'dark' : 'light');
    }
  });

  // Toggle button click event
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = getEffectiveTheme();
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }

  // Smooth active link highlight on scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});
