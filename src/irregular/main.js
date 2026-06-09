import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { render, initSearch, initResetBtn } from './app.js';

mountNav({ title: 'Irregular Verbs', backHref: 'index.html' });
initSearch();
initResetBtn();
render();
