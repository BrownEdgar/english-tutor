import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { withDataLoader } from '../shared/loader.js';
import { loadMega, render, initFilters } from './app.js';

const dataRoot = document.getElementById('grid');

mountNav({ title: 'A+B+C English 400+', backHref: 'index.html' });
initFilters();
withDataLoader(dataRoot, loadMega).then(render);
