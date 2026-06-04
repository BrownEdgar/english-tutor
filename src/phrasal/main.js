import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { render, initFilters } from './app.js';

mountNav({ title: '300+ фраз и блоков', backHref: 'index.html' });
initFilters();
render();
