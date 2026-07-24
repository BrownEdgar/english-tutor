import './auth.css';
import { api } from './api.js';

// Token is stored in sessionStorage so it's cleared when the tab closes.
const TOKEN_KEY = 'app_token';

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function isLoggedIn() {
  return !!getToken();
}

function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(
    new CustomEvent('auth-change', { detail: { loggedIn: !!token } })
  );
}

export function logout() {
  setToken(null);
}

// Calls POST /auth/login. Returns true on success, false on wrong credentials.
async function attemptLogin(email, password) {
  try {
    const result = await api.post('/api/v1/auth/login', { email, password });
    setToken(result.token);
    return true;
  } catch (err) {
    return false;
  }
}

/* ── Modal ── */

let overlay = null;

function createModal() {
  overlay = document.createElement('div');
  overlay.className = 'login-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Вход');
  overlay.insertAdjacentHTML('beforeend', `
    <div class="login-modal">
      <button type="button" class="login-modal-close" id="login-close" aria-label="Закрыть">✕</button>
      <div class="login-modal-logo">🔐</div>
      <div class="login-modal-title">Вход</div>
      <div class="login-modal-sub">Только для администратора</div>
      <form class="login-modal-form" id="login-form" novalidate>
        <div class="login-field">
          <label class="login-field-label" for="login-input">Email</label>
          <input id="login-input" class="login-field-input" type="email" autocomplete="username" placeholder="admin@example.com" required />
        </div>
        <div class="login-field">
          <label class="login-field-label" for="pass-input">Пароль</label>
          <input id="pass-input" class="login-field-input" type="password" autocomplete="current-password" placeholder="••••••" required />
        </div>
        <div class="login-error" id="login-error"></div>
        <button type="submit" class="login-btn-submit">Войти</button>
        <button type="button" class="login-btn-cancel" id="login-cancel">Отмена</button>
      </form>
    </div>
  `);
  document.body.appendChild(overlay);

  overlay.querySelector('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = overlay.querySelector('#login-input').value.trim();
    const pass = overlay.querySelector('#pass-input').value;
    const err = overlay.querySelector('#login-error');
    const submitBtn = overlay.querySelector('.login-btn-submit');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Вход...';

    const ok = await attemptLogin(email, pass);

    submitBtn.disabled = false;
    submitBtn.textContent = 'Войти';

    if (ok) {
      closeModal();
    } else {
      err.textContent = 'Неверный email или пароль.';
      overlay.querySelector('#pass-input').value = '';
      overlay.querySelector('#pass-input').focus();
    }
  });

  overlay.querySelector('#login-cancel').addEventListener('click', closeModal);
  overlay.querySelector('#login-close').addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('visible'))
      closeModal();
  });
}

function openModal() {
  if (!overlay) createModal();
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
    overlay.querySelector('#login-input').focus();
  });
}

function closeModal() {
  overlay?.classList.remove('visible');
  const errEl = overlay?.querySelector('#login-error');
  if (errEl) errEl.textContent = '';
}

/* ── Auth button ── */

export function createAuthButton() {
  const btn = document.createElement('button');
  btn.className = 'btn-auth';
  btn.type = 'button';

  function update() {
    btn.replaceChildren();
    if (isLoggedIn()) {
      btn.classList.add('logged-in');
      btn.insertAdjacentHTML('beforeend', `<span>✓</span> Выйти`);
    } else {
      btn.classList.remove('logged-in');
      btn.insertAdjacentHTML('beforeend', `Войти`);
    }
  }

  update();
  btn.addEventListener('click', () => {
    if (isLoggedIn()) logout();
    else openModal();
  });

  window.addEventListener('auth-change', update);
  return btn;
}

/* ── Mount into any nav ── */

export function mountAuthInNav(navEl) {
  if (!navEl) return;
  const btn = createAuthButton();
  navEl.appendChild(btn);
}
