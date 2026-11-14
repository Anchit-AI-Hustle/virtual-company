#!/usr/bin/env node
// Validates the company brain. Every cycle must end with this passing.
// Usage: node scripts/validate.js   (exit 1 on any error)
const fs = require('node:fs');
const path = require('node:path');

const read = (dir, name) => JSON.parse(fs.readFileSync(path.join(dir, 'company', name + '.json'), 'utf8'));
const isUrl = (s) => typeof s === 'string' && /^https?:\/\/[^\s]+\.[^\s]+/.test(s);
const DASH = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']');

function textFiles(dir) {
  const out = [];
  const skip = new Set(['node_modules', '.git', '.vercel', 'tests']);
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
  let config, ventures, approvals, ledger, log;
  try {
    config = read(dir, 'config');
    ventures = read(dir, 'ventures');
    approvals = read(dir, 'approvals');
    ledger = read(dir, 'ledger');
    log = read(dir, 'log');
  } catch (e) {
    return [{ rule: 'parse', message: e.message }];
  }
  const stages = config.stages;
  const at = (s) => stages.indexOf(s);
  const seen = new Set();

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
    if (at(v.stage) >= at('live')) {
      if (v.url !== `https://${v.id}.${config.domain}`) err('url', `${tag}: live url must be https://${v.id}.${config.domain}`);
      const q = v.qa || {};
      const sizes = Array.isArray(q.viewports) ? q.viewports : [];
      const ok = q.passed === true && q.reviewer === 'qa' && q.consoleErrors === 0 && [390, 820, 1440].every((w) => sizes.includes(w)) && q.checkedAt;
      if (!ok) err('qa', `${tag}: cannot be live without a passing independent QA record (390, 820, 1440, zero console errors)`);
    }
  }

  const active = ventures.filter((v) => v.stage === 'building' || v.stage === 'qa').length;
  if (active > config.wip.building) err('wip', `${active} ventures in build or QA, limit is ${config.wip.building}`);
  const liveTests = ventures.filter((v) => v.stage === 'live').length;
  if (liveTests > config.wip.liveTests) err('wip', `${liveTests} ventures in live test, limit is ${config.wip.liveTests}`);
  const openIdeas = ventures.filter((v) => v.stage === 'idea').length;
  if (openIdeas > config.wip.openIdeas) err('wip', `${openIdeas} open ideas, limit is ${config.wip.openIdeas}`);

  const approvalIds = new Map();
  for (const a of approvals) {
    const tag = `approval ${a.id}`;
    if (!a.id || approvalIds.has(a.id)) err('approval', `${tag}: missing or duplicate id`);
    approvalIds.set(a.id, a);
    if (!config.approvalTypes.includes(a.type)) err('approval', `${tag}: unknown type ${a.type}`);
    if (!['pending', 'approved', 'rejected'].includes(a.status)) err('approval', `${tag}: unknown status`);
    if (typeof a.ask !== 'string' || !a.ask.trim()) err('approval', `${tag}: missing ask`);
    if (a.status !== 'pending' && (a.decidedBy !== 'owner' || !a.decidedAt)) err('approval', `${tag}: only the owner can decide an approval`);
    if (a.status === 'pending' && (a.decidedBy || a.decidedAt)) err('approval', `${tag}: pending approval cannot carry a decision`);
  }

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

  for (const [i, entry] of log.entries()) {
    if (!config.roster.includes(entry.agent)) err('log', `log row ${i + 1}: unknown role ${entry.agent}`);
    if (!entry.at || !entry.action) err('log', `log row ${i + 1}: needs at and action`);
  }

  for (const file of textFiles(dir)) {
    if (DASH.test(fs.readFileSync(file, 'utf8'))) err('dash', `${path.relative(dir, file)}: contains an em or en dash, use a hyphen`);
  }
  return errors;
}

module.exports = { validate };

if (require.main === module) {
  const errors = validate(path.join(__dirname, '..'));
  if (errors.length) {
    for (const e of errors) console.error(`FAIL [${e.rule}] ${e.message}`);
    process.exit(1);
  }
  console.log('Company state is valid.');
}
