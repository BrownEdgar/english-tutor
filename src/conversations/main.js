import '../shared/design-system.css';
import './styles.css';
import { mountNav } from '../shared/ui.js';
import { initConversations, initFilters } from './app.js';

mountNav({ title: 'Conversations', backHref: 'index.html' });
initFilters();
initConversations();
