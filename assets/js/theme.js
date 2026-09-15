// Apply the theme before the page paints, including when storage is unavailable.
(() => {
  const root = document.documentElement;
  let theme;
  try {
    theme = localStorage.getItem('theme');
  } catch {
    // Private browsing and local previews can disable storage.
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.dataset.theme = theme;
})();
