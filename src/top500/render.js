import { escapeHtml, stableKey } from './utils.js';
import { speakCard } from './speech.js';

/** Armenian gloss + Russian, e.g. `թարմացնել / обновить` */
function translationMarkup(w) {
  const hy = String(w.hy || '').trim();
  const ru = escapeHtml(String(w.ru || '').trim());
  if (!hy) {
    return `<span lang="ru">${ru}</span>`;
  }
  return `<span lang="hy">${escapeHtml(hy)}</span><span class="translation-sep" aria-hidden="true"> / </span><span lang="ru">${ru}</span>`;
}

/** Armenian example, then English example (stacked). */
function exampleMarkup(w) {
  const exhy = String(w.exhy || '').trim();
  const ex = escapeHtml(String(w.ex || '').trim());
  if (!exhy) {
    return `<span lang="en">${ex}</span>`;
  }
  return `<div class="example-line" lang="en">${ex}</div> <div class="example-line" lang="hy">${escapeHtml(exhy)}</div>`;
}

function cardInnerMarkup(w) {
  const isDev = w.cat === 'dev';
  const tagLabel = escapeHtml(isDev ? 'developer' : String(w.level || ''));
  const tagClass = isDev ? 'tag-dev' : `tag-level-${w.level || 'A1'}`;
  const ipaBlock = w.ipa
    ? `<span class="word-ipa" lang="en">${escapeHtml(w.ipa)}</span>`
    : '';

  return [
    '<button type="button" class="card-voice" title="Прослушать" aria-label="Прослушать пример">',
    '<span class="card-voice-icon" aria-hidden="true">&#128266;</span>',
    '</button>',
    `<span class="top-tag ${tagClass}">${tagLabel}</span>`,
    '<div class="word-row">',
    `<span class="word-en">${escapeHtml(w.en)}</span>`,
    ipaBlock,
    '</div>',
    `<div class="word-ru">${translationMarkup(w)}</div>`,
    `<div class="example">${exampleMarkup(w)}</div>`,
  ].join('');
}

function matchesSearch(w, queryLower) {
  const blob = [w.en, w.ru, w.ex, w.ipa || '', w.hy || '', w.exhy || '']
    .join(' ')
    .toLowerCase();
  return blob.includes(queryLower);
}

function shouldShowCard(w, currentCat) {
  if (currentCat === 'all') return true;
  if (currentCat === 'dev') return w.cat === 'dev';
  return w.level === currentCat;
}

export function renderGrid({ list, learnedSet, currentCat, onLearnToggle }) {
  const query = document.getElementById('search').value.trim().toLowerCase();
  const grid = document.getElementById('grid');
  grid.replaceChildren();

  list.forEach((w) => {
    if (!shouldShowCard(w, currentCat)) return;
    if (query && !matchesSearch(w, query)) return;

    const key = stableKey(w);
    const card = document.createElement('div');
    card.className = `card top-card${learnedSet.has(key) ? ' learned' : ''}`;
    card.insertAdjacentHTML('beforeend', cardInnerMarkup(w));

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
  document.getElementById('progress').style.width = `${pct}%`;
}
