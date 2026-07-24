import { loadSet, saveSet } from '../shared/storage.js';
import { contentService } from '../shared/content-service.js';

const learned = loadSet('mega');
const activeLevels = new Set(['A', 'B', 'C']);
let activeCat = 'all';
let DATA = [];

function save() {
  saveSet('mega', learned);
}

export async function loadMega() {
  DATA = await contentService.fetchMega();
}

function matches(item) {
  const q = document.getElementById('search').value.toLowerCase();
  if (!activeLevels.has(item.lv)) return false;
  if (activeCat !== 'all' && item.cat !== activeCat) return false;
  if (!q) return true;
  const blob = [
    item.base,
    item.ru,
    item.hy,
    item.type === 'phrasal'
      ? (item.forms || [])
          .map((f) => f.w + f.ru + f.hy + (f.exHy || ''))
          .join(' ')
      : item.ex,
  ]
    .join(' ')
    .toLowerCase();
  return blob.includes(q);
}

const catColors = {
  motion: '#6366f1',
  object: '#10b981',
  people: '#f43f5e',
  emotion: '#f97316',
  daily: '#8b5cf6',
  talk: '#06b6d4',
  mind: '#84cc16',
  formal: '#ec4899',
};

function renderCard(item) {
  const card = document.createElement('div');
  card.className = 'card mega-card' + (learned.has(item.id) ? ' done' : '');

  const pipColor = catColors[item.cat] || '#666';
  let inner = `<div class="cat-pip" style="background:${pipColor}"></div>`;
  inner += `<div class="card-top">
    <div class="level-badge lv-${item.lv}">${item.lv}</div>
    <div class="card-meta">
      <div class="word-en">${item.base}</div>
      <div class="word-tr">${item.tr}</div>
      <div class="word-langs">
        <span class="lang-ru">🇷🇺 ${item.ru}</span>
        <span class="lang-hy">🇦🇲 ${item.hy}</span>
      </div>
    </div>
  </div>`;

  if (item.type === 'phrasal') {
    inner += `<div class="forms">`;
    (item.forms || []).forEach((f) => {
      inner += `<div class="form-row">
        <div>
          <div class="f-word">${f.w}</div>
          <div class="f-tr">${f.tr}</div>
        </div>
        <div class="f-meanings">
          <div class="f-ru">🇷🇺 ${f.ru}</div>
          <div class="f-hy">🇦🇲 ${f.hy}</div>
        </div>
        <div class="f-ex">${f.ex}</div>
        ${f.exHy ? `<div class="f-ex-hy">${f.exHy}</div>` : `<div class="f-ex-hy na">N/A</div>`}
      </div>`;
    });
    inner += `</div>`;
  } else {
    const cls = item.lv === 'B' ? 'b-ex' : item.lv === 'C' ? 'c-ex' : '';
    inner += `<div class="ex-block ${cls}">${item.ex}</div>`;
  }

  card.insertAdjacentHTML('beforeend', inner);
  card.onclick = () => {
    if (learned.has(item.id)) learned.delete(item.id);
    else learned.add(item.id);
    save();
    render();
  };
  return card;
}

export function render() {
  const grid = document.getElementById('grid');
  grid.replaceChildren();
  let shown = 0;
  DATA.forEach((item) => {
    if (!matches(item)) return;
    shown++;
    grid.appendChild(renderCard(item));
  });
  document.getElementById('shown').textContent = shown;
  document.getElementById('lc').textContent = learned.size;
  document.getElementById('pf').style.width =
    ((learned.size / (DATA.length || 1)) * 100).toFixed(1) + '%';
}

export function initFilters() {
  document.querySelectorAll('[data-lv]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lv = btn.dataset.lv;
      if (activeLevels.has(lv)) {
        activeLevels.delete(lv);
        btn.classList.remove('active');
      } else {
        activeLevels.add(lv);
        btn.classList.add('active');
      }
      render();
    });
  });

  document.querySelectorAll('[data-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('[data-cat]')
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      render();
    });
  });

  document.getElementById('search').addEventListener('input', render);
}
