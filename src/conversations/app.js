/**
 * Conversations module — filter, card grid, modal dialogue viewer,
 * TTS, practice mode (sequential reveal), and mark-as-practiced.
 */

import { CONVERSATIONS } from './data.js';
import { loadSet, saveSet } from '../shared/storage.js';

/** @type {Set<string>} */
let practiced = loadSet('conversations');

/** Currently open conversation id. */
let openId = null;

/** Current filter level (null = all). */
let activeLevel = null;

/** Currently visible conversation in practice mode (line index). */
let practiceLineIndex = 0;

// ─── Speech helpers ───────────────────────────────────────────────────────────

/** Pick a good English voice, preferring Google US. */
function pickEnVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
  const preferred = [
    (v) => /google us english/i.test(v.name),
    (v) => /samantha/i.test(v.name),
    (v) => /google uk english female/i.test(v.name),
    (v) => /google/i.test(v.name),
  ];
  for (const match of preferred) {
    const found = en.find(match);
    if (found) return found;
  }
  return en[0] || null;
}

/**
 * Speak text aloud. If voices aren't loaded yet, wait for voiceschanged.
 * @param {string} text
 * @param {number} [rate=0.9]
 */
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
    window.speechSynthesis.addEventListener('voiceschanged', go, { once: true });
  }
}

// ─── Card grid ────────────────────────────────────────────────────────────────

/** Render CEFR level badge. */
function levelBadge(level) {
  return `<span class="conv-level-badge conv-level-${level}">${level}</span>`;
}

function renderGrid() {
  const q = (document.getElementById('conv-search')?.value || '').toLowerCase();
  const grid = document.getElementById('conv-grid');
  grid.innerHTML = '';

  let visible = 0;
  CONVERSATIONS.forEach((conv) => {
    if (activeLevel && conv.level !== activeLevel) return;
    if (
      q &&
      !conv.title.toLowerCase().includes(q) &&
      !conv.context.toLowerCase().includes(q) &&
      !conv.level.toLowerCase().includes(q)
    )
      return;

    visible++;
    const isPracticed = practiced.has(conv.id);

    const card = document.createElement('div');
    card.className = `conv-card${isPracticed ? ' practiced' : ''}`;
    card.innerHTML = `
      <div class="conv-card-top">
        <span class="conv-icon">${conv.icon}</span>
        ${levelBadge(conv.level)}
        ${isPracticed ? '<span class="conv-done-badge">✓ Done</span>' : ''}
      </div>
      <div class="conv-card-title">${conv.title}</div>
      <div class="conv-card-context">${conv.context}</div>
      <div class="conv-card-meta">
        <span>${conv.lines.length} lines</span>
        <span class="conv-tip-label">💡 ${conv.armenianTip.label.replace(/🇦🇲 /, '')}</span>
      </div>
    `;
    card.addEventListener('click', () => openModal(conv.id));
    grid.appendChild(card);
  });

  if (visible === 0) {
    grid.innerHTML = '<div class="empty-state">No conversations found</div>';
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
      ((practiced.size / CONVERSATIONS.length) * 100).toFixed(1) + '%';
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function openModal(id) {
  const conv = CONVERSATIONS.find((c) => c.id === id);
  if (!conv) return;
  openId = id;
  practiceLineIndex = 0;

  const modal = document.getElementById('conv-modal');
  const inner = document.getElementById('conv-modal-inner');

  const isPracticed = practiced.has(id);

  // Build lines HTML
  const linesHtml = conv.lines
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

  // Build pronunciation focus HTML
  const pronHtml =
    conv.pronunciationFocus && conv.pronunciationFocus.length
      ? `<details class="conv-pron-details">
          <summary>🗣️ Pronunciation Focus for Armenian Speakers</summary>
          <div class="conv-pron-list">
            ${conv.pronunciationFocus
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

  // Build phrase focus HTML
  const phraseHtml =
    conv.phraseFocus && conv.phraseFocus.length
      ? `<div class="conv-phrase-row">
          <span class="conv-phrase-label">Key phrases:</span>
          ${conv.phraseFocus.map((p) => `<span class="conv-phrase-chip">${p}</span>`).join('')}
        </div>`
      : '';

  inner.innerHTML = `
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

    <div class="conv-modal-context">
      📍 <em>${conv.context}</em>
    </div>

    ${phraseHtml}

    <div class="conv-lines-wrap" id="conv-lines-wrap">
      ${linesHtml}
    </div>

    <div class="conv-armenian-tip">
      <div class="conv-tip-title">${conv.armenianTip.label}</div>
      <p>${conv.armenianTip.content}</p>
    </div>

    ${pronHtml}

    <div class="conv-modal-footer">
      <button class="btn ${isPracticed ? 'btn-ghost' : 'btn-primary'}" id="btn-mark-practiced">
        ${isPracticed ? '✓ Practiced' : '✓ Mark as Practiced'}
      </button>
    </div>

    <div class="conv-practice-overlay hidden" id="conv-practice-overlay">
      <div class="practice-header">
        <span id="practice-progress">Line 1 of ${conv.lines.length}</span>
        <button class="btn btn-ghost" id="btn-exit-practice">✕ Exit</button>
      </div>
      <div class="practice-context">📍 ${conv.context}</div>
      <div class="practice-lines" id="practice-lines"></div>
      <div class="practice-controls">
        <button class="btn btn-ghost" id="btn-practice-tts">🔊 Repeat</button>
        <button class="btn btn-primary" id="btn-next-line">Next Line →</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // TTS per-line buttons
  inner.querySelectorAll('.conv-tts-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      speak(btn.dataset.text);
    });
  });

  // Armenian translation toggle
  let hyShown = false;
  document.getElementById('btn-translate-toggle').addEventListener('click', () => {
    hyShown = !hyShown;
    inner.querySelectorAll('.conv-line-hy').forEach((el) => {
      el.classList.toggle('hidden', !hyShown);
    });
    document.getElementById('btn-translate-toggle').textContent = hyShown
      ? '🇦🇲 Hide Armenian'
      : '🇦🇲 Show Armenian';
  });

  // Read all
  document.getElementById('btn-read-all').addEventListener('click', () => {
    const fullText = conv.lines.map((l) => l.text).join('. ');
    speak(fullText, 0.85);
  });

  // Mark as practiced
  document.getElementById('btn-mark-practiced').addEventListener('click', () => {
    if (practiced.has(id)) {
      practiced.delete(id);
    } else {
      practiced.add(id);
    }
    saveSet('conversations', practiced);
    renderGrid();
    openModal(id); // re-render modal with updated state
  });

  // Practice mode
  document.getElementById('btn-practice-mode').addEventListener('click', () => {
    startPracticeMode(conv);
  });
}

