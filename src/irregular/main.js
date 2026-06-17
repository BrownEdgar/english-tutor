import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { withDataLoader } from '../shared/loader.js';
import { loadVerbs, render, initSearch, initResetBtn } from './app.js';

const dataRoot = document.querySelector('.irreg-table-wrap');

mountNav({ title: 'Irregular Verbs', backHref: 'index.html' });
initSearch();
initResetBtn();
withDataLoader(dataRoot, loadVerbs).then(render);
