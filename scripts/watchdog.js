// The platform's watchdog. GitHub runs it every 15 minutes (.github/workflows/watchdog.yml).
// It checks that HQ loads, that HQ shows the latest books (so deploys are working), that every
// live product answers, and that the scheduled work sessions are still happening.
// It writes company/health.json only when the picture changes, so a healthy platform causes
// no commits and no deploys. When HQ is behind the books it asks for a fresh deploy, at most
// once an hour, by touching health.json (a push is what makes Vercel rebuild HQ).
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const HOUR = 3600e3;
const LIMITS = { deployGraceMs: 10 * 60e3, cycleGapMs: 4 * HOUR, redeployEveryMs: 10 * 60e3, timeoutMs: 15e3 };

// The latest scheduled session start that should have produced work by now (45 minutes grace),
// from config.schedule.cycles in India time ("HH:MM", UTC+5:30).
function lastDueAt(now, cycles, graceMs = 45 * 60e3) {
  const IST = 330 * 60e3, t = now - graceMs, day = 86400e3;
  const base = Math.floor((t + IST) / day) * day - IST;
  let best = null;
  for (const d of [0, -1]) for (const c of cycles || []) {
    const [h, m] = c.split(':').map(Number);
    const at = base + d * day + (h * 60 + m) * 60e3;
    if (at <= t && (best === null || at > best)) best = at;
  }
  return best;
}

// Pure judgement, so tests can feed it any situation. Returns { problems, redeploy }.
function assess(s) {
  const problems = [];
  const add = (id, text) => problems.push({ id, text });
  if (!s.hq || s.hq.status !== 200) add('hq-down', `HQ did not load (${s.hq ? 'HTTP ' + s.hq.status : 'no answer'}).`);
  else if (!/id="stage"|class="plan"|Office/.test(s.hq.body || '')) add('hq-broken', 'HQ loaded but the office page is missing.');
  else if (s.pageInRepo && s.hq.body !== s.pageInRepo) add('hq-page-behind', 'The live HQ page is older than the page in the repo. Vercel deploys HQ only on request: the next work session deploys it (agents/devops.md).');
  let redeploy = false;
  if (!s.data || s.data.status !== 200 || !s.data.json) add('hq-data', 'HQ could not read its data from GitHub, so the office would look empty.');
  else if (s.booksChangedAt) {
    const built = Date.parse(s.data.json.builtAt), changed = Date.parse(s.booksChangedAt);
    if (built < changed && s.now - changed > LIMITS.deployGraceMs) {
      add('hq-stale', `HQ is showing books from ${s.data.json.builtAt.slice(0, 16)} UTC, older than the latest work. The watchdog rebuilds them now.`);
      const last = s.health && s.health.lastRedeployAt ? Date.parse(s.health.lastRedeployAt) : 0;
      redeploy = s.now - last > LIMITS.redeployEveryMs;
    }
  }
  if (s.ci && s.ci.conclusion === 'failure' && s.now - Date.parse(s.ci.at) > 10 * 60e3) add('ci-red', `The automatic tests on main are failing since ${s.ci.at.slice(0, 16)} UTC (${s.ci.title}). The next work session fixes them before anything else.`);
  for (const v of s.unapproved || []) if (v.status === 200) add('unapproved-' + v.id, `${v.title} is online at ${v.url} but was never approved to launch (stage ${v.stage}). The next work session takes it offline.`);
  for (const v of s.products || []) if (v.status !== 200) add('product-' + v.id, `${v.title} at ${v.url} is not answering (${v.status ? 'HTTP ' + v.status : 'no answer'}).`);
  const due = s.cycles ? lastDueAt(s.now, s.cycles) : null;
  if (s.lastWorkAt && (due !== null ? Date.parse(s.lastWorkAt) < due : s.now - Date.parse(s.lastWorkAt) > LIMITS.cycleGapMs)) {
    add('cycle-missed', `No agent has worked since ${s.lastWorkAt.slice(0, 16)} UTC. A scheduled work session was missed, often because the plan's usage limit was reached.`);
  }
  return { problems, redeploy };
}

// Next health record, or null when nothing worth recording changed.
function nextHealth(prev, result, nowIso) {
  const p = prev || {};
  const status = result.problems.length ? 'problem' : 'ok';
  const key = (ps) => (ps || []).map((x) => x.id).sort().join(',');
  const changed = status !== p.status || key(result.problems) !== key(p.problems);
  if (!changed && !result.redeploy) return null;
  return {
    status,
    since: changed ? nowIso : p.since,
    problems: result.problems,
    lastRedeployAt: result.redeploy ? nowIso : p.lastRedeployAt || null
  };
}

async function get(url, redirect = 'follow') {
  try {
    const r = await fetch(url, { redirect, signal: AbortSignal.timeout(LIMITS.timeoutMs), headers: { 'user-agent': 'venture-hq-watchdog' } });
    return { status: r.status, body: await r.text() };
  } catch (e) {
    return { status: 0, body: '' };
  }
}

