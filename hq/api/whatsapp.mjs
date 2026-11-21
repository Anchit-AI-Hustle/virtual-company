// Receives the owner's WhatsApp replies from Meta and saves each one to the project's Vercel Blob
// store (whatsapp/<message id>.json, listed in whatsapp/index.json). The watchdog files them on
// the GitHub issue labelled owner-chat, where the agents read them. Only signed requests from
// Meta, and only messages from the owner's own number, are accepted. Settings (Vercel
// environment variables): WHATSAPP_VERIFY_TOKEN, WHATSAPP_APP_SECRET, OWNER_WHATSAPP;
// BLOB_READ_WRITE_TOKEN is set by Vercel.
import crypto from 'node:crypto';

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

const opts = { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60 };

async function save(msgs) {
  const { put, head } = await import('@vercel/blob');
  for (const m of msgs) await put(`whatsapp/${m.id.replace(/[^A-Za-z0-9._=-]/g, '_')}.json`, JSON.stringify(m), opts);
  let index = [];
  try { const h = await head('whatsapp/index.json'); index = await (await fetch(h.url + '?t=' + Date.now())).json(); } catch (e) { index = []; }
  const ids = new Set(index);
  for (const m of msgs) if (!ids.has(m.id)) index.push(m.id);
  await put('whatsapp/index.json', JSON.stringify(index.slice(-500)), opts);
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
    await save(msgs);
  } catch (e) {
    // Meta retries a failed delivery, so report the failure instead of losing the message.
    return new Response('Could not file the message', { status: 500 });
  }
  return new Response('ok');
}
