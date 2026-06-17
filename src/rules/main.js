import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { withDataLoader } from '../shared/loader.js';
import { loadRules, render, initNavFilter } from './app.js';

const dataRoot = document.getElementById('sections');

mountNav({ title: 'English Rules', backHref: 'index.html' });
initNavFilter();
withDataLoader(dataRoot, loadRules).then(render);
