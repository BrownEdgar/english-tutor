import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { withDataLoader } from '../shared/loader.js';
import { loadPhrasal, render, initFilters } from './app.js';

const dataRoot = document.getElementById('grid');

mountNav({ title: '300+ фраз и блоков', backHref: 'index.html' });
initFilters();
withDataLoader(dataRoot, loadPhrasal).then(render);
