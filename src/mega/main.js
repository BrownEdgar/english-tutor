import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { render, initFilters } from './app.js';

mountNav({ title: 'A+B+C English 400+', backHref: 'index.html' });
initFilters();
render();
