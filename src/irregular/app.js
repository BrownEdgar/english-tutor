import { loadSet, saveSet } from '../shared/storage.js';
import { contentService } from '../shared/content-service.js';

const STORAGE_KEY = 'irregular';
const learned = loadSet(STORAGE_KEY);
let query = '';
let IRREGULAR_VERBS = [];

function save() {
  saveSet(STORAGE_KEY, learned);
}

export async function loadVerbs() {
  IRREGULAR_VERBS = await contentService.fetchIrregularVerbs();
}

function filtered() {
  if (!query) return IRREGULAR_VERBS;
  const q = query.toLowerCase();
  return IRREGULAR_VERBS.filter(
    (v) =>
      v.inf.includes(q) ||
      v.v2.includes(q) ||
      v.v3.includes(q) ||
      v.hy.toLowerCase().includes(q) ||
      v.ru.toLowerCase().includes(q)
  );
}

function updateStats() {
  const learnedCount = document.getElementById('learned-count');
  const totalCount = document.getElementById('total-count');
  const progress = document.getElementById('progress');
  const total = IRREGULAR_VERBS.length;
  const cnt = learned.size;
  const pct = total ? Math.round((cnt / total) * 100) : 0;
  if (learnedCount) learnedCount.textContent = cnt;
  if (totalCount) totalCount.textContent = total;
  if (progress) progress.style.width = pct + '%';
}

function renderRow(verb, globalIdx) {
  const isLearned = learned.has(verb.id);
  const tr = document.createElement('tr');
  tr.className = isLearned ? 'learned' : '';
  tr.dataset.verbId = verb.id;
  tr.innerHTML = `
    <td class="col-num">${globalIdx + 1}</td>
    <td class="col-v1"><strong>${verb.inf}</strong></td>
    <td class="col-v2">${verb.v2}</td>
    <td class="col-v3">${verb.v3}</td>
    <td class="col-hy">${verb.hy}</td>
    <td class="col-ru">${verb.ru}</td>
    <td class="col-check">
      <button class="check-btn${isLearned ? ' active' : ''}" aria-label="Выучено" data-verb-id="${verb.id}">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M3 8l3.5 3.5L13 4.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </td>`;

  const toggle = (verbId) => {
    if (learned.has(verbId)) learned.delete(verbId);
    else learned.add(verbId);
    save();
    render();
  };

  tr.querySelector('.check-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggle(e.currentTarget.dataset.verbId);
  });
  tr.addEventListener('click', () => toggle(tr.dataset.verbId));

  return tr;
}

export function render() {
  const tbody = document.getElementById('verbs-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  const verbs = filtered();
  verbs.forEach((v) => {
    const globalIdx = IRREGULAR_VERBS.indexOf(v);
    tbody.appendChild(renderRow(v, globalIdx));
  });
  updateStats();
}

export function initSearch() {
  const input = document.getElementById('search');
  if (!input) return;
  input.addEventListener('input', () => {
    query = input.value.trim();
    render();
  });
}

export function initResetBtn() {
  const btn = document.getElementById('btn-reset');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!confirm('Сбросить весь прогресс?')) return;
    learned.clear();
    save();
    render();
  });
}
