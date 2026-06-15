import { words } from './data.js';
import {
  loadSet,
  saveSet,
  loadCustomWords,
  saveCustomWords,
} from '../shared/storage.js';
import { renderGrid } from './render.js';

let learnedSet = loadSet('top500');
let currentCat = 'all';

function mergedList() {
  return words.concat(loadCustomWords());
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
      const custom = loadCustomWords();
      const allWords = [...words, ...custom];
      const duplicate = allWords.find(
        (w) => w.en.toLowerCase() === val.toLowerCase()
      );
      enError.textContent = duplicate
        ? `Слово "${val}" уже есть в списке.`
        : '';
    });
    enInput.addEventListener('input', () => {
      enError.textContent = '';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const levelVal = String(fd.get('level') || 'B1').trim();
    const entry = {
      en: String(fd.get('en') || '').trim(),
      ru: String(fd.get('ru') || '').trim(),
      hy: String(fd.get('hy') || '').trim(),
      ex: String(fd.get('ex') || '').trim(),
      exhy: String(fd.get('exhy') || '').trim(),
      cat: levelVal === 'dev' ? 'dev' : 'general',
    };
    if (levelVal !== 'dev') entry.level = levelVal;
    const ipaRaw = String(fd.get('ipa') || '').trim();
    if (ipaRaw) entry.ipa = ipaRaw;
    if (!entry.en || !entry.ru || !entry.ex) {
      alert('Заполните поля: English, перевод, пример.');
      return;
    }
    const custom = loadCustomWords();
    custom.push(entry);
    saveCustomWords(custom);
    form.reset();
    closePanel();
    redraw();
  });
}
