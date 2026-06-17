import { loadSet, saveSet } from '../shared/storage.js';
import { contentService } from '../shared/content-service.js';

let learned = loadSet('phrasal');
let currentCat = 'all';
let data = [];

function save() {
  saveSet('phrasal', learned);
}

export async function loadPhrasal() {
  data = await contentService.fetchPhrasal();
}

export function render() {
  const q = document.getElementById('search').value.toLowerCase();
  const grid = document.getElementById('grid');
  grid.replaceChildren();

  data.forEach((item) => {
    if (currentCat !== 'all' && item.cat !== currentCat) return;
    const searchText =
      item.base +
      (item.forms ? item.forms.map((f) => f.w + f.m).join(' ') : item.ex || '');
    if (q && !searchText.toLowerCase().includes(q)) return;

    const card = document.createElement('div');
    card.className =
      'card phrasal-card' + (learned.has(item.id) ? ' learned' : '');
    card.dataset.cat = item.cat;

    const catNames = {
      motion: 'движение',
      object: 'предметы',
      relation: 'люди',
      emotion: 'эмоции',
      daily: 'быт',
      talk: 'речь',
    };
    const badgeLabel = catNames[item.cat] || item.cat;

    const formsBlock =
      item.type === 'phrasal'
        ? `<div class="phrasal-group">${(item.forms || [])
            .map(
              (f) =>
                `<div class="phrasal-row">
          <span class="ph-word">${f.w}</span>
          <span class="ph-meaning">— ${f.m}</span>
          <span class="ph-example">${f.ex}</span>
        </div>`
            )
            .join('')}</div>`
        : `<div class="example-block">${item.ex || ''}</div>`;

    card.insertAdjacentHTML(
      'beforeend',
      `
      <div class="cat-label badge">${badgeLabel}</div>
      <div class="word-main">${item.base}</div>
      <div class="word-ru">${item.base_ru}</div>${formsBlock}`
    );

    card.onclick = () => {
      if (learned.has(item.id)) learned.delete(item.id);
      else learned.add(item.id);
      save();
      render();
    };
    grid.appendChild(card);
  });

  document.getElementById('lc').textContent = learned.size;
  document.getElementById('tc').textContent = data.length;
  document.getElementById('pf').style.width =
    (data.length ? (learned.size / data.length) * 100 : 0) + '%';
}

export function initFilters() {
  document.getElementById('search').addEventListener('input', render);
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.filter-btn')
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      render();
    });
  });
}
