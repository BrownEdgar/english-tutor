let dialogEl = null;

function ensureDialog() {
  if (dialogEl) return dialogEl;

  dialogEl = document.createElement('dialog');
  dialogEl.className = 'confirm-dialog';
  dialogEl.innerHTML = `
    <form method="dialog" class="confirm-dialog-form">
      <p class="confirm-dialog-message"></p>
      <div class="confirm-dialog-actions">
        <button type="submit" value="cancel" class="confirm-dialog-btn confirm-dialog-btn--cancel">Отмена</button>
        <button type="submit" value="confirm" class="confirm-dialog-btn confirm-dialog-btn--confirm">Удалить</button>
      </div>
    </form>
  `;
  document.body.appendChild(dialogEl);
  return dialogEl;
}

/** Promise-based replacement for window.confirm(), rendered as a <dialog>. */
export function confirmDialog(message) {
  const dialog = ensureDialog();
  dialog.querySelector('.confirm-dialog-message').textContent = message;

  return new Promise((resolve) => {
    const onClose = () => {
      dialog.removeEventListener('close', onClose);
      resolve(dialog.returnValue === 'confirm');
    };
    dialog.addEventListener('close', onClose);
    dialog.showModal();
  });
}
