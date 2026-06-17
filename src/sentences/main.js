import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { withDataLoader } from '../shared/loader.js';
import { loadSentences, initPage } from './app.js';

const dataRoot = document.getElementById('sent-table-wrap');

mountNav({ title: '157+ предложений', backHref: 'index.html' });
withDataLoader(dataRoot, loadSentences).then(initPage);
