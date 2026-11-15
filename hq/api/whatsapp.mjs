// Receives the owner's WhatsApp replies from Meta and files them where the agents read them:
// one GitHub issue labelled owner-chat. Only signed requests from Meta, and only messages from
// the owner's own number, are accepted. Settings (Vercel environment variables):
// WHATSAPP_VERIFY_TOKEN, WHATSAPP_APP_SECRET, OWNER_WHATSAPP, GITHUB_TOKEN.
import crypto from 'node:crypto';

const REPO = 'Anchit-AI-Hustle/virtual-company';
const LABEL = 'owner-chat';
const TITLE = 'Owner chat: WhatsApp with Anchit';

export function verifySignature(raw, header, secret) {
  if (!secret || !header || !header.startsWith('sha256=')) return false;
  const want = crypto.createHmac('sha256', secret).update(raw, 'utf8').digest('hex');
  const got = header.slice(7);
  return got.length === want.length && crypto.timingSafeEqual(Buffer.from(got, 'hex'), Buffer.from(want, 'hex'));
}

export function ownerMessages(payload, ownerNumber) {
  const owner = String(ownerNumber || '').replace(/\D/g, '');
  const out = [];
  if (!owner) return out;
  for (const e of (payload && payload.entry) || []) for (const c of e.changes || []) {
    for (const m of (c.value && c.value.messages) || []) {
      if (String(m.from).replace(/\D/g, '') !== owner) continue;
      const text = m.type === 'text' ? m.text && m.text.body
        : m.type === 'button' ? m.button && m.button.text
        : m.type === 'interactive' ? ((m.interactive && (m.interactive.button_reply || m.interactive.list_reply)) || {}).title
        : `(${m.type} message)`;
      out.push({ id: m.id, at: new Date(Number(m.timestamp) * 1000).toISOString(), text: String(text || '').slice(0, 4000) });
    }
  }
  return out;
}

async function gh(path, opts = {}) {
  const r = await fetch('https://api.github.com/repos/' + REPO + path, {
    ...opts, headers: { Authorization: 'Bearer ' + process.env.GITHUB_TOKEN, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'User-Agent': 'venture-hq-whatsapp' }
  });
  if (!r.ok) throw new Error('GitHub ' + r.status);
  return r.json();
}

async function chatIssue() {
  const open = await gh(`/issues?state=open&labels=${LABEL}&per_page=1`);
  if (open.length) return open[0].number;
  const made = await gh('/issues', { method: 'POST', body: JSON.stringify({ title: TITLE, labels: [LABEL], body: 'Messages Anchit sends to the company on WhatsApp land here. The agents read them each work session and answer through company/outbox.' }) });
  return made.number;
}

export async function GET(request) {
  const u = new URL(request.url);
  const token = process.env.WHATSAPP_VERIFY_TOKEN;
  if (token && u.searchParams.get('hub.mode') === 'subscribe' && u.searchParams.get('hub.verify_token') === token) {
    return new Response(u.searchParams.get('hub.challenge') || '', { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

export async function POST(request) {
  const raw = await request.text();
  if (!verifySignature(raw, request.headers.get('x-hub-signature-256'), process.env.WHATSAPP_APP_SECRET)) return new Response('Bad signature', { status: 401 });
  let payload; try { payload = JSON.parse(raw); } catch (e) { return new Response('ok'); }
  const msgs = ownerMessages(payload, process.env.OWNER_WHATSAPP);
  if (!msgs.length) return new Response('ok');
  try {
    const n = await chatIssue();
    for (const m of msgs) await gh(`/issues/${n}/comments`, { method: 'POST', body: JSON.stringify({ body: `**From Anchit on WhatsApp** (${m.at}, message ${m.id}):\n\n${m.text.split('\n').map((l) => '> ' + l).join('\n')}` }) });
  } catch (e) {
    // Meta retries a failed delivery, so report the failure instead of losing the message.
    return new Response('Could not file the message', { status: 500 });
  }
  return new Response('ok');
}
