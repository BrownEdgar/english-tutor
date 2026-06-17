import {
  loadSet,
  saveSet,
  loadCustomWords,
  saveCustomWords,
} from '../shared/storage.js';
import { renderGrid } from './render.js';
import { api } from '../shared/api.js';
import { contentService } from '../shared/content-service.js';
import { getToken } from '../shared/auth.js';

let learnedSet = loadSet('top500');
let currentCat = 'all';
let words = [];
let customWords = loadCustomWords();

function mergedList() {
  return words.concat(customWords);
}

export async function loadWords() {
  const token = getToken();
  const { words: list, customWords: serverCustom } = await contentService.fetchWords();
  words = list;
  if (token && serverCustom.length) {
    customWords = serverCustom;
    saveCustomWords(customWords);
  }
}

export function redraw() {
  renderGrid({
    list: mergedList(),
    learnedSet,
    currentCat,
    onLearnToggle(key) {
      if (learnedSet.has(key)) learnedSet.delete(key);
      else learnedSet.add(key);
      saveSet('top500', learnedSet);
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
}

export function initAddWord() {
  const addBtn = document.getElementById('btn-add-word');
  const panel = document.getElementById('add-word-panel');
  const form = document.getElementById('add-word-form');
  if (!addBtn || !panel || !form) return;

  const closeBtn = document.getElementById('btn-close-panel');

  function openPanel() {
    panel.classList.add('open');
    addBtn.setAttribute('aria-expanded', 'true');
  }
  function closePanel() {
    panel.classList.remove('open');
    addBtn.setAttribute('aria-expanded', 'false');
  }

  addBtn.addEventListener('click', () => {
    panel.classList.contains('open') ? closePanel() : openPanel();
  });

  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  window.addEventListener('auth-change', ({ detail }) => {
    if (!detail.loggedIn) closePanel();
  });

  const enInput = form.querySelector('input[name="en"]');
  const enError = document.getElementById('en-error');
  if (enInput && enError) {
    enInput.addEventListener('blur', () => {
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

    if (!entry.en || !entry.ru || !entry.ex) {
      alert('Заполните поля: English, перевод, пример.');
      return;
    }

    const token = getToken();
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    try {
      if (token) {
        const created = await api.post('/api/v1/words', entry, token);
        customWords.push(created);
        saveCustomWords(customWords);
      } else {
        customWords.push(entry);
        saveCustomWords(customWords);
      }
      form.reset();
      closePanel();
      redraw();
    } catch (err) {
      if (err.status === 409) {
        enError.textContent = `Слово "${entry.en}" уже есть в базе данных.`;
      } else {
        alert(`Ошибка: ${err.message}`);
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
