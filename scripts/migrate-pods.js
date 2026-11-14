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

  const toDelete = [];
  if (fs.existsSync(c('ventures.json'))) {
    const ventures = read(c('ventures.json'));
    const ACTIVE = ['validating', 'validated', 'spec', 'building', 'qa'];
    // Keep within the pod limit: park the lowest scored extras that are only validating.
    const active = ventures.filter((v) => ACTIVE.includes(v.stage)).sort((a, b) => b.score.total - a.score.total);
    for (const v of active.slice(config.wip.pods)) {
      if (v.stage !== 'validating') throw new Error(`More than ${config.wip.pods} ventures past validation; park ${v.id} by hand before migrating.`);
      v.stage = 'idea';
      v.nextAction = 'Parked when the company moved to one lead per idea; waits for a free pod';
    }
    const taken = new Set(ventures.filter((v) => v.lead && v.stage !== 'killed').map((v) => v.lead.name));
    for (const v of ventures) {
      if (!v.lead && v.stage !== 'idea' && v.stage !== 'killed') {
        const free = config.leads.find((l) => !taken.has(l.name));
        if (!free) throw new Error('No free lead names left in config.leads. Add names, then migrate again.');
        v.lead = free;
        taken.add(free.name);
      }
      if (v.lead === undefined) v.lead = null;
    }
    for (const v of ventures) {
      // Old verdicts kept on the venture move to their own review files.
      const verdicts = Object.assign({}, v.reviews || {}, v.qa ? { qa: v.qa } : {});
      for (const [role, r] of Object.entries(verdicts)) if (r) write(path.join(c('reviews'), `${v.id}.${role}.json`), Object.assign({ role }, r));
      delete v.reviews;
      delete v.qa;
      write(path.join(c('ventures'), v.id + '.json'), v);
    }
    toDelete.push(c('ventures.json'));
    done.push(`${ventures.length} ventures`);
  }
  if (fs.existsSync(c('approvals.json'))) {
    const approvals = read(c('approvals.json'));
    for (const a of approvals) write(path.join(c('approvals'), a.id + '.json'), a);
    toDelete.push(c('approvals.json'));
    done.push(`${approvals.length} approvals`);
  }
  if (fs.existsSync(c('activity.json'))) {
    const activity = read(c('activity.json'));
    for (const [agent, a] of Object.entries(activity)) write(path.join(c('activity'), agent + '.json'), a);
    toDelete.push(c('activity.json'));
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
    toDelete.push(c('log.json'));
    done.push(`${log.length} log lines`);
  }
  // Everything is written before anything old is removed, so a failure leaves the old brain whole.
  for (const f of toDelete) fs.unlinkSync(f);
  for (const d of ['ventures', 'approvals', 'activity', 'log', 'reviews']) {
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
