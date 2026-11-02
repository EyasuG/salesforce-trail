// Progress sync for Salesforce Trail.
// GET  /progress -> { ts, data } (ts 0 when nothing is saved yet)
// PUT  /progress <- { ts, data }
// Every request needs "Authorization: Bearer <SYNC_KEY>".

const ALLOWED_ORIGINS = [
  'https://eyasug.github.io',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
];
const MAX_BYTES = 1024 * 1024;

function cors(origin) {
  const h = {
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
  if (ALLOWED_ORIGINS.includes(origin)) h['Access-Control-Allow-Origin'] = origin;
  return h;
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...cors(origin) },
  });
}

async function keyMatches(given, expected) {
  if (!given || !expected) return false;
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(given)),
    crypto.subtle.digest('SHA-256', enc.encode(expected)),
  ]);
  return crypto.subtle.timingSafeEqual(a, b);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const { pathname } = new URL(request.url);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
    if (pathname !== '/progress') return json({ error: 'not found' }, 404, origin);

    const auth = request.headers.get('Authorization') || '';
    if (!(await keyMatches(auth.replace(/^Bearer\s+/i, ''), env.SYNC_KEY))) {
      return json({ error: 'unauthorized' }, 401, origin);
    }

    if (request.method === 'GET') {
      const saved = await env.PROGRESS.get('progress', 'json');
      return json(saved || { ts: 0, data: {} }, 200, origin);
    }

    if (request.method === 'PUT') {
      const text = await request.text();
      if (text.length > MAX_BYTES) return json({ error: 'too large' }, 413, origin);
      let body;
      try { body = JSON.parse(text); } catch { return json({ error: 'bad json' }, 400, origin); }
      if (typeof body.ts !== 'number' || typeof body.data !== 'object' || body.data === null) {
        return json({ error: 'expected { ts, data }' }, 400, origin);
      }
      await env.PROGRESS.put('progress', JSON.stringify({ ts: body.ts, data: body.data }));
      return json({ ok: true, ts: body.ts }, 200, origin);
    }

    return json({ error: 'method not allowed' }, 405, origin);
  },
};
