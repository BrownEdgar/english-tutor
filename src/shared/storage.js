import { api } from './api.js';
import { getToken } from './auth.js';

const KEYS = {
  rules: 'en_app_rules_learned',
  mega: 'en_app_mega_learned',
  phrasal: 'en_app_phrasal_learned',
  top500: 'en_app_top500_learned',
  top500c: 'en_app_top500_custom',
  irregular: 'en_app_irregular_learned',
  sentences: 'en_app_sentences_learned',
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

  // Fire-and-forget sync to the backend when logged in.
  // We don't await this — the UI updates instantly via localStorage,
  // and the server sync happens in the background.
  const token = getToken();
  if (token) {
    api
      .put(`/api/v1/progress/${section}`, { learnedIds: [...set] }, token)
      .catch(() => {
        // Sync failure is silent — localStorage is the source of truth locally.
        // On next login the user's localStorage and server will be reconciled.
      });
  }
}

// Call this on page load when the user is authenticated to pull their
// server-side progress and merge it with what's in localStorage (union).
export async function syncProgressFromServer(section) {
  const token = getToken();
  if (!token) return;

  try {
    const result = await api.get(`/api/v1/progress/${section}`, token);
    const local = loadSet(section);
    // Union: keep everything from both localStorage and server
    result.learnedIds.forEach((id) => local.add(id));
    localStorage.setItem(KEYS[section], JSON.stringify([...local]));
  } catch {
    // Server unreachable — keep using localStorage only
  }
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
