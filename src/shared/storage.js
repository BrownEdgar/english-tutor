const KEYS = {
  rules:         'en_app_rules_learned',
  mega:          'en_app_mega_learned',
  phrasal:       'en_app_phrasal_learned',
  top500:        'en_app_top500_learned',
  top500c:       'en_app_top500_custom',
  irregular:     'en_app_irregular_learned',
  sentences:     'en_app_sentences_learned',
  conversations: 'en_app_conversations_practiced',
};

export function loadSet(section) {
  try {
    const raw = JSON.parse(localStorage.getItem(KEYS[section]) || '[]');
    return new Set(Array.isArray(raw) ? raw : []);
  } catch {
    return new Set();
  }
}

export function saveSet(section, set) {
  localStorage.setItem(KEYS[section], JSON.stringify([...set]));
}

export function loadCustomWords() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEYS.top500c) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export function saveCustomWords(list) {
  localStorage.setItem(KEYS.top500c, JSON.stringify(list));
}

export function getProgress(section, total) {
  const set = loadSet(section);
  return { learned: set.size, total };
}
