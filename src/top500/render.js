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

function cardInnerMarkup(w, isLoggedIn) {
  const isDev = w.cat === 'dev';
  const tagLabel = escapeHtml(isDev ? 'developer' : String(w.level || ''));
  const tagClass = isDev ? 'tag-dev' : `tag-level-${w.level || 'A1'}`;
  const ipaBlock = w.ipa
    ? `<span class="word-ipa" lang="en">${escapeHtml(w.ipa)}</span>`
    : '';
  const editBtn = isLoggedIn
    ? '<button type="button" class="card-edit" title="Редактировать" aria-label="Редактировать слово">✎</button>'
    : '';

  return [
    '<button type="button" class="card-voice" title="Прослушать" aria-label="Прослушать пример">',
    '<span class="card-voice-icon" aria-hidden="true">&#128266;</span>',
    '</button>',
    editBtn,
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

const LEVELS = new Set(['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']);

function shouldShowCard(w, currentCat) {
  if (currentCat === 'all') return true;
  if (currentCat === 'dev') return w.cat === 'dev';
  if (LEVELS.has(currentCat)) return w.level === currentCat;
  return Array.isArray(w.tags) && w.tags.includes(currentCat);
}

const TH_LABELS = {
  en: 'English',
  ipa: 'IPA',
  hy: 'Հայerен/русский',
  ex: 'Example',
  exhy: 'Հայerен թargmanutyun',
};

function updateSortHeaders(sortField, sortDir) {
  document.querySelectorAll('#word-table th[data-sort]').forEach((th) => {
    const field = th.dataset.sort;
    const isActive = field === sortField;
    th.classList.toggle('th-sort-active', isActive);
    th.textContent = TH_LABELS[field] + (isActive ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '');
  });
}

function sortList(list, sortField, sortDir) {
  return [...list].sort((a, b) => {
    const av = String(a[sortField] || '').toLowerCase();
    const bv = String(b[sortField] || '').toLowerCase();
    const cmp = av.localeCompare(bv);
    return sortDir === 'asc' ? cmp : -cmp;
  });
}

function renderTable({ list, learnedSet, currentCat, sortField, sortDir, isLoggedIn, onEdit }) {
  const query = document.getElementById('search').value.trim().toLowerCase();
  const tbody = document.getElementById('word-table-body');
  tbody.replaceChildren();

  updateSortHeaders(sortField, sortDir);

  const filtered = list.filter((w) => {
    if (!shouldShowCard(w, currentCat)) return false;
    if (query && !matchesSearch(w, query)) return false;
    return true;
  });

  const sorted = sortList(filtered, sortField, sortDir);

  sorted.forEach((w, idx) => {
    const key = stableKey(w);
    const learned = learnedSet.has(key);
    const tr = document.createElement('tr');
    if (learned) tr.classList.add('row-learned');
    const editCell = isLoggedIn
      ? `<td class="col-edit"><button class="table-edit-btn" title="Редактировать">✎</button></td>`
      : '<td class="col-edit"></td>';
    tr.innerHTML = [
      `<td class="col-num">${idx + 1}</td>`,
      `<td class="col-en"><strong>${escapeHtml(w.en)}</strong></td>`,
      `<td class="col-ipa"><span class="word-ipa">${escapeHtml(w.ipa || '')}</span></td>`,
      `<td class="col-hy" lang="hy">${escapeHtml(w.hy || w.ru || '')}</td>`,
      `<td class="col-ex" lang="en">${escapeHtml(w.ex || '')}</td>`,
      `<td class="col-exhy" lang="hy">${escapeHtml(w.exhy || '')}</td>`,
      editCell,
    ].join('');
    if (isLoggedIn && onEdit) {
      tr.querySelector('.table-edit-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        onEdit(w);
      });
    }
    tbody.appendChild(tr);
  });
  document.getElementById('learned-count').textContent = String(learnedSet.size);
  document.getElementById('total-count').textContent = String(list.length);
  const pct = list.length ? ((learnedSet.size / list.length) * 100).toFixed(0) : '0';
  document.getElementById('progress').style.width = `${pct}%`;
}

export function renderGrid({ list, learnedSet, currentCat, onLearnToggle, onDelete, viewMode, sortField, sortDir, isLoggedIn, onEdit }) {
  const query = document.getElementById('search').value.trim().toLowerCase();

  const grid = document.getElementById('grid');
  const tableWrap = document.getElementById('word-table-wrap');

  if (viewMode === 'table') {
    grid.hidden = true;
    tableWrap.hidden = false;
    renderTable({
      list,
      learnedSet,
      currentCat,
      sortField,
      sortDir,
      isLoggedIn,
      onEdit,
    });
    return;
  }

  grid.replaceChildren();
  grid.hidden = false;
  tableWrap.hidden = true;

  list.forEach((w) => {
    if (!shouldShowCard(w, currentCat)) return;
    if (query && !matchesSearch(w, query)) return;

    const key = stableKey(w);
    const card = document.createElement('div');
    card.className = `card top-card${learnedSet.has(key) ? ' learned' : ''}`;
    card.insertAdjacentHTML('beforeend', cardInnerMarkup(w, isLoggedIn));

    card.querySelector('.card-voice').addEventListener('click', (e) => {
      e.stopPropagation();
      speakCard(w);
    });

    const editBtn = card.querySelector('.card-edit');
    if (editBtn && onEdit) {
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onEdit(w);
      });
    }

    card.addEventListener('click', async () => {
      if (card.classList.contains('card--loading')) return;
      card.classList.add('card--loading');
      try {
        await onLearnToggle(key);
      } finally {
        card.classList.remove('card--loading');
      }
    });
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
