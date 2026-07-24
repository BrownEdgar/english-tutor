import { loadSet, saveSet } from '../shared/storage.js';
import { contentService } from '../shared/content-service.js';

/** @type {Set<string>} */
let practiced = loadSet('conversations');

/** List-view conversations (no lines). Full detail fetched on modal open. */
let CONVERSATIONS = [];

let openId = null;
let activeLevel = null;
let practiceLineIndex = 0;

export async function loadConversations() {
  CONVERSATIONS = await contentService.fetchConversations();
}

// ─── Speech ──────────────────────────────────────────────────────────────────

function pickEnVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
  for (const match of [
    (v) => /google us english/i.test(v.name),
    (v) => /samantha/i.test(v.name),
    (v) => /google uk english female/i.test(v.name),
    (v) => /google/i.test(v.name),
  ]) {
    const found = en.find(match);
    if (found) return found;
  }
  return en[0] || null;
}

function speak(text, rate = 0.9) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = rate;
  utter.pitch = 0.95;
  const go = () => {
    const v = pickEnVoice();
    if (v) utter.voice = v;
    window.speechSynthesis.speak(utter);
  };
  if (window.speechSynthesis.getVoices().length) {
    go();
  } else {
    window.speechSynthesis.addEventListener('voiceschanged', go, {
      once: true,
    });
  }
}

// ─── Card grid ────────────────────────────────────────────────────────────────

function levelBadge(level) {
  return `<span class="conv-level-badge conv-level-${level}">${level}</span>`;
}

function renderGrid() {
  const q = (document.getElementById('conv-search')?.value || '').toLowerCase();
  const grid = document.getElementById('conv-grid');
  grid.replaceChildren();

  let visible = 0;
  CONVERSATIONS.forEach((conv) => {
    if (activeLevel && conv.level !== activeLevel) return;
    if (
      q &&
      !conv.title.toLowerCase().includes(q) &&
      !conv.context.toLowerCase().includes(q)
    )
      return;

    visible++;
    const isPracticed = practiced.has(conv.id);

    const card = document.createElement('div');
    card.className = `conv-card${isPracticed ? ' practiced' : ''}`;
    card.insertAdjacentHTML('beforeend', `
      <div class="conv-card-top">
        <span class="conv-icon">${conv.icon}</span>
        ${levelBadge(conv.level)}
        ${isPracticed ? '<span class="conv-done-badge">✓ Done</span>' : ''}
      </div>
      <div class="conv-card-title">${conv.title}</div>
      <div class="conv-card-context">${conv.context}</div>
      <div class="conv-card-meta">
        <span class="conv-tip-label">💡 ${(conv.armenianTipLabel || '').replace(/🇦🇲 /, '')}</span>
      </div>
    `);
    card.addEventListener('click', () => openModal(conv.id));
    grid.appendChild(card);
  });

  if (visible === 0) {
    grid.insertAdjacentHTML('beforeend', '<div class="empty-state">No conversations found</div>');
  }

  updateStats();
}

function updateStats() {
  const total = document.getElementById('conv-total');
  const learnedEl = document.getElementById('conv-practiced');
  const pf = document.getElementById('conv-pf');
  if (total) total.textContent = CONVERSATIONS.length;
  if (learnedEl) learnedEl.textContent = practiced.size;
  if (pf)
    pf.style.width =
      ((practiced.size / (CONVERSATIONS.length || 1)) * 100).toFixed(1) + '%';
}

// ─── Modal ────────────────────────────────────────────────────────────────────

