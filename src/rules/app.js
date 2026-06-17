import { loadSet, saveSet } from '../shared/storage.js';
import { contentService } from '../shared/content-service.js';

const learned = loadSet('rules');
let activeSec = 'all';
let RULES = [];

function save() {
  saveSet('rules', learned);
}

export async function loadRules() {
  RULES = await contentService.fetchRules();
}

function buildCard(rule) {
  const card = document.createElement('div');
  card.className = 'rule card' + (learned.has(rule.id) ? ' learned' : '');
  card.dataset.ruleId = rule.id;
  card.dataset.sec = rule.sec;

  const exHtml = (rule.examples || [])
    .map(
      (e) => `
    <div class="ex-card">
      <div class="ex-en">${e.en}</div>
      <div class="ex-tr">${e.tr}</div>
      ${e.note ? `<div class="ex-note">${e.note}</div>` : ''}
    </div>`
    )
    .join('');

  card.innerHTML = `
    <div class="rule-head">
      <span class="rule-tag" style="background:${rule.color}18;color:${rule.color};border:1px solid ${rule.color}40">${rule.tag}</span>
      <div>
        <div class="rule-name">${rule.name}</div>
        <div class="rule-hint">${rule.hint}</div>
      </div>
    </div>
    <div class="rule-body">
      <div class="explanation">${rule.explanation.replace(/\n/g, '<br>')}</div>
      <div class="examples-grid">${exHtml}</div>
      ${rule.tip ? `<div class="tip-box"><strong>💡 Запомни:</strong><br>${rule.tip.replace(/\n/g, '<br>')}</div>` : ''}
      ${rule.exceptions ? `<div class="exceptions"><b>⚠ Исключения:</b> ${rule.exceptions}</div>` : ''}
      <button class="know-btn btn btn-ghost" data-rule-id="${rule.id}">${learned.has(rule.id) ? '✓ Уже знаю' : '✓ Знаю это правило'}</button>
    </div>`;

  card
    .querySelector('.rule-head')
    .addEventListener('click', () => card.classList.toggle('open'));

  card.querySelector('.know-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const id = e.currentTarget.dataset.ruleId;
    if (learned.has(id)) learned.delete(id);
    else learned.add(id);
    save();
    render();
  });

  return card;
}

export function render() {
  const q = document.getElementById('search').value.toLowerCase();
  const container = document.getElementById('sections');
  container.innerHTML = '';

  const rulesDiv = document.createElement('div');
  rulesDiv.className = 'rules-list';

  let count = 0;
  RULES.forEach((rule) => {
    if (activeSec !== 'all' && rule.sec !== activeSec) return;
    if (q) {
      const blob = [
        rule.name,
        rule.hint,
        rule.explanation,
        rule.tip || '',
        (rule.examples || [])
          .map((e) => e.en + e.tr + (e.note || ''))
          .join(' '),
      ]
        .join(' ')
        .toLowerCase();
      if (!blob.includes(q)) return;
    }
    count++;
    rulesDiv.appendChild(buildCard(rule));
  });

  if (count === 0) {
    rulesDiv.innerHTML = '<div class="empty-state">Ничего не найдено</div>';
  }

  container.appendChild(rulesDiv);

  const lc = document.getElementById('learned-count');
  const tc = document.getElementById('total-count');
  const pf = document.getElementById('pf');
  if (lc) lc.textContent = learned.size;
  if (tc) tc.textContent = RULES.length;
  if (pf)
    pf.style.width =
      ((learned.size / (RULES.length || 1)) * 100).toFixed(1) + '%';
}

export function initNavFilter() {
  document.querySelectorAll('[data-sec]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('[data-sec]')
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeSec = btn.dataset.sec;
      render();
    });
  });
  document.getElementById('search').addEventListener('input', render);
}
