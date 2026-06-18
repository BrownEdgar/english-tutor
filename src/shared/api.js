// Thin API client.
// All calls go to VITE_API_URL (set in .env / .env.local).
// If the env var is missing (e.g. during static-only development), the
// functions below are no-ops or return empty data so the app still works.

const BASE = import.meta.env.VITE_API_URL ?? '';

async function request(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = new Error(res.statusText);
    err.status = res.status;
    // Try to attach the server's error message if available
    try {
      const json = await res.json();
      err.message = json.error ?? res.statusText;
    } catch {
      // response wasn't JSON — keep statusText
    }
    throw err;
  }
  // 204 No Content has no body
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get: (path, token) => request('GET', path, null, token),
  post: (path, body, token) => request('POST', path, body, token),
  put: (path, body, token) => request('PUT', path, body, token),
  patch: (path, body, token) => request('PATCH', path, body, token),
  del: (path, token) => request('DELETE', path, null, token),
};
