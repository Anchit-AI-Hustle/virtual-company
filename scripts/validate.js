#!/usr/bin/env node
// Validates the company brain. Every cycle, and every venture lead, must leave this passing.
// Usage: node scripts/validate.js   (exit 1 on any error)
const fs = require('node:fs');
const path = require('node:path');
const { loadBrain, leadId, knownAgents } = require('./brain.js');

const isUrl = (s) => typeof s === 'string' && /^https?:\/\/[^\s]+\.[^\s]+/.test(s);
const DASH = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']');
const ACTIVE = ['validating', 'validated', 'spec', 'building', 'qa'];

function textFiles(dir) {
  const out = [];
  const skip = new Set(['node_modules', '.git', '.vercel', 'tests', 'shots']);
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (skip.has(entry.name)) continue;
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.(md|json|html|css|js|txt|yml)$/.test(entry.name)) out.push(p);
    }
  };
  walk(dir);
  return out;
}

function validate(dir) {
  const errors = [];
  const err = (rule, message) => errors.push({ rule, message });
  let brain;
  try { brain = loadBrain(dir); } catch (e) { return [{ rule: 'parse', message: e.message }]; }
  const { config, team, departments, ventures, approvals, ledger, log, activity, reviews } = brain;

  // Folder files must be named after what they hold, so parallel writers never collide.
  const named = (sub, key) => {
    const d = path.join(dir, 'company', sub);
    if (!fs.existsSync(d)) return;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.json'))) {
      const item = JSON.parse(fs.readFileSync(path.join(d, f), 'utf8'));
      if (item[key] + '.json' !== f) err('files', `company/${sub}/${f} must be named ${item[key]}.json`);
    }
  };
  named('ventures', 'id');
  named('approvals', 'id');

  // Team and departments
  const deptIds = new Set(departments.map((d) => d.id));
  const teamIds = team.map((t) => t.id);
  if (JSON.stringify(teamIds) !== JSON.stringify(config.roster)) err('team', 'config.roster must list the team in the same order as company/team.json');
  for (const t of team) {
    if (!t.name || !t.title || !t.trait) err('team', `agent ${t.id}: needs a name, title and trait`);
    if (!deptIds.has(t.department)) err('team', `agent ${t.id}: unknown department ${t.department}`);
    if (!/^#[0-9A-Fa-f]{6}$/.test(t.color || '')) err('team', `agent ${t.id}: color must be a hex value`);
    if (!t.charter || !fs.existsSync(path.join(dir, t.charter))) err('team', `agent ${t.id}: charter file missing`);
    if (t.id.startsWith('lead-')) err('team', `agent ${t.id}: department agent ids cannot start with lead-`);
  }
  for (const d of departments) if (!team.some((t) => t.department === d.id)) err('team', `department ${d.id} has nobody in it`);

  // Ventures and their leads
  const stages = config.stages;
  const at = (s) => stages.indexOf(s);
  const seen = new Set();
  const leadNames = new Map();
  for (const v of ventures) {
    const tag = `venture ${v.id}`;
    if (!/^[a-z][a-z0-9-]{1,30}$/.test(v.id || '') || /-$/.test(v.id || '')) err('id', `${tag}: id must be a lowercase subdomain-safe slug`);
    if (config.reservedSubdomains.includes(v.id)) err('id', `${tag}: subdomain is reserved`);
    if (seen.has(v.id)) err('id', `${tag}: duplicate id`);
    seen.add(v.id);
    for (const field of ['title', 'oneLiner', 'customer', 'revenueModel', 'nextAction', 'createdAt', 'updatedAt']) {
      if (v.stage === 'killed' && field === 'nextAction') continue;
      if (typeof v[field] !== 'string' || !v[field].trim()) err('shape', `${tag}: missing ${field}`);
    }
    if (at(v.stage) === -1) { err('shape', `${tag}: unknown stage ${v.stage}`); continue; }

    const s = v.score || {};
    const parts = ['demand', 'speedToRevenue', 'buildEffort', 'distribution'];
    if (!parts.every((k) => Number.isInteger(s[k]) && s[k] >= 1 && s[k] <= 5)) err('score', `${tag}: each score part must be an integer from 1 to 5`);
    else if (s.total !== parts.reduce((sum, k) => sum + s[k], 0)) err('score', `${tag}: score total does not add up`);

    if (v.lead) {
      if (!v.lead.name || !/^#[0-9A-Fa-f]{6}$/.test(v.lead.color || '')) err('lead', `${tag}: lead needs a name and a hex color`);
      if (!config.leads.some((l) => l.name === v.lead.name)) err('lead', `${tag}: lead ${v.lead.name} is not in config.leads`);
      if (v.stage !== 'killed' && v.lead.name) {
        if (leadNames.has(v.lead.name)) err('lead', `${tag}: lead ${v.lead.name} already leads ${leadNames.get(v.lead.name)}`);
        leadNames.set(v.lead.name, v.id);
      }
    } else if (v.stage !== 'idea' && v.stage !== 'killed') {
      err('lead', `${tag}: every venture past the idea stage has its own lead agent`);
    }

    if (v.stage === 'killed') {
      if (typeof v.killReason !== 'string' || !v.killReason.trim()) err('kill', `${tag}: killed without a reason`);
      continue;
    }
    if (at(v.stage) >= at('validated')) {
      const ev = Array.isArray(v.evidence) ? v.evidence.filter((e) => e && e.claim && isUrl(e.url)) : [];
      if (ev.length < 3) err('evidence', `${tag}: needs 3 pieces of evidence with source links before it counts as validated`);
    }
    if (at(v.stage) >= at('spec')) {
      if (!v.specPath || !fs.existsSync(path.join(dir, v.specPath))) err('spec', `${tag}: spec file missing`);
    }
    // A verdict counts only if it passed, has a time, and the reviewer itself logged it.
    const verdict = (role) => {
      const r = (reviews[v.id] || {})[role];
      if (!r || r.passed !== true || !r.at) return null;
      const proof = log.some((e) => e.agent === role && e.ventureId === v.id && e.kind === 'done');
      return proof ? r : null;
    };
    if (at(v.stage) >= at('building') && !verdict('product')) err('review', `${tag}: cannot be built before the product review of its spec passes`);
    if (at(v.stage) >= at('live')) {
      const liveUrl = `https://${v.id}.${config.domain}`;
      if (v.url !== liveUrl) err('url', `${tag}: live url must be ${liveUrl}`);
      const q = verdict('qa') || {};
      const sizes = Array.isArray(q.viewports) ? q.viewports : [];
      const ok = q.passed === true && q.consoleErrors === 0 && [390, 820, 1440].every((w) => sizes.includes(w)) && q.url === liveUrl;
      if (!ok) err('qa', `${tag}: cannot be live without a passing QA review of ${liveUrl} at 390, 820 and 1440 px with zero console errors, logged by qa`);
      for (const r of config.reviewsToGoLive || []) {
        if (!verdict(r)) err('review', `${tag}: cannot be live without a passing ${r} review, logged by ${r}`);
      }
    }
  }
  for (const [ventureId, roles] of Object.entries(reviews)) {
    if (!ventures.some((v) => v.id === ventureId)) err('review', `reviews for unknown venture ${ventureId}`);
    for (const role of Object.keys(roles)) if (!['qa'].concat(config.reviewsToGoLive || []).includes(role)) err('review', `unknown review role ${role} for ${ventureId}`);
  }

  const active = ventures.filter((v) => ACTIVE.includes(v.stage)).length;
  if (active > config.wip.pods) err('wip', `${active} ventures being worked at once, limit is ${config.wip.pods} pods`);
  const liveTests = ventures.filter((v) => v.stage === 'live').length;
  if (liveTests > config.wip.liveTests) err('wip', `${liveTests} ventures in live test, limit is ${config.wip.liveTests}`);
  const openIdeas = ventures.filter((v) => v.stage === 'idea').length;
  if (openIdeas > config.wip.openIdeas) err('wip', `${openIdeas} open ideas, limit is ${config.wip.openIdeas}`);

  // Approvals
  const approvalIds = new Map();
  for (const a of approvals) {
    const tag = `approval ${a.id}`;
    if (!a.id || approvalIds.has(a.id)) err('approval', `${tag}: missing or duplicate id`);
    approvalIds.set(a.id, a);
    if (!config.approvalTypes.includes(a.type)) err('approval', `${tag}: unknown type ${a.type}`);
    if (!['pending', 'approved', 'rejected'].includes(a.status)) err('approval', `${tag}: unknown status`);
    if (typeof a.ask !== 'string' || !a.ask.trim()) err('approval', `${tag}: missing ask`);
    if (a.status === 'pending') for (const f of ['title', 'why', 'youDo']) if (typeof a[f] !== 'string' || !a[f].trim()) err('approval', `${tag}: a pending decision needs a plain ${f} for the owner`);
    if (a.title && a.title.length > 70) err('approval', `${tag}: title must be 70 characters or fewer`);
    if (a.status !== 'pending' && (a.decidedBy !== 'owner' || !a.decidedAt)) err('approval', `${tag}: only the owner can decide an approval`);
    if (a.status === 'pending' && (a.decidedBy || a.decidedAt)) err('approval', `${tag}: pending approval cannot carry a decision`);
  }

  // Ledger
  const spentByApproval = new Map();
  for (const [i, l] of ledger.entries()) {
    const tag = `ledger row ${i + 1}`;
    if (!['revenue', 'cost'].includes(l.type)) { err('ledger', `${tag}: type must be revenue or cost`); continue; }
    if (typeof l.amountINR !== 'number' || !(l.amountINR > 0)) err('ledger', `${tag}: amountINR must be a positive number`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(l.date || '')) err('ledger', `${tag}: date must be YYYY-MM-DD`);
    if (typeof l.source !== 'string' || !l.source.trim()) err('ledger', `${tag}: every amount needs a source, never an estimate`);
    if (l.type === 'cost') {
      const a = approvalIds.get(l.approvalId);
      if (!a || a.status !== 'approved' || a.type !== 'money') err('ledger', `${tag}: cost has no owner-approved money request`);
      else spentByApproval.set(a.id, (spentByApproval.get(a.id) || 0) + l.amountINR);
    }
  }
  for (const [id, spent] of spentByApproval) {
    const cap = approvalIds.get(id).costINR;
    if (typeof cap !== 'number' || spent > cap) err('ledger', `approval ${id}: spent ${spent} against an approved ${cap}`);
  }

  // Activity and log
  const agents = knownAgents(brain);
  for (const [agent, a] of Object.entries(activity)) {
    if (!agents.has(agent)) err('activity', `unknown agent ${agent}`);
    if (!['working', 'done', 'blocked', 'idle'].includes(a.state)) err('activity', `agent ${agent}: unknown state ${a.state}`);
    if (!a.since) err('activity', `agent ${agent}: needs since`);
  }
  for (const entry of log) {
    if (!agents.has(entry.agent)) err('log', `log line by unknown agent ${entry.agent}`);
    if (!entry.at || !entry.action) err('log', `log line by ${entry.agent}: needs at and action`);
  }
  const logDir = path.join(dir, 'company', 'log');
  if (fs.existsSync(logDir)) {
    for (const f of fs.readdirSync(logDir).filter((x) => x.endsWith('.json'))) {
      const parts = f.replace(/\.json$/, '').split('.');
      if (parts.length !== 2) { err('log', `company/log/${f} must be named <agent>.<venture or company>.json`); continue; }
      const [agent, scope] = parts;
      if (!agents.has(agent)) err('log', `company/log/${f} belongs to unknown agent ${agent}`);
      const lines = JSON.parse(fs.readFileSync(path.join(logDir, f), 'utf8'));
      if (lines.some((e) => e.agent !== agent || (e.ventureId || 'company') !== scope)) err('log', `company/log/${f} holds lines for another agent or venture`);
    }
  }

  for (const file of textFiles(dir)) {
    if (DASH.test(fs.readFileSync(file, 'utf8'))) err('dash', `${path.relative(dir, file)}: contains an em or en dash, use a hyphen`);
  }
  return errors;
}

module.exports = { validate, leadId };

if (require.main === module) {
  const errors = validate(path.join(__dirname, '..'));
  if (errors.length) {
    for (const e of errors) console.error(`FAIL [${e.rule}] ${e.message}`);
    process.exit(1);
  }
  console.log('Company state is valid.');
}
