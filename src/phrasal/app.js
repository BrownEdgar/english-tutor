import { data } from './data.js';
import { loadSet, saveSet } from '../shared/storage.js';

let learned = loadSet('phrasal');
let currentCat = 'all';

function save() {
  saveSet('phrasal', learned);
}

export function render() {
  const q = document.getElementById('search').value.toLowerCase();
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  let shown = 0;

  data.forEach((item, i) => {
    if (currentCat !== 'all' && item.cat !== currentCat) return;
    const searchText =
      item.base +
      (item.forms ? item.forms.map((f) => f.w + f.m).join(' ') : item.ex || '');
    if (q && !searchText.toLowerCase().includes(q)) return;
    shown++;

    const card = document.createElement('div');
    card.className = 'card phrasal-card' + (learned.has(i) ? ' learned' : '');
    card.dataset.cat = item.cat;

    const catNames = {
      motion: 'движение',
      object: 'предметы',
      relation: 'люди',
      emotion: 'эмоции',
      daily: 'быт',
      talk: 'речь',
    };
    let inner = `<div class="cat-label badge">${catNames[item.cat] || item.cat}</div>
      <div class="word-main">${item.base}</div>
      <div class="word-ru">${item.base_ru}</div>`;

    if (item.type === 'phrasal') {
      inner += `<div class="phrasal-group">`;
      item.forms.forEach((f) => {
        inner += `<div class="phrasal-row">
          <span class="ph-word">${f.w}</span>
          <span class="ph-meaning">— ${f.m}</span>
          <span class="ph-example">${f.ex}</span>
        </div>`;
      });
      inner += `</div>`;
    } else {
      inner += `<div class="example-block">${item.ex}</div>`;
    }

    card.innerHTML = inner;
    card.onclick = () => {
      if (learned.has(i)) learned.delete(i);
      else learned.add(i);
      save();
      render();
    };
    grid.appendChild(card);
  });

  document.getElementById('lc').textContent = learned.size;
  document.getElementById('tc').textContent = data.length;
  document.getElementById('pf').style.width =
    (learned.size / data.length) * 100 + '%';
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
