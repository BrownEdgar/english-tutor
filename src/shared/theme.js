const THEME_KEY = 'en_app_theme';

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  applyTheme(saved ?? preferred);
}

export function toggleTheme() {
  const current = document.documentElement.dataset.theme ?? 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.querySelector('.theme-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}
