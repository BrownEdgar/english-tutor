import { TAG_NAMES } from './constants.js';
import { escapeHtml, stableKey } from './utils.js';
import { speakCard } from './speech.js';

function buildCardHtml(w) {
  const isDev = w.cat === 'dev';
  const tagLabel = isDev ? 'developer' : w.level || '';
  const tagClass = isDev ? 'tag-dev' : 'tag-level-' + (w.level || 'A1');
  return (
    '<button type="button" class="card-voice" title="Прослушать" aria-label="Прослушать пример">' +
    '<span class="card-voice-icon" aria-hidden="true">&#128266;</span>' +
    '</button>' +
    '<span class="top-tag ' +
    tagClass +
    '">' +
    tagLabel +
    '</span>' +
    '<div class="word-row">' +
    '<span class="word-en">' +
    escapeHtml(w.en) +
    '</span>' +
    (w.ipa
      ? '<span class="word-ipa" lang="en">' + escapeHtml(w.ipa) + '</span>'
      : '') +
    '</div>' +
    '<div class="word-ru">' +
    escapeHtml(w.ru) +
    '</div>' +
    '<div class="example">' +
    escapeHtml(w.ex) +
    '</div>'
  );
}

export function renderGrid({ list, learnedSet, currentCat, onLearnToggle }) {
  const query = document.getElementById('search').value.toLowerCase();
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  list.forEach((w) => {
    if (currentCat !== 'all') {
      if (currentCat === 'dev') {
        if (w.cat !== 'dev') return;
      } else {
        if (w.level !== currentCat) return;
      }
    }
    if (query) {
      const blob = [w.en, w.ru, w.ex, w.ipa || ''].join(' ').toLowerCase();
      if (!blob.includes(query)) return;
    }

    const key = stableKey(w);
    const card = document.createElement('div');
    card.className = 'card top-card' + (learnedSet.has(key) ? ' learned' : '');
    card.innerHTML = buildCardHtml(w);

    card.querySelector('.card-voice').addEventListener('click', (e) => {
      e.stopPropagation();
      speakCard(w);
    });

    card.addEventListener('click', () => onLearnToggle(key));
    grid.appendChild(card);
  });

  document.getElementById('learned-count').textContent = String(
    learnedSet.size
  );
  document.getElementById('total-count').textContent = String(list.length);
  const pct = list.length
    ? ((learnedSet.size / list.length) * 100).toFixed(0)
    : '0';
  document.getElementById('progress').style.width = pct + '%';
}
