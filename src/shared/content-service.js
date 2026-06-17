import { api } from './api.js';
import { getToken } from './auth.js';

/**
 * Normalizes API list responses (`{ data: T[] }` or a bare array).
 * @template T
 * @param {unknown} res
 * @returns {T[]}
 */
function listFromResponse(res) {
  if (Array.isArray(res)) return res;
  if (res && typeof res === 'object' && Array.isArray(res.data)) return res.data;
  return [];
}

/**
 * Central access layer for learning content loaded from the backend API.
 * Module apps call these methods instead of duplicating fetch paths and parsing.
 */
export class ContentService {
  /**
   * @param {string} path
   * @param {Record<string, string | number>} [params]
   * @returns {Promise<unknown[]>}
   */
  async #fetchList(path, params = {}) {
    const qs = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v != null && v !== '')
        .map(([k, v]) => [k, String(v)])
    ).toString();
    const url = qs ? `${path}?${qs}` : path;
    try {
      const res = await api.get(url);
      return listFromResponse(res);
    } catch (err) {
      console.error(`Failed to load ${path}:`, err);
      return [];
    }
  }

  /** @param {number} [limit=500] */
  fetchSentences(limit = 500) {
    return this.#fetchList('/api/v1/sentences', { limit });
  }

  /** @param {number} [limit=200] */
  fetchRules(limit = 200) {
    return this.#fetchList('/api/v1/rules', { limit });
  }

  /** @param {number} [limit=500] */
  fetchPhrasal(limit = 500) {
    return this.#fetchList('/api/v1/phrasal', { limit });
  }

  /** @param {number} [limit=500] */
  fetchMega(limit = 500) {
    return this.#fetchList('/api/v1/mega', { limit });
  }

  /** @param {number} [limit=500] */
  fetchIrregularVerbs(limit = 500) {
    return this.#fetchList('/api/v1/irregular-verbs', { limit });
  }

  fetchConversations() {
    return this.#fetchList('/api/v1/conversations');
  }

  /**
   * Full conversation with lines (for modal). Throws on HTTP error.
   * @param {string} id
   */
  fetchConversation(id) {
    return api.get(`/api/v1/conversations/${id}`);
  }

  /**
   * Top 500 words; merges server custom words when authenticated.
   * @param {number} [limit=1000]
   * @returns {Promise<{ words: unknown[]; customWords: unknown[] }>}
   */
  async fetchWords(limit = 1000) {
    const token = getToken();
    try {
      const res = await api.get(`/api/v1/words?limit=${limit}`, token || undefined);
      return {
        words: listFromResponse(res),
        customWords: Array.isArray(res?.customWords) ? res.customWords : [],
      };
    } catch (err) {
      console.error('Failed to load words:', err);
      return { words: [], customWords: [] };
    }
  }
}

/** Shared singleton for app modules. */
export const contentService = new ContentService();
