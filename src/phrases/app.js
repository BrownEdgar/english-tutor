import { contentService } from '../shared/content-service.js';
import { api } from '../shared/api.js';

let PHRASES = [];

async function loadPhrases() {
  PHRASES = await contentService.fetchPhrases();
}

function buildTable() {
  const wrap = document.getElementById('ph-table-wrap');

  wrap.innerHTML = `
    <div class="ph-stats">
      <span>Всего: <strong>${PHRASES.length}</strong></span>
    </div>
    <div class="ph-search-wrap">
      <input class="search-input" id="ph-search" placeholder="Поиск по тексту…" autocomplete="off">
    </div>
    <div class="ph-table-scroll">
      <table class="ph-table">
        <thead>
          <tr>
            <th>#</th>
            <th>English</th>
            <th>Հայերեն / Перевод</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="ph-tbody"></tbody>
      </table>
    </div>
  `;

  const tbody = document.getElementById('ph-tbody');

  PHRASES.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.className = 'ph-row';
    tr.dataset.id = item.id;
    tr.innerHTML = `
      <td class="ph-num">${idx + 1}</td>
      <td class="ph-en">${escHtml(item.en)}</td>
      <td class="ph-hy">${escHtml(item.hy)}</td>
      <td class="ph-actions">
        <button class="ph-edit-btn" data-id="${item.id}" aria-label="Редактировать">✏️</button>
        <button class="ph-del-btn" data-id="${item.id}" aria-label="Удалить">✕</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('ph-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    tbody.querySelectorAll('.ph-row').forEach((tr) => {
      tr.style.display =
        q && !tr.textContent.toLowerCase().includes(q) ? 'none' : '';
    });
  });

  tbody.querySelectorAll('.ph-del-btn').forEach((btn) => {
    btn.addEventListener('click', () => handleDelete(btn.dataset.id));
  });

  tbody.querySelectorAll('.ph-edit-btn').forEach((btn) => {
    btn.addEventListener('click', () => handleEditClick(btn.dataset.id));
  });
}

async function handleDelete(id) {
  if (!confirm('Удалить эту фразу?')) return;
  try {
    await api.del(`/api/v1/phrases/${id}`);
    PHRASES = PHRASES.filter((p) => p.id !== id);
    buildTable();
  } catch (err) {
    alert('Ошибка при удалении: ' + err.message);
  }
}

function handleEditClick(id) {
  const phrase = PHRASES.find((p) => p.id === id);
  if (!phrase) return;

  document.getElementById('ph-edit-id').value = phrase.id;
  document.getElementById('ph-en').value = phrase.en;
  document.getElementById('ph-hy').value = phrase.hy;
  document.getElementById('ph-cat').value = phrase.cat;
  document.getElementById('ph-form-title').textContent = 'Редактировать фразу';
  document.getElementById('ph-submit').textContent = 'Сохранить';
  document.getElementById('ph-cancel').style.display = '';

  document
    .getElementById('ph-form')
    .scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetForm() {
  document.getElementById('ph-edit-id').value = '';
  document.getElementById('ph-en').value = '';
  document.getElementById('ph-hy').value = '';
  document.getElementById('ph-cat').value = '';
  document.getElementById('ph-form-title').textContent = 'Добавить фразу';
  document.getElementById('ph-submit').textContent = 'Добавить';
  document.getElementById('ph-cancel').style.display = 'none';
}

function initForm() {
  const form = document.getElementById('ph-form');

  document.getElementById('ph-cancel').addEventListener('click', resetForm);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('ph-edit-id').value;
    const en = document.getElementById('ph-en').value.trim();
    const hy = document.getElementById('ph-hy').value.trim();
    const cat = document.getElementById('ph-cat').value.trim();

    if (!en) return;

    try {
      if (id) {
        const updated = await api.patch(`/api/v1/phrases/${id}`, {
          en,
          hy,
          cat,
        });
        const idx = PHRASES.findIndex((p) => p.id === id);
        if (idx !== -1) PHRASES[idx] = updated;
      } else {
        const created = await api.post('/api/v1/phrases', { en, hy, cat });
        PHRASES.unshift(created);
      }
      resetForm();
      buildTable();
      document
        .getElementById('ph-table-wrap')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      alert('Ошибка: ' + err.message);
    }
  });
}

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function initPage() {
  await loadPhrases();
  buildTable();
  initForm();
}