async function gather(root, now) {
  const read = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
  const config = read('company/config.json');
  const hqUrl = `https://hq.${config.domain}`;
  const hq = await get(hqUrl + '/');
  let pageInRepo = null; try { pageInRepo = fs.readFileSync(path.join(root, 'hq/public/index.html'), 'utf8'); } catch (e) { /* no page */ }
  // The office reads its data from GitHub: check that copy is reachable, and judge freshness by
  // the committed file the page will read at the newest commit.
  const repo = process.env.GITHUB_REPOSITORY || 'Anchit-AI-Hustle/virtual-company';
  const d = await get(`https://raw.githubusercontent.com/${repo}/main/hq/public/data.json`);
  let json = null; try { json = JSON.parse(d.body); } catch (e) { json = null; }
  try { const local = read('hq/public/data.json'); if (json && local.builtAt) json = Object.assign({}, json, { builtAt: local.builtAt }); } catch (e) { /* no local copy: use GitHub's */ }
  const products = [], unapproved = [];
  for (const f of fs.readdirSync(path.join(root, 'company/ventures')).filter((x) => x.endsWith('.json'))) {
    const v = read('company/ventures/' + f);
    if ((v.stage === 'live' || v.stage === 'scaling') && v.url) products.push(Object.assign({ id: v.id, title: v.title, url: v.url }, await get(v.url)));
    else if (v.stage !== 'qa') {
      const url = `https://${v.id}.${config.domain}/`;
      const r = await get(url, 'manual'); // a redirect to a sign-in page is not the product being online
      unapproved.push({ id: v.id, title: v.title, stage: v.stage, url, status: r.status });
    }
  }
  let lastWorkAt = null;
  for (const f of fs.readdirSync(path.join(root, 'company/log')).filter((x) => x.endsWith('.json'))) {
    for (const e of read('company/log/' + f)) if (e.at && (!lastWorkAt || e.at > lastWorkAt)) lastWorkAt = e.at;
  }
  let booksChangedAt = null;
  try { booksChangedAt = execSync('git log -1 --format=%cI -- company cases ":(exclude)company/health.json"', { cwd: root }).toString().trim() || null; } catch (e) { booksChangedAt = null; }
  let ci = null;
  try {
    const repo = process.env.GITHUB_REPOSITORY || 'Anchit-AI-Hustle/virtual-company';
    const api = `https://api.github.com/repos/${repo}/actions/workflows/ci.yml/runs?branch=main&status=completed&per_page=1`;
    let runs;
    if (process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_TOKEN) {
      const r = await fetch(api, { headers: { authorization: 'Bearer ' + process.env.GITHUB_TOKEN, accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(LIMITS.timeoutMs) });
      runs = await r.json();
    } else runs = JSON.parse(execSync(`gh api "repos/${repo}/actions/workflows/ci.yml/runs?branch=main&status=completed&per_page=1"`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString());
    const w = runs.workflow_runs && runs.workflow_runs[0];
    if (w) ci = { conclusion: w.conclusion, at: w.updated_at, title: (w.display_title || '').slice(0, 60) };
  } catch (e) { ci = null; }
  const hf = path.join(root, 'company/health.json');
  const health = fs.existsSync(hf) ? read('company/health.json') : null;
  return { now, hq, pageInRepo, data: { status: d.status, json }, products, unapproved, ci, cycles: (config.schedule || {}).cycles, lastWorkAt, booksChangedAt, health };
}

module.exports = { assess, nextHealth, lastDueAt, LIMITS };

if (require.main === module) {
  (async () => {
    const root = path.join(__dirname, '..');
    const now = Date.now();
    const s = await gather(root, now);
    const result = assess(s);
    console.log(result.problems.length ? 'PROBLEMS:\n- ' + result.problems.map((p) => p.text).join('\n- ') : 'All checks passed.');
    console.log(`checked HQ ${s.hq.status}, data ${s.data.status}, CI ${s.ci ? s.ci.conclusion : 'unknown'}, products ${s.products.length}, last work ${s.lastWorkAt}, books changed ${s.booksChangedAt}`);
    const next = nextHealth(s.health, result, new Date(now).toISOString());
    const key = (ps) => (ps || []).map((x) => x.id).sort().join(',');
    const problemsChanged = key(result.problems) !== key(s.health && s.health.problems) || (s.health ? s.health.status : 'ok') !== (result.problems.length ? 'problem' : 'ok');
    const mayWrite = process.env.GITHUB_ACTIONS === 'true' || process.argv.includes('--write');
    if (next && !mayWrite) console.log('(check only: health.json is written by the watchdog on GitHub, not here)');
    if (next && mayWrite) {
      fs.writeFileSync(path.join(root, 'company/health.json'), JSON.stringify(next, null, 2) + '\n');
      console.log('health.json updated' + (result.redeploy ? ' (HQ data rebuilt)' : ''));
    }
    if (process.env.GITHUB_OUTPUT) {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `status=${result.problems.length ? 'problem' : 'ok'}\nchanged=${next ? 'yes' : 'no'}\nproblems_changed=${problemsChanged ? 'yes' : 'no'}\n`);
      fs.writeFileSync('/tmp/watchdog-report.md', result.problems.length
        ? 'The watchdog found a problem with the platform:\n\n' + result.problems.map((p) => '- ' + p.text).join('\n') + '\n\nThe next work session fixes these first. If the work sessions themselves stopped, open claude.ai, check the plan usage, and run the "Venture company cycle" scheduled task once.'
        : 'All checks pass again. Closing.');
    }
  })().catch((e) => { console.error(e); process.exit(1); });
}
