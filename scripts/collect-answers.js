// Files the owner's answers onto GitHub, where the agents read them. HQ's Approve and Say no and
// the WhatsApp bridge save answers in the project's Vercel Blob store; this runs in the watchdog
// (GitHub Actions, which has a GitHub key) and copies each new one onto its issue exactly once.
//   answers/issue-<n>.json  -> a comment on decision issue n: "approve" or "reject", then the note
//   whatsapp/index.json      -> one comment per new WhatsApp message on the open owner-chat issue
const fs = require('node:fs');
const path = require('node:path');

const MARK = 'Ref ';

async function getJson(fetchImpl, url) {
  const r = await fetchImpl(url + (url.includes('?') ? '&' : '?') + 't=' + Date.now());
  if (r.status === 404 || r.status === 403) return null;
  if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url);
  return r.json();
}

async function collect(root, { fetchImpl = fetch, github, base }) {
  const out = { answers: 0, whatsapp: 0 };
  if (!base) return out;
  const dir = path.join(root, 'company/approvals');
  const issues = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
    .filter((a) => a.issueUrl && ['pending', 'decided'].includes(a.status))
    .map((a) => Number((a.issueUrl.match(/\/issues\/(\d+)/) || [])[1])).filter(Boolean) : [];
  for (const n of issues) {
    const rec = await getJson(fetchImpl, `${base}/answers/issue-${n}.json`);
    if (!rec || rec.issue !== n || !['approve', 'reject'].includes(rec.answer)) continue;
    const comments = await github.comments(n);
    if (comments.some((c) => (c.body || '').includes(MARK + rec.id))) continue;
    await github.comment(n, `${rec.answer}${rec.note ? ': ' + rec.note : ''}\n\nFrom Anchit on HQ, passcode checked, at ${rec.at}. ${MARK}${rec.id}`);
    if (rec.answer === 'reject') await github.reopen(n);
    out.answers++;
  }
  const index = await getJson(fetchImpl, `${base}/whatsapp/index.json`);
  if (Array.isArray(index) && index.length) {
    const n = await github.chatIssue();
    const done = new Set();
    for (const c of await github.comments(n)) { const m = (c.body || '').match(/Ref (\S+)/); if (m) done.add(m[1]); }
    for (const id of index) {
      if (done.has(id)) continue;
      const m = await getJson(fetchImpl, `${base}/whatsapp/${String(id).replace(/[^A-Za-z0-9._=-]/g, '_')}.json`);
      if (!m) continue;
      await github.comment(n, `**From Anchit on WhatsApp** (${m.at}):\n\n${String(m.text).split('\n').map((l) => '> ' + l).join('\n')}\n\n${MARK}${id}`);
      out.whatsapp++;
    }
  }
  return out;
}

function githubClient(repo, token, fetchImpl = fetch) {
  const call = async (p, opt = {}) => {
    const r = await fetchImpl('https://api.github.com/repos/' + repo + p, { ...opt, headers: { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'User-Agent': 'venture-hq-watchdog' } });
    if (!r.ok) throw new Error('GitHub ' + r.status + ' ' + p);
    return r.json();
  };
  return {
    comments: (n) => call(`/issues/${n}/comments?per_page=100`),
    comment: (n, body) => call(`/issues/${n}/comments`, { method: 'POST', body: JSON.stringify({ body }) }),
    reopen: (n) => call(`/issues/${n}`, { method: 'PATCH', body: JSON.stringify({ state: 'open' }) }),
    chatIssue: async () => {
      const open = await call('/issues?state=open&labels=owner-chat&per_page=1');
      if (open.length) return open[0].number;
      return (await call('/issues', { method: 'POST', body: JSON.stringify({ title: 'Owner chat: WhatsApp with Anchit', labels: ['owner-chat'], body: 'Messages Anchit sends to the company on WhatsApp land here. The agents read them each work session and answer through company/outbox.' }) })).number;
    }
  };
}

module.exports = { collect, githubClient };

if (require.main === module) {
  const root = path.join(__dirname, '..');
  const config = JSON.parse(fs.readFileSync(path.join(root, 'company/config.json'), 'utf8'));
  const token = process.env.GITHUB_TOKEN;
  if (!token) { console.log('No GitHub key here; the watchdog on GitHub files answers.'); process.exit(0); }
  collect(root, { github: githubClient(process.env.GITHUB_REPOSITORY || 'Anchit-AI-Hustle/virtual-company', token), base: config.answersBlobBase })
    .then((r) => console.log(`Filed ${r.answers} HQ answers and ${r.whatsapp} WhatsApp messages.`))
    .catch((e) => { console.error(e.message); process.exit(1); });
}
