import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { redraw, initFilters, initAddWord } from './app.js';

mountNav({ title: 'ТОП 500+ слов', backHref: 'index.html' });
initFilters();
initAddWord();
redraw();
