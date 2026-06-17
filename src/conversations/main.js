import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { withDataLoader } from '../shared/loader.js';
import { loadConversations, initConversations, initFilters } from './app.js';

const dataRoot = document.getElementById('conv-grid');

mountNav({ title: 'Conversations', backHref: 'index.html' });
withDataLoader(dataRoot, loadConversations).then(() => {
  initFilters();
  initConversations();
});
