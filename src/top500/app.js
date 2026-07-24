import {
  loadSet,
  saveSet,
  saveLocalOnly,
  syncProgressFromServer,
  loadCustomWords,
  saveCustomWords,
} from '../shared/storage.js';
import { renderGrid } from './render.js';
import { api } from '../shared/api.js';
import { contentService } from '../shared/content-service.js';
import { getToken, isLoggedIn } from '../shared/auth.js';

let learnedSet = loadSet('top500');
let currentCat = 'all';
let viewMode = 'cards';
let sortField = 'en';
let sortDir = 'asc';
let words = [];
let customWords = loadCustomWords();

function mergedList() {
  return words.concat(customWords);
}

export async function loadWords() {
  const token = getToken();
  const { words: list, customWords: serverCustom } =
    await contentService.fetchWords();
  words = list;
  if (token && serverCustom.length) {
    customWords = serverCustom;
    saveCustomWords(customWords);
  }

  // Загружаем learned-состояние с бэкенда и обновляем learnedSet
  if (token) {
    await syncProgressFromServer('top500');
    learnedSet = loadSet('top500');
  }
}

export function redraw() {
  renderGrid({
    list: mergedList(),
    learnedSet,
    currentCat,
    viewMode,
    sortField,
    sortDir,
    isLoggedIn: isLoggedIn(),
    onEdit: openEditPanel,
    async onLearnToggle(key) {
      const token = getToken();
      if (token) {
        try {
          const { learned } = await api.patch(
            '/api/v1/progress/top500/toggle',
            { id: key },
            token
          );
          if (learned) learnedSet.add(key);
          else learnedSet.delete(key);
          saveLocalOnly('top500', learnedSet);
        } catch {
          // сеть недоступна — fallback на локальное переключение
          if (learnedSet.has(key)) learnedSet.delete(key);
          else learnedSet.add(key);
          saveSet('top500', learnedSet);
        }
      } else {
        if (learnedSet.has(key)) learnedSet.delete(key);
        else learnedSet.add(key);
        saveSet('top500', learnedSet);
      }
      redraw();
    },
    onDelete: async (wordId) => {
      const token = getToken();
      if (!token) return;
      try {
        await api.del(`/api/v1/words/${wordId}`, token);
        customWords = customWords.filter((w) => w.id !== wordId);
        saveCustomWords(customWords);
        redraw();
      } catch (err) {
        alert(`Не удалось удалить слово: ${err.message}`);
      }
    },
  });
}

export function initFilters() {
  document.getElementById('filters').addEventListener('click', (e) => {
    const t = e.target;
    if (!t.dataset || !t.dataset.cat) return;
    document
      .querySelectorAll('.filter-btn')
      .forEach((b) => b.classList.remove('active'));
    t.classList.add('active');
    currentCat = t.dataset.cat;
    redraw();
  });

  document.getElementById('search').addEventListener('input', redraw);

  document.querySelectorAll('.view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      viewMode = btn.dataset.view;
      document
        .querySelectorAll('.view-btn')
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      redraw();
    });
  });

  document.getElementById('word-table').tHead.addEventListener('click', (e) => {
    const th = e.target.closest('th[data-sort]');
    if (!th) return;
    const field = th.dataset.sort;
    if (sortField === field) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortField = field;
      sortDir = 'asc';
    }
    redraw();
  });
}

let _editId = null;

