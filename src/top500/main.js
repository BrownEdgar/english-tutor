import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { redraw, initFilters, initAddWord } from './app.js';
import { isLoggedIn } from '../shared/auth.js';

mountNav({ title: 'ТОП 500+ слов', backHref: 'index.html' });
initFilters();
initAddWord();
redraw();

function syncAddWordBtn() {
  const btn = document.getElementById('btn-add-word');
  if (!btn) return;
  btn.hidden = !isLoggedIn();
}

syncAddWordBtn();
window.addEventListener('auth-change', syncAddWordBtn);
