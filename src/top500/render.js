import { escapeHtml, stableKey } from './utils.js';
import { speakCard } from './speech.js';
import { confirmDialog } from './confirmDialog.js';

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
  const deleteBtn = isLoggedIn
    ? '<button type="button" class="card-delete" title="Удалить" aria-label="Удалить слово"><img src="/trash.svg" alt="" width="12" height="12"></button>'
    : '';

  return [
    '<div class="card-actions">',
    '<button type="button" class="card-voice" title="Прослушать" aria-label="Прослушать пример">',
    '<span class="card-voice-icon" aria-hidden="true">&#128266;</span>',
    '</button>',
    editBtn,
    deleteBtn,
    '</div>',
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
  hy: 'Հայերեն/русский',
  ex: 'Example',
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

function renderTable({ list, learnedSet, currentCat, sortField, sortDir, isLoggedIn, onEdit, onDelete }) {
  const searchInput = document.getElementById('search');
  const table = document.getElementById('word-table');
  const tbody = document.getElementById('word-table-body');
  const learnedCountEl = document.getElementById('learned-count');
  const totalCountEl = document.getElementById('total-count');
  const progressEl = document.getElementById('progress');

  const query = searchInput.value.trim().toLowerCase();
  tbody.replaceChildren();
  table.classList.toggle('is-logged-in', isLoggedIn);

  updateSortHeaders(sortField, sortDir);

  const filtered = list.filter((w) => {
    if (!shouldShowCard(w, currentCat)) return false;
    if (query && !matchesSearch(w, query)) return false;
    return true;
  });

  const sorted = sortList(filtered, sortField, sortDir);

  const actionsCell = isLoggedIn
    ? '<td class="col-actions"><button class="table-edit-btn" title="Редактировать">✎</button><button class="table-delete-btn" title="Удалить"><img src="/trash.svg" alt="" width="12" height="12"></button></td>'
    : '';

  sorted.forEach((w, idx) => {
    const key = stableKey(w);
    const tr = document.createElement('tr');
    if (learnedSet.has(key)) tr.classList.add('row-learned');
    tr.insertAdjacentHTML(
      'beforeend',
      [
        `<td class="col-num">${idx + 1}</td>`,
        `<td class="col-en"><strong>${escapeHtml(w.en)}</strong></td>`,
        `<td class="col-ipa"><span class="word-ipa">${escapeHtml(w.ipa || '')}</span></td>`,
        `<td class="col-hy" lang="hy">${escapeHtml(w.hy || w.ru || '')}</td>`,
        `<td class="col-example" colspan="2">${exampleMarkup(w)}</td>`,
        actionsCell,
      ].join('')
    );

    const deleteBtn = tr.querySelector('.table-delete-btn');
    const editBtn = tr.querySelector('.table-edit-btn');

    if (deleteBtn && onDelete) {
      deleteBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (await confirmDialog(`Удалить слово "${w.en}"?`)) onDelete(w.id);
      });
    }
    if (editBtn && onEdit) {
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onEdit(w);
      });
    }
    tbody.appendChild(tr);
  });

  learnedCountEl.textContent = String(learnedSet.size);
  totalCountEl.textContent = String(list.length);
  progressEl.style.width = list.length ? `${((learnedSet.size / list.length) * 100).toFixed(0)}%` : '0%';
}

export function renderGrid({ list, learnedSet, currentCat, onLearnToggle, onDelete, viewMode, sortField, sortDir, isLoggedIn, onEdit }) {
  const searchInput = document.getElementById('search');
  const grid = document.getElementById('grid');
  const tableWrap = document.getElementById('word-table-wrap');
  const learnedCountEl = document.getElementById('learned-count');
  const totalCountEl = document.getElementById('total-count');
  const progressEl = document.getElementById('progress');

  const query = searchInput.value.trim().toLowerCase();

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
      onDelete,
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

    const voiceBtn = card.querySelector('.card-voice');
    const deleteBtn = card.querySelector('.card-delete');
    const editBtn = card.querySelector('.card-edit');

    voiceBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      speakCard(w);
    });
    if (deleteBtn && onDelete) {
      deleteBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (await confirmDialog(`Удалить слово "${w.en}"?`)) onDelete(w.id);
      });
    }
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

  learnedCountEl.textContent = String(learnedSet.size);
  totalCountEl.textContent = String(list.length);
  progressEl.style.width = list.length ? `${((learnedSet.size / list.length) * 100).toFixed(0)}%` : '0%';
}
