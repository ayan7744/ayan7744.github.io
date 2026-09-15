(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const updateToggleLabel = () => {
    toggle?.setAttribute('aria-label', `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} theme`);
  };
  updateToggleLabel();
  toggle?.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    updateToggleLabel();
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // The theme still works when the browser blocks storage.
    }
  });

  const sections = [...document.querySelectorAll('[data-section]')];
  if (!sections.length) return;
  const links = document.querySelectorAll('.site-nav a[data-target]');
  const activateSection = () => {
    const requested = window.location.hash.slice(1);
    const target = sections.find(section => section.id === requested)?.id || 'home';
    sections.forEach(section => {
      section.classList.toggle('active', section.id === target);
    });
    links.forEach(link => {
      const active = link.dataset.target === target;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    // Keep the shared header visible when opening or navigating to a section.
    window.scrollTo(0, 0);
  };

  activateSection();
  window.addEventListener('hashchange', activateSection);
  window.addEventListener('load', () => window.scrollTo(0, 0), { once: true });
  root.classList.add('js');
})();
