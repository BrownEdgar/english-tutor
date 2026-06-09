import './auth.css';

const VALID_LOGIN = import.meta.env.VITE_ADMIN_LOGIN;
const VALID_PASS = import.meta.env.VITE_ADMIN_PASSWORD;
const SESSION_KEY = 'app_auth';

export function isLoggedIn() {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

function setLoggedIn(value) {
  if (value) sessionStorage.setItem(SESSION_KEY, '1');
  else sessionStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent('auth-change', { detail: { loggedIn: value } }));
}

export function logout() {
  setLoggedIn(false);
}

function attemptLogin(login, pass) {
  if (login === VALID_LOGIN && pass === VALID_PASS) {
    setLoggedIn(true);
    return true;
  }
  return false;
}

/* ── Modal ── */

let overlay = null;

function createModal() {
  overlay = document.createElement('div');
  overlay.className = 'login-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Вход');
  overlay.innerHTML = `
    <div class="login-modal">
      <div class="login-modal-logo">🔐</div>
      <div class="login-modal-title">Вход</div>
      <div class="login-modal-sub">Только для администратора</div>
      <form class="login-modal-form" id="login-form" novalidate>
        <div class="login-field">
          <label class="login-field-label" for="login-input">Логин</label>
          <input id="login-input" class="login-field-input" type="text" autocomplete="username" placeholder="admin" required />
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
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const login = overlay.querySelector('#login-input').value.trim();
    const pass = overlay.querySelector('#pass-input').value;
    const err = overlay.querySelector('#login-error');

    if (attemptLogin(login, pass)) {
      closeModal();
    } else {
      err.textContent = 'Неверный логин или пароль.';
      overlay.querySelector('#pass-input').value = '';
      overlay.querySelector('#pass-input').focus();
    }
  });

  overlay.querySelector('#login-cancel').addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('visible')) closeModal();
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
  overlay?.querySelector('#login-error') && (overlay.querySelector('#login-error').textContent = '');
}

/* ── Auth button ── */

export function createAuthButton() {
  const btn = document.createElement('button');
  btn.className = 'btn-auth';
  btn.type = 'button';

  function update() {
    if (isLoggedIn()) {
      btn.classList.add('logged-in');
      btn.innerHTML = `<span>✓</span> Выйти`;
    } else {
      btn.classList.remove('logged-in');
      btn.innerHTML = `Войти`;
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
