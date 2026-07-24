import './shared/design-system.css';
import './home.css';
import { initTheme, toggleTheme } from './shared/theme.js';
import { getProgress } from './shared/storage.js';
import { createAuthButton } from './shared/auth.js';
import {
  updateAndGetStreak,
  computeXP,
  getCEFRLevel,
  getDailyPhrase,
} from './shared/gamification.js';

const APPS = [
  {
    id: 'conversations',
    href: 'conversations.html',
    title: 'Conversations A1–C2',
    subtitle: 'Dialogues · TTS · Armenian tips · Practice mode',
    icon: '🗣️',
    total: 19,
    color: '#7c3aed',
  },
  {
    id: 'rules',
    href: 'rules.html',
    title: 'English Rules',
    subtitle: 'Pronunciation · Spelling · Grammar',
    icon: '📖',
    total: 46,
    color: '#4f46e5',
  },
  {
    id: 'mega',
    href: 'mega.html',
    title: 'A+B+C — 400+ Words',
    subtitle: 'Phrasal verbs · RU · HY · Levels A / B / C',
    icon: '🇬🇧',
    total: 975,
    color: '#10b981',
  },
  {
    id: 'top500',
    href: 'top500.html',
    title: 'Top 1000+ Words',
    subtitle: 'IPA phonetics · TTS · Add your own',
    icon: '🔊',
    total: 871,
    color: '#8b5cf6',
  },
  {
    id: 'irregular',
    href: 'irregular.html',
    title: 'Irregular Verbs',
    subtitle: 'V1 → V2 → V3 · HY · RU · 100 verbs',
    icon: '🔀',
    total: 100,
    color: '#e11d48',
  },
  {
    id: 'sentences',
    href: 'sentences.html',
    title: '157+ Sentences',
    subtitle: 'There is/are · Phrasal verbs · Levels A–C',
    icon: '✍️',
    total: 127,
    color: '#0891b2',
  },
  {
    id: 'phrases',
    href: 'phrases.html',
    title: '100 практических фраз',
    subtitle: 'Everyday English · Armenian translations',
    icon: '💬',
    total: 100,
    color: '#d97706',
  },
];

// ─── Module cards ─────────────────────────────────────────────────────────────

function renderCards() {
  const grid = document.getElementById('apps-grid');
  grid.replaceChildren();

  APPS.forEach((app) => {
    const { learned, total } = getProgress(app.id, app.total);
    const pct = total ? Math.round((learned / total) * 100) : 0;

    const card = document.createElement('a');
    card.className = 'app-card';
    card.href = app.href;
    card.style.setProperty('--card-color', app.color);
    card.insertAdjacentHTML('beforeend', `
      <div class="app-card-icon">${app.icon}</div>
      <div class="app-card-body">
        <div class="app-card-title">${app.title}</div>
        <div class="app-card-sub">${app.subtitle}</div>
        <div class="app-card-stats">
          <span>${learned} / ${total} learned</span>
          <span class="pct">${pct}%</span>
        </div>
        <div class="progress-bar" style="margin-top:8px">
          <div class="progress-fill" style="width:${pct}%;background:${app.color}"></div>
        </div>
      </div>
      <svg class="app-card-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 3l5 5-5 5"/>
      </svg>
    `);
    grid.appendChild(card);
  });
}

// ─── Gamification display ─────────────────────────────────────────────────────

function renderGamification() {
  const streak = updateAndGetStreak();
  const xp = computeXP();
  const level = getCEFRLevel(xp);

  document.getElementById('gam-streak').textContent = streak;
  document.getElementById('gam-xp').textContent = xp;
  document.getElementById('gam-level').textContent = level.label;
  document.getElementById('gam-xp-fill').style.width = level.pct + '%';

  const xpToNext = level.next - xp;
  if (xpToNext > 0) {
    document.getElementById('gam-xp-hint').textContent =
      `${xpToNext} XP to reach next level`;
  } else {
    document.getElementById('gam-xp-hint').textContent =
      'Maximum level reached!';
  }
}

// ─── Daily phrase ─────────────────────────────────────────────────────────────

function renderDailyPhrase() {
  const phrase = getDailyPhrase();

  document.getElementById('daily-en').textContent = phrase.en;
  document.getElementById('daily-hy').textContent = phrase.hy;
  document.getElementById('daily-tip').textContent = phrase.tip;
  document.getElementById('daily-level').textContent = phrase.level;
  if (phrase.armenianNote) {
    document.getElementById('daily-note').textContent =
      '🇦🇲 ' + phrase.armenianNote;
  }

  document.getElementById('daily-speak').addEventListener('click', () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(phrase.en);
    utter.lang = 'en-US';
    utter.rate = 0.85;
    const go = () => {
      const voices = window.speechSynthesis.getVoices();
      const en = voices.filter((v) => v.lang.startsWith('en'));
      const pick =
        en.find((v) => /google us english/i.test(v.name)) ||
        en.find((v) => /samantha/i.test(v.name)) ||
        en[0];
      if (pick) utter.voice = pick;
      window.speechSynthesis.speak(utter);
    };
    if (window.speechSynthesis.getVoices().length) go();
    else
      window.speechSynthesis.addEventListener('voiceschanged', go, {
        once: true,
      });
  });
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

initTheme();
document.querySelector('.theme-btn').addEventListener('click', toggleTheme);
document.querySelector('.home-nav').appendChild(createAuthButton());

renderCards();
renderGamification();
renderDailyPhrase();