function startPracticeMode(conv) {
  practiceLineIndex = 0;
  const overlay = document.getElementById('conv-practice-overlay');
  overlay.classList.remove('hidden');
  renderPracticeLine(conv);

  document.getElementById('btn-exit-practice').addEventListener('click', () => {
    overlay.classList.add('hidden');
    window.speechSynthesis?.cancel();
  });

  document.getElementById('btn-next-line').addEventListener('click', () => {
    practiceLineIndex++;
    if (practiceLineIndex >= conv.lines.length) {
      practiceLineIndex = conv.lines.length - 1;
      document.getElementById('btn-next-line').textContent = '✓ Done!';
      document.getElementById('btn-next-line').disabled = true;
    }
    renderPracticeLine(conv);
  });

  document.getElementById('btn-practice-tts').addEventListener('click', () => {
    speak(conv.lines[practiceLineIndex].text);
  });
}

function renderPracticeLine(conv) {
  const line = conv.lines[practiceLineIndex];
  const container = document.getElementById('practice-lines');
  const progress = document.getElementById('practice-progress');

  progress.textContent = `Line ${practiceLineIndex + 1} of ${conv.lines.length}`;

  container.innerHTML = `
    <div class="practice-line-card conv-line-${line.role}">
      <div class="practice-speaker">${line.name}</div>
      <div class="practice-text">${line.text}</div>
      <div class="practice-hy">${line.hy || ''}</div>
    </div>
  `;

  speak(line.text);
}

function closeModal() {
  document.getElementById('conv-modal').classList.remove('open');
  document.body.style.overflow = '';
  window.speechSynthesis?.cancel();
  openId = null;
}

// ─── Filter buttons ───────────────────────────────────────────────────────────

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

  // Close modal on backdrop click
  const modal = document.getElementById('conv-modal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openId !== null) closeModal();
  });

  // Close button
  document.getElementById('btn-close-modal').addEventListener('click', closeModal);
}
