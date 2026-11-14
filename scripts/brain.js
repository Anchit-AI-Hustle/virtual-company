// Reads the company brain. Shared, single-writer files live in company/*.json. Everything
// that parallel agents write is one file per thing, so two agents never edit the same file:
//   company/ventures/<id>.json            one venture each
//   company/approvals/<id>.json           one approval each
//   company/activity/<agent>.json         one agent's current status
//   company/log/<agent>.<scope>.json      one agent's log lines for one venture (or "company")
//   company/reviews/<venture>.<role>.json  one reviewer's verdict on one venture
const fs = require('node:fs');
const path = require('node:path');

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

function readDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort().map((f) => ({ file: f, data: readJson(path.join(dir, f)) }));
}

function loadBrain(root) {
  const c = (n) => path.join(root, 'company', n);
  const ventures = readDir(c('ventures')).map((x) => x.data);
  const approvals = readDir(c('approvals')).map((x) => x.data);
  const activity = {};
  for (const x of readDir(c('activity'))) activity[x.file.replace(/\.json$/, '')] = x.data;
  const log = [];
  for (const x of readDir(c('log'))) for (const e of x.data) log.push(e);
  log.sort((a, b) => a.at.localeCompare(b.at));
  const reviews = {};
  for (const x of readDir(c('reviews'))) {
    const [ventureId, role] = x.file.replace(/\.json$/, '').split('.');
    (reviews[ventureId] = reviews[ventureId] || {})[role] = x.data;
  }
  return {
    config: readJson(c('config.json')),
    team: readJson(c('team.json')),
    departments: readJson(c('departments.json')),
    ledger: readJson(c('ledger.json')),
    ventures, approvals, activity, log, reviews
  };
}

// A venture lead's agent id is "lead-<ventureId>".
function leadId(ventureId) { return 'lead-' + ventureId; }

// Every agent that may act: the 16 department agents plus one lead per venture that has one.
function knownAgents(brain) {
  const ids = new Set(brain.team.map((t) => t.id));
  for (const v of brain.ventures) if (v.lead) ids.add(leadId(v.id));
  return ids;
}

module.exports = { loadBrain, leadId, knownAgents, readJson };
