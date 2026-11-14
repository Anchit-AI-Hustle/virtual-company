#!/usr/bin/env node
// Every agent reports what it is doing through this one command, so the office on HQ shows
// real work, not a simulation.
//
//   node scripts/act.js <agent> start   "<task>" [ventureId]   working on something
//   node scripts/act.js <agent> done    "<result>" [ventureId] finished it (also logged)
//   node scripts/act.js <agent> blocked "<reason>" [ventureId] stuck, with the reason
//   node scripts/act.js <agent> idle                           nothing to do
//
// It updates company/activity.json and company/log.json, then rebuilds hq/public/data.json.
// Commit and push to make it visible on HQ.
const fs = require('node:fs');
const path = require('node:path');
const { buildHq } = require('./build-hq.js');

const STATES = { start: 'working', done: 'done', blocked: 'blocked', idle: 'idle' };

function act(root, agent, verb, text, ventureId, now = new Date().toISOString()) {
  const file = (n) => path.join(root, 'company', n + '.json');
  const team = JSON.parse(fs.readFileSync(file('team'), 'utf8'));
  if (!team.some((t) => t.id === agent)) throw new Error(`Unknown agent "${agent}". Known: ${team.map((t) => t.id).join(', ')}`);
  if (!STATES[verb]) throw new Error(`Unknown verb "${verb}". Use start, done, blocked or idle.`);
  if (verb !== 'idle' && !(text && text.trim())) throw new Error('Say what you are doing, finished or blocked on.');
  const dash = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']');
  if (text && dash.test(text)) throw new Error('No em or en dashes. Use a hyphen.');

  const activity = JSON.parse(fs.readFileSync(file('activity'), 'utf8'));
  const prev = activity[agent] || {};
  activity[agent] = {
    state: STATES[verb],
    task: verb === 'idle' ? (prev.task || null) : text.trim(),
    ventureId: ventureId || (verb === 'idle' ? null : prev.ventureId || null),
    since: now
  };
  fs.writeFileSync(file('activity'), JSON.stringify(activity, null, 2) + '\n');

  if (verb !== 'idle') {
    const log = JSON.parse(fs.readFileSync(file('log'), 'utf8'));
    const label = { start: 'Started: ', done: '', blocked: 'Blocked: ' }[verb];
    log.push({ at: now, agent, action: label + text.trim(), ventureId: ventureId || null, kind: verb });
    fs.writeFileSync(file('log'), JSON.stringify(log, null, 2) + '\n');
  }
  fs.writeFileSync(path.join(root, 'hq/public/data.json'), JSON.stringify(buildHq(root), null, 2) + '\n');
}

module.exports = { act };

if (require.main === module) {
  const [agent, verb, text, ventureId] = process.argv.slice(2);
  try {
    act(path.join(__dirname, '..'), agent, verb, text, ventureId);
    console.log(`${agent} ${STATES[verb]}${text ? ': ' + text : ''}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
