#!/usr/bin/env node
// A reviewer records its verdict on one venture. Each verdict is its own file, so reviewers
// working at the same time never overwrite each other, and it also writes the reviewer's own
// log line, which is the proof the gates check for.
//
//   node scripts/review.js <role> <ventureId> pass|fail "<notes>" [json extras]
//
// <role> is product, engineer, qa, design, security or legal. QA adds its extras as JSON:
//   '{"url":"https://x.anchit-tandon.com","viewports":[390,820,1440],"consoleErrors":0}'
const fs = require('node:fs');
const path = require('node:path');
const { loadBrain } = require('./brain.js');
const { act } = require('./act.js');

function review(root, role, ventureId, verdict, notes, extras = {}, now = new Date().toISOString()) {
  const brain = loadBrain(root);
  const roles = ['qa'].concat(brain.config.reviewsToGoLive || []);
  if (!roles.includes(role)) throw new Error(`Unknown review role "${role}". Use ${roles.join(', ')}.`);
  if (!brain.ventures.some((v) => v.id === ventureId)) throw new Error(`Unknown venture "${ventureId}".`);
  if (!['pass', 'fail'].includes(verdict)) throw new Error('Verdict must be pass or fail.');
  if (!(notes && notes.trim())) throw new Error('Say what you checked and what you found.');
  const record = Object.assign({}, extras, { role, passed: verdict === 'pass', at: now, notes: notes.trim() });
  const dir = path.join(root, 'company', 'reviews');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${ventureId}.${role}.json`), JSON.stringify(record, null, 2) + '\n');
  act(root, role, 'done', `${verdict === 'pass' ? 'Passed' : 'Failed'} the ${role} review: ${notes.trim()}`, ventureId, now);
}

module.exports = { review };

if (require.main === module) {
  const [role, ventureId, verdict, notes, extras] = process.argv.slice(2);
  try {
    review(path.join(__dirname, '..'), role, ventureId, verdict, notes, extras ? JSON.parse(extras) : {});
    console.log(`${role} ${verdict} for ${ventureId}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
