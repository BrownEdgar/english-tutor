import '../shared/design-system.css';
import './styles.css';
import { initTheme, toggleTheme } from '../shared/theme.js';
import { initPage } from './app.js';

initTheme();

const themeBtn = document.createElement('button');
themeBtn.className = 'theme-btn';
themeBtn.setAttribute('aria-label', 'Toggle theme');
themeBtn.textContent = '🌙';

const nav = document.createElement('nav');
nav.className = 'home-nav';
nav.insertAdjacentHTML('beforeend', '<a class="home-nav-logo" href="/">EN ✦</a>');
nav.appendChild(themeBtn);
document.body.prepend(nav);

themeBtn.addEventListener('click', toggleTheme);

initPage();
