// WhatsApp messages from the company to the owner, through Meta's WhatsApp Cloud API.
// Agents never call this directly: they write company/outbox/<id>.json and the
// .github/workflows/whatsapp.yml job sends it with the secrets held by GitHub.
//   kind "live": a product went live; sent as the approved template venture_live
//   kind "text": a follow up; sent as free text, or as the venture_update template when the
//                24 hour reply window is closed (Meta error 131047)
// Secrets (GitHub Actions): WHATSAPP_TOKEN, WHATSAPP_PHONE_ID, WHATSAPP_WABA_ID, OWNER_WHATSAPP.
// The owner's number is never stored in this public repo.
const fs = require('node:fs');
const path = require('node:path');

const VERSION = process.env.WHATSAPP_API_VERSION || 'v23.0';
const GRAPH = 'https://graph.facebook.com/' + VERSION;

const TEMPLATES = {
  venture_live: {
    category: 'UTILITY',
    body: 'Venture HQ update: {{1}} is now live at {{2}}. Proposed way to find its first users: {{3}}. Reply here with your thoughts.',
    example: ['Seat Planner', 'https://seats.anchit-tandon.com', 'a free seating calculator page for wedding planners searching on Google']
  },
  venture_update: {
    category: 'UTILITY',
    body: 'Venture HQ update: {{1}}. Reply here to answer.',
    example: ['the CEO wants your view on the LinkedIn post for Seat Planner']
  }
};

// Meta rejects template parameters with new lines, tabs or more than 4 spaces in a row.
function param(text, max = 900) {
  return String(text || '').replace(/[\r\n\t]+/g, ' ').replace(/ {4,}/g, '   ').trim().slice(0, max) || '-';
}

function templatePayload(to, name, params) {
  return {
    messaging_product: 'whatsapp', recipient_type: 'individual', to, type: 'template',
    template: { name, language: { code: 'en' }, components: [{ type: 'body', parameters: params.map((p) => ({ type: 'text', text: param(p) })) }] }
  };
}

function textPayload(to, body) {
  return { messaging_product: 'whatsapp', recipient_type: 'individual', to, type: 'text', text: { preview_url: true, body: String(body).slice(0, 4000) } };
}

function payloadFor(item, to) {
  if (item.kind === 'live') return templatePayload(to, 'venture_live', [item.product, item.url, item.plan]);
  if (item.kind === 'text') return textPayload(to, item.text);
  throw new Error('unknown kind ' + item.kind);
}

function configured(env) {
  return !!(env.WHATSAPP_TOKEN && env.WHATSAPP_PHONE_ID && env.OWNER_WHATSAPP);
}

async function post(fetchImpl, env, body) {
  const r = await fetchImpl(`${GRAPH}/${env.WHATSAPP_PHONE_ID}/messages`, {
    method: 'POST', headers: { Authorization: 'Bearer ' + env.WHATSAPP_TOKEN, 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  });
  const j = await r.json().catch(() => ({}));
  return { ok: r.ok, json: j };
}

// Sends every queued outbox item. Returns a summary; writes each item's result back to its file.
async function sendOutbox(root, fetchImpl = fetch, env = process.env) {
  const dir = path.join(root, 'company/outbox');
  if (!fs.existsSync(dir)) return { sent: 0, failed: 0, waiting: 0 };
  const to = String(env.OWNER_WHATSAPP || '').replace(/\D/g, '');
  const out = { sent: 0, failed: 0, waiting: 0 };
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
    const file = path.join(dir, f);
    const item = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (item.status !== 'queued') continue;
    if (!configured(env)) { out.waiting++; continue; }
    let res = await post(fetchImpl, env, payloadFor(item, to));
    const code = res.json && res.json.error && res.json.error.code;
    if (!res.ok && item.kind === 'text' && code === 131047) res = await post(fetchImpl, env, templatePayload(to, 'venture_update', [item.text]));
    if (res.ok) {
      item.status = 'sent'; item.sentAt = new Date().toISOString();
      item.messageId = res.json.messages && res.json.messages[0] && res.json.messages[0].id || null; out.sent++;
    } else {
      item.status = 'failed'; item.failedAt = new Date().toISOString();
      item.error = (res.json.error && (res.json.error.code + ': ' + res.json.error.message)) || 'no answer'; out.failed++;
    }
    fs.writeFileSync(file, JSON.stringify(item, null, 2) + '\n');
  }
  return out;
}

// Creates the two templates on the WhatsApp Business Account when they are missing.
async function ensureTemplates(fetchImpl = fetch, env = process.env) {
  if (!env.WHATSAPP_TOKEN || !env.WHATSAPP_WABA_ID) return { skipped: true };
  const auth = { Authorization: 'Bearer ' + env.WHATSAPP_TOKEN, 'Content-Type': 'application/json' };
  const have = await fetchImpl(`${GRAPH}/${env.WHATSAPP_WABA_ID}/message_templates?fields=name,status&limit=100`, { headers: auth }).then((r) => r.json());
  const names = new Map(((have && have.data) || []).map((t) => [t.name, t.status]));
  const result = {};
  for (const [name, t] of Object.entries(TEMPLATES)) {
    if (names.has(name)) { result[name] = names.get(name); continue; }
    const r = await fetchImpl(`${GRAPH}/${env.WHATSAPP_WABA_ID}/message_templates`, {
      method: 'POST', headers: auth,
      body: JSON.stringify({ name, language: 'en', category: t.category, components: [{ type: 'BODY', text: t.body, example: { body_text: [t.example] } }] })
    }).then((x) => x.json());
    result[name] = r.status || (r.error ? 'error ' + r.error.message : 'unknown');
  }
  return result;
}

module.exports = { TEMPLATES, param, templatePayload, textPayload, payloadFor, configured, sendOutbox, ensureTemplates };

if (require.main === module) {
  const cmd = process.argv[2];
  const root = path.join(__dirname, '..');
  (async () => {
    if (cmd === 'ensure-templates') console.log(JSON.stringify(await ensureTemplates()));
    else if (cmd === 'send') {
      const r = await sendOutbox(root);
      console.log(`sent ${r.sent}, failed ${r.failed}, waiting ${r.waiting}` + (r.waiting ? ' (WhatsApp is not set up yet: secrets missing)' : ''));
    } else { console.error('Usage: node scripts/whatsapp.js send|ensure-templates'); process.exit(1); }
  })().catch((e) => { console.error(e); process.exit(1); });
}
