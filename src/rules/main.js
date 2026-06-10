import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { render, initNavFilter } from './app.js';

mountNav({
  title: 'English Rules',
  backHref: 'index.html',
});
initNavFilter();
render();
