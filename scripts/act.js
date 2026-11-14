#!/usr/bin/env node
// Every agent reports what it is doing through this one command, so the office on HQ shows
// real work, not a simulation.
//
//   node scripts/act.js <agent> start   "<task>" [ventureId]   working on something
//   node scripts/act.js <agent> done    "<result>" [ventureId] finished it (also logged)
//   node scripts/act.js <agent> blocked "<reason>" [ventureId] stuck, with the reason
//   node scripts/act.js <agent> idle                           nothing to do
//
// <agent> is a department agent id from company/team.json, or lead-<ventureId> for a venture
// lead. It writes only company/activity/<agent>.json and company/log/<agent>.<scope>.json,
// so agents working in parallel never touch each other's files. Commit and push to show it.
const fs = require('node:fs');
const path = require('node:path');
const { loadBrain, knownAgents } = require('./brain.js');

const STATES = { start: 'working', done: 'done', blocked: 'blocked', idle: 'idle' };

function act(root, agent, verb, text, ventureId, now = new Date().toISOString()) {
  const brain = loadBrain(root);
  const agents = knownAgents(brain);
  if (!agents.has(agent)) throw new Error(`Unknown agent "${agent}". Known: ${[...agents].join(', ')}`);
  if (!STATES[verb]) throw new Error(`Unknown verb "${verb}". Use start, done, blocked or idle.`);
  if (verb !== 'idle' && !(text && text.trim())) throw new Error('Say what you are doing, finished or blocked on.');
  const dash = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']');
  if (text && dash.test(text)) throw new Error('No em or en dashes. Use a hyphen.');
  if (ventureId && !brain.ventures.some((v) => v.id === ventureId)) throw new Error(`Unknown venture "${ventureId}".`);

  const dir = (n) => { const d = path.join(root, 'company', n); fs.mkdirSync(d, { recursive: true }); return d; };
  const actFile = path.join(dir('activity'), agent + '.json');
  const prev = fs.existsSync(actFile) ? JSON.parse(fs.readFileSync(actFile, 'utf8')) : {};
  const status = {
    state: STATES[verb],
    task: verb === 'idle' ? (prev.task || null) : text.trim(),
    ventureId: ventureId || (verb === 'idle' ? null : prev.ventureId || null),
    since: now
  };
  fs.writeFileSync(actFile, JSON.stringify(status, null, 2) + '\n');

  if (verb !== 'idle') {
    const logFile = path.join(dir('log'), `${agent}.${ventureId || 'company'}.json`);
    const log = fs.existsSync(logFile) ? JSON.parse(fs.readFileSync(logFile, 'utf8')) : [];
    const label = { start: 'Started: ', done: '', blocked: 'Blocked: ' }[verb];
    log.push({ at: now, agent, action: label + text.trim(), ventureId: ventureId || null, kind: verb });
    fs.writeFileSync(logFile, JSON.stringify(log, null, 2) + '\n');
  }
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
