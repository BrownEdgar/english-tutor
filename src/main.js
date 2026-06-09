import './shared/design-system.css';
import './home.css';
import { initTheme, toggleTheme } from './shared/theme.js';
import { getProgress } from './shared/storage.js';
import { createAuthButton } from './shared/auth.js';

const APPS = [
  {
    id: 'rules',
    href: 'rules.html',
    title: 'English Rules',
    subtitle: 'Произношение · Правописание · Грамматика',
    icon: '📖',
    total: 727,
    color: '#4f46e5',
  },
  {
    id: 'mega',
    href: 'mega.html',
    title: 'A+B+C — 400+ слов',
    subtitle: 'Фразовые глаголы · RU · HY · уровни A/B/C',
    icon: '🇬🇧',
    total: 975,
    color: '#10b981',
  },
  {
    id: 'phrasal',
    href: 'phrasal.html',
    title: '300+ фраз и блоков',
    subtitle: 'Фразовые глаголы + дискурс B2–C1',
    icon: '💬',
    total: 471,
    color: '#f97316',
  },
  {
    id: 'top500',
    href: 'top500.html',
    title: 'ТОП 500+ слов',
    subtitle: 'IPA фонетика · речь · добавить своё',
    icon: '🔊',
    total: 871,
    color: '#8b5cf6',
  },
  {
    id: 'irregular',
    href: 'irregular.html',
    title: 'Irregular Verbs',
    subtitle: 'V1 → V2 → V3 · HY · RU · 100 բայ',
    icon: '🔀',
    total: 100,
    color: '#e11d48',
  },
  {
    id: 'sentences',
    href: 'sentences.html',
    title: '127+ предложений',
    subtitle: 'There is/are · фразовые глаголы · лексика A–C',
    icon: '✍️',
    total: 127,
    color: '#0891b2',
  },
];

function renderCards() {
  const grid = document.getElementById('apps-grid');
  grid.innerHTML = '';

  APPS.forEach((app) => {
    const { learned, total } = getProgress(app.id, app.total);
    const pct = total ? Math.round((learned / total) * 100) : 0;

    const card = document.createElement('a');
    card.className = 'app-card';
    card.href = app.href;
    card.style.setProperty('--card-color', app.color);
    card.innerHTML = `
      <div class="app-card-icon">${app.icon}</div>
      <div class="app-card-body">
        <div class="app-card-title">${app.title}</div>
        <div class="app-card-sub">${app.subtitle}</div>
        <div class="app-card-stats">
          <span>${learned} / ${total} выучено</span>
          <span class="pct">${pct}%</span>
        </div>
        <div class="progress-bar" style="margin-top:8px">
          <div class="progress-fill" style="width:${pct}%;background:${app.color}"></div>
        </div>
      </div>
      <svg class="app-card-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 3l5 5-5 5"/>
      </svg>
    `;
    grid.appendChild(card);
  });
}

initTheme();
document.querySelector('.theme-btn').addEventListener('click', toggleTheme);
document.querySelector('.home-nav').appendChild(createAuthButton());
renderCards();
