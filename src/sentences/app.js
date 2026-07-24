import { contentService } from '../shared/content-service.js';

const STORAGE_KEY = 'en_app_sentences_custom';
let SENTENCES = [];

export async function loadSentences() {
  SENTENCES = await contentService.fetchSentences();
}

function loadCustom() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveCustom(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function applyHighlights(text, words) {
  if (!words || !words.length) return text;
  let result = text;
  [...words]
    .sort((a, b) => {
      const wa = Array.isArray(a) ? a[0] : a;
      const wb = Array.isArray(b) ? b[0] : b;
      return wb.length - wa.length;
    })
    .forEach((entry) => {
      const word = Array.isArray(entry) ? entry[0] : entry;
      const hint = Array.isArray(entry) ? entry[1] : '';
      const w = word.trim();
      if (!w) return;
      const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const titleAttr = hint ? ` title="${hint}"` : '';
      result = result.replace(
        new RegExp(`(${escaped})`, 'gi'),
        `<span class="sent-hl"${titleAttr}>$1</span>`
      );
    });
  return result;
}

function parseHighlights(raw) {
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildTable(customList) {
  const wrap = document.getElementById('sent-table-wrap');
  const allCount = SENTENCES.length + customList.length;

  wrap.replaceChildren();
  wrap.insertAdjacentHTML('beforeend', `
    <div class="sent-stats">
      <span>Всего: <strong>${allCount}</strong></span>
      ${customList.length ? `<span>· добавлено вами: <strong>${customList.length}</strong></span>` : ''}
    </div>
    <div class="sent-search-wrap">
      <input class="search-input" id="sent-search" placeholder="Поиск по тексту…" autocomplete="off">
    </div>
    <div class="sent-table-scroll">
      <table class="sent-table">
        <thead>
          <tr>
            <th>#</th>
            <th>English</th>
            <th>Перевод / Translation</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="sent-tbody"></tbody>
      </table>
    </div>
  `);

  const tbody = document.getElementById('sent-tbody');

  SENTENCES.forEach((item) => {
    const tr = document.createElement('tr');
    tr.className = 'sent-row';
    tr.insertAdjacentHTML('beforeend', `
      <td class="sent-num">${item.id}</td>
      <td class="sent-en">${applyHighlights(item.en, item.hl || [])}</td>
      <td class="sent-am">${item.am || ''}</td>
      <td></td>
    `);
    tbody.appendChild(tr);
  });

  customList.forEach((item, localIdx) => {
    const tr = document.createElement('tr');
    tr.className = 'sent-row sent-row--custom';
    tr.insertAdjacentHTML('beforeend', `
      <td class="sent-num">${item.id}</td>
      <td class="sent-en">${applyHighlights(item.en, item.hl || [])}</td>
      <td class="sent-am">${item.am || ''}</td>
      <td class="sent-del">
        <button class="sent-del-btn" data-idx="${localIdx}" aria-label="Удалить">✕</button>
      </td>
    `);
    tbody.appendChild(tr);
  });

  document.getElementById('sent-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    tbody.querySelectorAll('.sent-row').forEach((tr) => {
      tr.style.display =
        q && !tr.textContent.toLowerCase().includes(q) ? 'none' : '';
    });
  });

  tbody.querySelectorAll('.sent-del-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const updated = loadCustom();
      updated.splice(parseInt(btn.dataset.idx, 10), 1);
      saveCustom(updated);
      buildTable(updated);
    });
  });
}

function initForm() {
  const form = document.getElementById('sent-form');
  const enInput = document.getElementById('sent-en');
  const hlInput = document.getElementById('sent-hl');
  const amInput = document.getElementById('sent-am');
  const preview = document.getElementById('sent-preview');

  function updatePreview() {
    const text = enInput.value.trim();
    const hls = parseHighlights(hlInput.value);
    preview.replaceChildren();
    preview.insertAdjacentHTML(
      'beforeend',
      text
        ? applyHighlights(text, hls)
        : '<span class="sent-preview-hint">Предварительный просмотр появится здесь…</span>'
    );
  }

  enInput.addEventListener('input', updatePreview);
  hlInput.addEventListener('input', updatePreview);
  updatePreview();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const en = enInput.value.trim();
    if (!en) return;

    const custom = loadCustom();
    const maxId = Math.max(
      ...SENTENCES.map((s) => s.id),
      ...custom.map((s) => s.id || 0),
      0
    );

    custom.push({
      id: maxId + 1,
      en,
      am: amInput.value.trim(),
      hl: parseHighlights(hlInput.value),
    });
    saveCustom(custom);

    enInput.value = '';
    hlInput.value = '';
    amInput.value = '';
    updatePreview();

    buildTable(custom);
    document
      .getElementById('sent-table-wrap')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

export function initPage() {
  buildTable(loadCustom());
  initForm();
}
