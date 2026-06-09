import { initTheme, toggleTheme } from './theme.js';
import { createAuthButton } from './auth.js';

export function mountNav({ title, backHref = 'index.html' }) {
  const nav = document.createElement('nav');
  nav.className = 'app-nav';
  nav.innerHTML = `
    <a class="nav-back" href="${backHref}" aria-label="На главную">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10 3L5 8l5 5"/>
      </svg>
      Назад
    </a>
    <span class="nav-title">${title}</span>
    <div class="nav-actions">
      <button class="theme-btn" aria-label="Сменить тему">🌙</button>
    </div>
  `;
  document.body.prepend(nav);

  initTheme();
  nav.querySelector('.theme-btn').addEventListener('click', toggleTheme);
  nav.querySelector('.nav-actions').prepend(createAuthButton());

  return nav;
}
