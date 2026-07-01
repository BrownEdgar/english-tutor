import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { withDataLoader } from '../shared/loader.js';
import { loadWords, redraw, initFilters, initAddWord } from './app.js';
import { isLoggedIn } from '../shared/auth.js';

const dataRoot = document.getElementById('grid');

mountNav({ title: 'ТОП 1000+ слов', backHref: 'index.html' });
initFilters();
initAddWord();
withDataLoader(dataRoot, loadWords).then(redraw);

function syncAddWordBtn() {
  const btn = document.getElementById('btn-add-word');
  if (!btn) return;
  btn.hidden = !isLoggedIn();
}

syncAddWordBtn();
window.addEventListener('auth-change', () => {
  syncAddWordBtn();
  withDataLoader(dataRoot, loadWords).then(redraw);
});
