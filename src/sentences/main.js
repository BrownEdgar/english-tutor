import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { initPage } from './app.js';

mountNav({ title: '127+ предложений', backHref: 'index.html' });
initPage();
