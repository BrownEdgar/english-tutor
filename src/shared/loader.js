const LOADER_CLASS = 'data-loader';
const HOST_CLASS = 'data-loader-host';

/**
 * Show a loading overlay inside a data container.
 * @param {HTMLElement | string | null} target Element or selector
 * @param {string} [label='Загрузка…']
 */
export function showDataLoader(target, label = 'Загрузка…') {
  const container =
    typeof target === 'string' ? document.querySelector(target) : target;
  if (!container || container.querySelector(`.${LOADER_CLASS}`)) return;

  container.classList.add(HOST_CLASS);
  const el = document.createElement('div');
  el.className = LOADER_CLASS;
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.setAttribute('aria-busy', 'true');
  el.insertAdjacentHTML('beforeend', `
    <div class="data-loader-visual" aria-hidden="true">
      <span class="data-loader-ring"></span>
      <span class="data-loader-ring data-loader-ring--inner"></span>
    </div>
    <span class="data-loader-label">${label}</span>
  `);
  container.appendChild(el);
}

/** @param {HTMLElement | string | null} target */
export function hideDataLoader(target) {
  const container =
    typeof target === 'string' ? document.querySelector(target) : target;
  if (!container) return;
  container.querySelector(`.${LOADER_CLASS}`)?.remove();
  container.classList.remove(HOST_CLASS);
}

/**
 * Run an async task with a loader on the container.
 * @template T
 * @param {HTMLElement | string | null} target
 * @param {() => Promise<T>} task
 * @param {string} [label]
 * @returns {Promise<T>}
 */
export async function withDataLoader(target, task, label) {
  showDataLoader(target, label);
  try {
    return await task();
  } finally {
    hideDataLoader(target);
  }
}
