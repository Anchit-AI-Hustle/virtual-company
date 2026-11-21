// Lets the owner answer a decision straight from HQ. The page sends the decision's GitHub issue
// number, approve or reject, an optional note and his HQ passcode. With the right passcode the
// answer is saved to the project's own Vercel Blob store (answers/issue-<n>.json); the watchdog
// files it on the issue within 15 minutes and the agents act on it. No GitHub key is needed.
// Settings (Vercel environment variables): OWNER_PASSCODE; BLOB_READ_WRITE_TOKEN is set by Vercel.
import crypto from 'node:crypto';

export function passcodeOk(given, expected) {
  if (!expected || typeof given !== 'string' || given.length < 8) return false;
  const a = crypto.createHash('sha256').update(given).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export function validRequest(body) {
  if (!body || typeof body !== 'object') return 'bad request';
  if (!Number.isInteger(body.issue) || body.issue < 1) return 'issue must be a number';
  if (!['approve', 'reject'].includes(body.answer)) return 'answer must be approve or reject';
  if (body.note && (typeof body.note !== 'string' || body.note.length > 1000)) return 'note too long';
  return null;
}

const json = (status, obj) => new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export async function POST(request) {
  if (!process.env.OWNER_PASSCODE || !process.env.BLOB_READ_WRITE_TOKEN) return json(503, { error: 'not set up' });
  let body; try { body = await request.json(); } catch (e) { return json(400, { error: 'bad request' }); }
  if (!passcodeOk(request.headers.get('x-owner-passcode'), process.env.OWNER_PASSCODE)) {
    await new Promise((r) => setTimeout(r, 800)); // slows down guessing
    return json(401, { error: 'wrong passcode' });
  }
  const bad = validRequest(body);
  if (bad) return json(400, { error: bad });
  const record = { issue: body.issue, answer: body.answer, note: (body.note || '').trim(), at: new Date().toISOString(), id: crypto.randomUUID() };
  try {
    const { put } = await import('@vercel/blob');
    await put(`answers/issue-${body.issue}.json`, JSON.stringify(record), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60 });
    return json(200, { ok: true });
  } catch (e) {
    return json(502, { error: 'could not save the answer' });
  }
}