async function openModal(id) {
  const modal = document.getElementById('conv-modal');
  const inner = document.getElementById('conv-modal-inner');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  inner.replaceChildren();
  inner.insertAdjacentHTML(
    'beforeend',
    '<div style="padding:2rem;text-align:center;opacity:.5">Loading…</div>'
  );

  let conv;
  try {
    conv = await contentService.fetchConversation(id);
  } catch (err) {
    inner.replaceChildren();
    inner.insertAdjacentHTML('beforeend', `<div style="padding:2rem;color:red">Error: ${err.message}</div>`);
    return;
  }

  openId = id;
  practiceLineIndex = 0;

  const isPracticed = practiced.has(id);
  const lines = conv.lines || [];

  const linesHtml = lines
    .map(
      (line, i) => `
    <div class="conv-line conv-line-${line.role}" data-i="${i}">
      <div class="conv-line-avatar ${line.role === 'A' ? 'avatar-a' : 'avatar-b'}">${line.name[0]}</div>
      <div class="conv-line-content">
        <div class="conv-line-name">${line.name}</div>
        <div class="conv-line-text">${line.text}</div>
        <div class="conv-line-hy hidden">${line.hy || ''}</div>
        ${line.tip ? `<div class="conv-line-tip">${line.tip}</div>` : ''}
      </div>
      <button class="conv-tts-btn" data-text="${line.text.replace(/"/g, '&quot;')}" aria-label="Listen">🔊</button>
    </div>`
    )
    .join('');

  const pronFocus = conv.pronunciationFocus || [];
  const pronHtml = pronFocus.length
    ? `<details class="conv-pron-details">
        <summary>🗣️ Pronunciation Focus for Armenian Speakers</summary>
        <div class="conv-pron-list">
          ${pronFocus
            .map(
              (p) => `
            <div class="conv-pron-item">
              <span class="conv-pron-sound">${p.sound}</span>
              <em class="conv-pron-example">${p.example}</em>
              <span class="conv-pron-tip">${p.tip}</span>
            </div>`
            )
            .join('')}
        </div>
      </details>`
    : '';

  const phraseHtml = (conv.phraseFocus || []).length
    ? `<div class="conv-phrase-row">
        <span class="conv-phrase-label">Key phrases:</span>
        ${conv.phraseFocus.map((p) => `<span class="conv-phrase-chip">${p}</span>`).join('')}
      </div>`
    : '';

  inner.replaceChildren();
  inner.insertAdjacentHTML('beforeend', `
    <div class="conv-modal-header">
      <div class="conv-modal-title-row">
        <span class="conv-modal-icon">${conv.icon}</span>
        <h2 class="conv-modal-title">${conv.title}</h2>
        ${levelBadge(conv.level)}
      </div>
      <div class="conv-modal-actions">
        <button class="btn btn-ghost" id="btn-translate-toggle">🇦🇲 Show Armenian</button>
        <button class="btn btn-ghost" id="btn-read-all">🔊 Read All</button>
        <button class="btn btn-primary" id="btn-practice-mode">🎯 Practice Mode</button>
      </div>
    </div>

    <div class="conv-modal-context">📍 <em>${conv.context}</em></div>

    ${phraseHtml}

    <div class="conv-lines-wrap" id="conv-lines-wrap">${linesHtml}</div>

    <div class="conv-armenian-tip">
      <div class="conv-tip-title">${conv.armenianTipLabel || ''}</div>
      <p>${conv.armenianTipContent || ''}</p>
    </div>

    ${pronHtml}

    <div class="conv-modal-footer">
      <button class="btn ${isPracticed ? 'btn-ghost' : 'btn-primary'}" id="btn-mark-practiced">
        ${isPracticed ? '✓ Practiced' : '✓ Mark as Practiced'}
      </button>
    </div>

    <div class="conv-practice-overlay hidden" id="conv-practice-overlay">
      <div class="practice-header">
        <span id="practice-progress">Line 1 of ${lines.length}</span>
        <button class="btn btn-ghost" id="btn-exit-practice">✕ Exit</button>
      </div>
      <div class="practice-context">📍 ${conv.context}</div>
      <div class="practice-lines" id="practice-lines"></div>
      <div class="practice-controls">
        <button class="btn btn-ghost" id="btn-practice-tts">🔊 Repeat</button>
        <button class="btn btn-primary" id="btn-next-line">Next Line →</button>
      </div>
    </div>
  `);

  inner.querySelectorAll('.conv-tts-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      speak(btn.dataset.text);
    });
  });

  let hyShown = false;
  document
    .getElementById('btn-translate-toggle')
    .addEventListener('click', () => {
      hyShown = !hyShown;
      inner
        .querySelectorAll('.conv-line-hy')
        .forEach((el) => el.classList.toggle('hidden', !hyShown));
      document.getElementById('btn-translate-toggle').textContent = hyShown
        ? '🇦🇲 Hide Armenian'
        : '🇦🇲 Show Armenian';
    });

  document.getElementById('btn-read-all').addEventListener('click', () => {
    speak(lines.map((l) => l.text).join('. '), 0.85);
  });

  document
    .getElementById('btn-mark-practiced')
    .addEventListener('click', () => {
      if (practiced.has(id)) practiced.delete(id);
      else practiced.add(id);
      saveSet('conversations', practiced);
      renderGrid();
      openModal(id);
    });

  document.getElementById('btn-practice-mode').addEventListener('click', () => {
    startPracticeMode(conv, lines);
  });
}

function startPracticeMode(conv, lines) {
  practiceLineIndex = 0;
  const overlay = document.getElementById('conv-practice-overlay');
  overlay.classList.remove('hidden');
  renderPracticeLine(lines);

  document.getElementById('btn-exit-practice').addEventListener('click', () => {
    overlay.classList.add('hidden');
    window.speechSynthesis?.cancel();
  });

  document.getElementById('btn-next-line').addEventListener('click', () => {
    practiceLineIndex++;
    if (practiceLineIndex >= lines.length) {
      practiceLineIndex = lines.length - 1;
      document.getElementById('btn-next-line').textContent = '✓ Done!';
      document.getElementById('btn-next-line').disabled = true;
    }
    renderPracticeLine(lines);
  });

  document.getElementById('btn-practice-tts').addEventListener('click', () => {
    speak(lines[practiceLineIndex].text);
  });
}

function renderPracticeLine(lines) {
  const line = lines[practiceLineIndex];
  const container = document.getElementById('practice-lines');
  const progress = document.getElementById('practice-progress');

  progress.textContent = `Line ${practiceLineIndex + 1} of ${lines.length}`;
  container.replaceChildren();
  container.insertAdjacentHTML('beforeend', `
    <div class="practice-line-card conv-line-${line.role}">
      <div class="practice-speaker">${line.name}</div>
      <div class="practice-text">${line.text}</div>
      <div class="practice-hy">${line.hy || ''}</div>
    </div>
  `);
  speak(line.text);
}

function closeModal() {
  document.getElementById('conv-modal').classList.remove('open');
  document.body.style.overflow = '';
  window.speechSynthesis?.cancel();
  openId = null;
}

// ─── Filters ──────────────────────────────────────────────────────────────────

export function initFilters() {
  document.getElementById('conv-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-level]');
    if (!btn) return;
    document
      .querySelectorAll('#conv-filters [data-level]')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeLevel = btn.dataset.level === 'all' ? null : btn.dataset.level;
    renderGrid();
  });

  document.getElementById('conv-search').addEventListener('input', renderGrid);
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

export function initConversations() {
  renderGrid();

  const modal = document.getElementById('conv-modal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openId !== null) closeModal();
  });
  document
    .getElementById('btn-close-modal')
    .addEventListener('click', closeModal);
}