export function openEditPanel(word) {
  const panel = document.getElementById('add-word-panel');
  const form = document.getElementById('add-word-form');
  const titleEl = panel?.querySelector('.add-word-title');
  const submitBtn = form?.querySelector('[type="submit"] span');
  const addBtn = document.getElementById('btn-add-word');
  if (!panel || !form) return;

  _editId = word.id ?? null;

  form.querySelector('input[name="en"]').value = word.en || '';
  form.querySelector('input[name="ipa"]').value = word.ipa || '';
  form.querySelector('input[name="ru"]').value = word.ru || '';
  form.querySelector('input[name="hy"]').value = word.hy || '';
  form.querySelector('input[name="ex"]').value = word.ex || '';
  form.querySelector('textarea[name="exhy"]').value = word.exhy || '';
  const levelSelect = form.querySelector('select[name="level"]');
  if (levelSelect) levelSelect.value = word.level || 'B1';

  if (titleEl) titleEl.textContent = '✦ Редактировать слово';
  if (submitBtn) submitBtn.textContent = 'Обновить';

  panel.classList.add('open');
  if (addBtn) addBtn.setAttribute('aria-expanded', 'true');
}

export function initAddWord() {
  const addBtn = document.getElementById('btn-add-word');
  const panel = document.getElementById('add-word-panel');
  const form = document.getElementById('add-word-form');
  if (!addBtn || !panel || !form) return;

  const closeBtn = document.getElementById('btn-close-panel');
  const titleEl = panel.querySelector('.add-word-title');
  const submitBtnSpan = form.querySelector('[type="submit"] span');

  function openPanel() {
    panel.classList.add('open');
    addBtn.setAttribute('aria-expanded', 'true');
  }
  function closePanel() {
    panel.classList.remove('open');
    addBtn.setAttribute('aria-expanded', 'false');
    _editId = null;
    if (titleEl) titleEl.textContent = '✦ Новое слово';
    if (submitBtnSpan) submitBtnSpan.textContent = 'Сохранить';
  }

  addBtn.addEventListener('click', () => {
    if (panel.classList.contains('open')) {
      closePanel();
    } else {
      _editId = null;
      if (titleEl) titleEl.textContent = '✦ Новое слово';
      if (submitBtnSpan) submitBtnSpan.textContent = 'Сохранить';
      form.reset();
      openPanel();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  window.addEventListener('auth-change', ({ detail }) => {
    if (!detail.loggedIn) closePanel();
  });

  const enInput = form.querySelector('input[name="en"]');
  const enError = document.getElementById('en-error');
  if (enInput && enError) {
    enInput.addEventListener('blur', () => {
      if (_editId) return;
      const val = enInput.value.trim();
      if (!val) {
        enError.textContent = '';
        return;
      }
      const all = mergedList();
      const dup = all.find((w) => w.en.toLowerCase() === val.toLowerCase());
      enError.textContent = dup ? `Слово "${val}" уже есть в списке.` : '';
    });
    enInput.addEventListener('input', () => {
      enError.textContent = '';
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const entry = {
      en: String(fd.get('en') || '').trim(),
      ru: String(fd.get('ru') || '').trim(),
      hy: String(fd.get('hy') || '').trim(),
      ex: String(fd.get('ex') || '').trim(),
      exhy: String(fd.get('exhy') || '').trim(),
      ipa: String(fd.get('ipa') || '').trim(),
      level: String(fd.get('level') || 'B1').trim(),
    };

    if (!entry.en) {
      alert('Заполните поле English.');
      return;
    }

    if (!_editId && (!entry.ru || !entry.ex)) {
      alert('Заполните поля: English, перевод, пример.');
      return;
    }

    const token = getToken();
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    try {
      if (_editId) {
        const updated = await api.patch(`/api/v1/words/${_editId}`, entry, token);
        const idx = words.findIndex((w) => w.id === _editId);
        if (idx !== -1) words[idx] = {
          ...words[idx],
          ...updated,
        };
        closePanel();
        redraw();
      } else if (token) {
        const created = await api.post('/api/v1/words', entry, token);
        customWords.push(created);
        saveCustomWords(customWords);
        form.reset();
        closePanel();
        redraw();
      } else {
        customWords.push(entry);
        saveCustomWords(customWords);
        form.reset();
        closePanel();
        redraw();
      }
    } catch (err) {
      if (err.status === 409) {
        if (enError) enError.textContent = `Слово "${entry.en}" уже есть в базе данных.`;
      } else {
        alert(`Ошибка: ${err.message}`);
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
