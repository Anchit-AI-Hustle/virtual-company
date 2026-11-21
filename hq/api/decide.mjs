// Lets the owner answer a decision straight from HQ. The page sends the decision's GitHub issue
// number, approve or reject, an optional note and his HQ passcode. With the right passcode the
// answer is filed on the issue from his own GitHub account, which the agents treat as his word.
// Settings (Vercel environment variables): OWNER_PASSCODE, GITHUB_TOKEN (Issues read and write).
import crypto from 'node:crypto';

const REPO = 'Anchit-AI-Hustle/virtual-company';

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

async function gh(path, opts = {}) {
  const r = await fetch('https://api.github.com/repos/' + REPO + path, {
    ...opts, headers: { Authorization: 'Bearer ' + process.env.GITHUB_TOKEN, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'User-Agent': 'venture-hq-decide' }
  });
  if (!r.ok) throw new Error('GitHub ' + r.status);
  return r.json();
}

const json = (status, obj) => new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export async function POST(request) {
  if (!process.env.OWNER_PASSCODE || !process.env.GITHUB_TOKEN) return json(503, { error: 'not set up' });
  let body; try { body = await request.json(); } catch (e) { return json(400, { error: 'bad request' }); }
  if (!passcodeOk(request.headers.get('x-owner-passcode'), process.env.OWNER_PASSCODE)) {
    await new Promise((r) => setTimeout(r, 800)); // slows down guessing
    return json(401, { error: 'wrong passcode' });
  }
  const bad = validRequest(body);
  if (bad) return json(400, { error: bad });
  try {
    const issue = await gh(`/issues/${body.issue}`);
    const labels = (issue.labels || []).map((l) => l.name);
    if (!labels.includes('needs-owner') && !labels.includes('decided')) return json(400, { error: 'that issue is not a decision' });
    const note = (body.note || '').trim();
    await gh(`/issues/${body.issue}/comments`, { method: 'POST', body: JSON.stringify({ body: `${body.answer}${note ? ': ' + note : ''}\n\n(Sent by Anchit from HQ.)` }) });
    if (issue.state === 'closed' && body.answer === 'reject') await gh(`/issues/${body.issue}`, { method: 'PATCH', body: JSON.stringify({ state: 'open' }) });
    return json(200, { ok: true });
  } catch (e) {
    return json(502, { error: 'could not reach GitHub' });
  }
}
