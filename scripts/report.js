// The Management team's morning report, built only from the books so it can never invent a
// number: what each department did in the last 24 hours, money, ideas by stage, decisions
// made, what needs the owner, and platform health. Written to company/reports/<date>.md (India
// date), shown on HQ, and queued for the owner's WhatsApp through company/outbox.
//   node scripts/report.js            write today's report if it does not exist yet
//   node scripts/report.js --if-due   same, but only after 07:45 India time (used by the watchdog)
//   node scripts/report.js --force    rewrite today's report
const fs = require('node:fs');
const path = require('node:path');
const { loadBrain } = require('./brain.js');

const IST = 330 * 60e3;
const DASHES = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']', 'g');
const istDate = (ms) => new Date(ms + IST).toISOString().slice(0, 10);
const clip = (s, n) => { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '...' : s; };
const inr = (n) => 'Rs ' + Math.round(n || 0).toLocaleString('en-IN');

// "4 ideas", "1 idea"; other stages read as states: "2 killed".
const stageCount = (s, n) => `${n} ${s === 'idea' && n !== 1 ? 'ideas' : s}`;

function buildReport(dir, now = Date.now()) {
  const { config, team, ventures, approvals, log } = loadBrain(dir);
  const read = (rel, dflt) => { try { return JSON.parse(fs.readFileSync(path.join(dir, rel), 'utf8')); } catch (e) { return dflt; } };
  const departments = read('company/departments.json', []);
  const ledger = read('company/ledger.json', []);
  const health = read('company/health.json', null);
  const since = now - 24 * 3600e3;
  const recent = log.filter((e) => Date.parse(e.at) >= since && (e.kind === 'done' || e.kind === 'blocked')).sort((a, b) => b.at.localeCompare(a.at));
  const deptOf = new Map(team.map((a) => [a.id, a.department]));
  const nameOf = new Map(team.map((a) => [a.id, a.name]));
  for (const v of ventures) if (v.lead && v.lead.name) nameOf.set('lead-' + v.id, v.lead.name);

  const lines = [`# Morning report, ${istDate(now)}`, '', `Built from the company's books at ${new Date(now + IST).toISOString().slice(11, 16)} India time, covering the last 24 hours.`, ''];

  lines.push('## What each team did');
  for (const d of departments) {
    const items = recent.filter((e) => deptOf.get(e.agent) === d.id).slice(0, 3);
    lines.push(`- ${d.name}: ` + (items.length ? items.map((e) => `${nameOf.get(e.agent) || e.agent}${e.kind === 'blocked' ? ' (blocked)' : ''}: ${clip(e.action, 140)}`).join('; ') : 'no work logged.'));
  }
  const pods = recent.filter((e) => String(e.agent).startsWith('lead-')).slice(0, 3);
  lines.push('- Venture leads: ' + (pods.length ? pods.map((e) => `${nameOf.get(e.agent) || e.agent} on ${e.ventureId}: ${clip(e.action, 140)}`).join('; ') : 'no work logged.'));
  lines.push('');

  const revenue = ledger.filter((x) => x.type === 'revenue').reduce((t, x) => t + (x.amountINR || 0), 0);
  const costs = ledger.filter((x) => x.type === 'cost').reduce((t, x) => t + (x.amountINR || 0), 0);
  const rev24 = ledger.filter((x) => x.type === 'revenue' && Date.parse(x.at || x.date || 0) >= since).reduce((t, x) => t + (x.amountINR || 0), 0);
  lines.push('## Money', `- Revenue to date ${inr(revenue)}, in the last 24 hours ${inr(rev24)}. Costs to date ${inr(costs)}. Net ${inr(revenue - costs)}.`, '');

  const order = config.stages || ['idea', 'validating', 'validated', 'spec', 'building', 'qa', 'live', 'scaling', 'killed'];
  const counts = order.map((s) => [s, ventures.filter((v) => v.stage === s).length]).filter((x) => x[1]);
  lines.push('## Ideas', '- ' + (counts.length ? counts.map(([s, n]) => stageCount(s, n)).join(', ') : 'none yet') + '.');
  const live = ventures.filter((v) => (v.stage === 'live' || v.stage === 'scaling') && v.url);
  lines.push('- Live products: ' + (live.length ? live.map((v) => `${v.title} (${v.url})`).join(', ') : 'none yet') + '.');
  const moved = ventures.filter((v) => v.updatedAt && Date.parse(v.updatedAt) >= since && v.stage !== 'idea').map((v) => `${v.title}: ${v.stage}`);
  if (moved.length) lines.push('- Moved in the last 24 hours: ' + moved.join(', ') + '.');
  lines.push('');

  const decided = approvals.filter((a) => a.status === 'decided' && a.decision && Date.parse(a.decision.decidedAt) >= since);
  lines.push('## Decisions the agents made', ...(decided.length ? decided.map((a) => `- ${a.title}: ${clip(a.decision.choice, 160)}.`) : ['- None in the last 24 hours.']), '');

  const pending = approvals.filter((a) => a.status === 'pending');
  lines.push('## Needs you', ...(pending.length ? pending.map((a) => `- ${a.title}${a.issueUrl ? ' (' + a.issueUrl + ')' : ''}`) : ['- Nothing.']), '');

  lines.push('## Platform', '- ' + (health && health.status === 'problem' ? 'Being fixed: ' + health.problems.map((p) => clip(p.text, 160)).join(' ') : 'All checks passing.'), '');

  const summary = `${istDate(now)}: ${counts.map(([s, n]) => stageCount(s, n)).join(', ') || 'no ideas yet'}; ${live.length} live; revenue ${inr(revenue)}; ${decided.length} ${decided.length === 1 ? 'decision' : 'decisions'} made; ${pending.length} waiting on you. Full report on HQ under Activity.`;
  return { date: istDate(now), text: lines.join('\n').replace(DASHES, '-'), summary: summary.replace(DASHES, '-') };
}

function writeReport(dir, now = Date.now(), { force = false, ifDue = false } = {}) {
  const istMinutes = Math.floor(((now + IST) % 86400e3) / 60e3);
  if (ifDue && istMinutes < 7 * 60 + 45) return null;
  const r = buildReport(dir, now);
  const rdir = path.join(dir, 'company/reports');
  const file = path.join(rdir, r.date + '.md');
  if (fs.existsSync(file) && !force) return null;
  fs.mkdirSync(rdir, { recursive: true });
  fs.writeFileSync(file, r.text + '\n');
  const odir = path.join(dir, 'company/outbox');
  fs.mkdirSync(odir, { recursive: true });
  const out = path.join(odir, `report-${r.date}.json`);
  if (!fs.existsSync(out)) fs.writeFileSync(out, JSON.stringify({ id: 'report-' + r.date, kind: 'text', text: 'Venture HQ morning report, ' + r.summary, status: 'queued', createdAt: new Date(now).toISOString() }, null, 2) + '\n');
  return file;
}

module.exports = { buildReport, writeReport };

if (require.main === module) {
  const root = path.join(__dirname, '..');
  const f = writeReport(root, Date.now(), { force: process.argv.includes('--force'), ifDue: process.argv.includes('--if-due') });
  console.log(f ? 'Wrote ' + path.relative(root, f) : 'No report written (already there, or not yet 07:45 India time).');
}
