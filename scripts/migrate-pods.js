#!/usr/bin/env node
// One-time move from the single-file brain to one file per venture, approval, agent status and
// agent log, and gives every venture past the idea stage its own lead agent.
// Safe to run twice: it only acts on old files that still exist.
// Usage: node scripts/migrate-pods.js
const fs = require('node:fs');
const path = require('node:path');

function migrate(root) {
  const c = (n) => path.join(root, 'company', n);
  const read = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
  const write = (f, v) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(v, null, 2) + '\n'); };
  const config = read(c('config.json'));
  const done = [];

  if (fs.existsSync(c('ventures.json'))) {
    const ventures = read(c('ventures.json'));
    const taken = new Set();
    let next = 0;
    for (const v of ventures) {
      if (!v.lead && v.stage !== 'idea' && !(v.stage === 'killed' && !(v.evidence || []).length)) {
        while (taken.has(config.leads[next % config.leads.length].name)) next++;
        v.lead = config.leads[next % config.leads.length];
        next++;
      }
      if (v.lead) taken.add(v.lead.name);
      write(path.join(c('ventures'), v.id + '.json'), v);
    }
    fs.unlinkSync(c('ventures.json'));
    done.push(`${ventures.length} ventures`);
  }
  if (fs.existsSync(c('approvals.json'))) {
    const approvals = read(c('approvals.json'));
    for (const a of approvals) write(path.join(c('approvals'), a.id + '.json'), a);
    fs.unlinkSync(c('approvals.json'));
    done.push(`${approvals.length} approvals`);
  }
  if (fs.existsSync(c('activity.json'))) {
    const activity = read(c('activity.json'));
    for (const [agent, a] of Object.entries(activity)) write(path.join(c('activity'), agent + '.json'), a);
    fs.unlinkSync(c('activity.json'));
    done.push(`${Object.keys(activity).length} agent statuses`);
  }
  if (fs.existsSync(c('log.json'))) {
    const log = read(c('log.json'));
    const files = {};
    for (const e of log) {
      const key = `${e.agent}.${e.ventureId || 'company'}`;
      (files[key] = files[key] || []).push(Object.assign({}, e, { ventureId: e.ventureId || null }));
    }
    for (const [key, lines] of Object.entries(files)) write(path.join(c('log'), key + '.json'), lines);
    fs.unlinkSync(c('log.json'));
    done.push(`${log.length} log lines`);
  }
  for (const d of ['ventures', 'approvals', 'activity', 'log']) {
    fs.mkdirSync(c(d), { recursive: true });
    if (!fs.readdirSync(c(d)).length) fs.writeFileSync(path.join(c(d), '.gitkeep'), '');
  }
  const stale = path.join(root, 'hq/public/data.json');
  if (fs.existsSync(stale)) fs.unlinkSync(stale);
  return done;
}

module.exports = { migrate };

if (require.main === module) {
  const done = migrate(path.join(__dirname, '..'));
  console.log(done.length ? 'Moved ' + done.join(', ') + ' to one file each.' : 'Nothing to migrate.');
}
