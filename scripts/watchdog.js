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
const LIMITS = { deployGraceMs: 20 * 60e3, cycleGapMs: 16 * HOUR, redeployEveryMs: HOUR, timeoutMs: 15e3 };

// Pure judgement, so tests can feed it any situation. Returns { problems, redeploy }.
function assess(s) {
  const problems = [];
  const add = (id, text) => problems.push({ id, text });
  if (!s.hq || s.hq.status !== 200) add('hq-down', `HQ did not load (${s.hq ? 'HTTP ' + s.hq.status : 'no answer'}).`);
  else if (!/id="stage"|class="plan"|Office/.test(s.hq.body || '')) add('hq-broken', 'HQ loaded but the office page is missing.');
  let redeploy = false;
  if (!s.data || s.data.status !== 200 || !s.data.json) add('hq-data', 'HQ could not read its data, so the office would look empty.');
  else if (s.booksChangedAt) {
    const built = Date.parse(s.data.json.builtAt), changed = Date.parse(s.booksChangedAt);
    if (built < changed && s.now - changed > LIMITS.deployGraceMs) {
      add('hq-stale', `HQ is showing books from ${s.data.json.builtAt.slice(0, 16)} UTC, older than the latest change. A deploy did not go through.`);
      const last = s.health && s.health.lastRedeployAt ? Date.parse(s.health.lastRedeployAt) : 0;
      redeploy = s.now - last > LIMITS.redeployEveryMs;
    }
  }
  for (const v of s.products || []) if (v.status !== 200) add('product-' + v.id, `${v.title} at ${v.url} is not answering (${v.status ? 'HTTP ' + v.status : 'no answer'}).`);
  if (s.lastWorkAt && s.now - Date.parse(s.lastWorkAt) > LIMITS.cycleGapMs) {
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

async function get(url) {
  try {
    const r = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(LIMITS.timeoutMs), headers: { 'user-agent': 'venture-hq-watchdog' } });
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
  const d = await get(hqUrl + '/data.json?watchdog=' + now);
  let json = null; try { json = JSON.parse(d.body); } catch (e) { json = null; }
  const products = [];
  for (const f of fs.readdirSync(path.join(root, 'company/ventures')).filter((x) => x.endsWith('.json'))) {
    const v = read('company/ventures/' + f);
    if ((v.stage === 'live' || v.stage === 'scaling') && v.url) products.push(Object.assign({ id: v.id, title: v.title, url: v.url }, await get(v.url)));
  }
  let lastWorkAt = null;
  for (const f of fs.readdirSync(path.join(root, 'company/log')).filter((x) => x.endsWith('.json'))) {
    for (const e of read('company/log/' + f)) if (e.at && (!lastWorkAt || e.at > lastWorkAt)) lastWorkAt = e.at;
  }
  let booksChangedAt = null;
  try { booksChangedAt = execSync('git log -1 --format=%cI -- hq company scripts ":(exclude)company/health.json"', { cwd: root }).toString().trim() || null; } catch (e) { booksChangedAt = null; }
  const hf = path.join(root, 'company/health.json');
  const health = fs.existsSync(hf) ? read('company/health.json') : null;
  return { now, hq, data: { status: d.status, json }, products, lastWorkAt, booksChangedAt, health };
}

module.exports = { assess, nextHealth, LIMITS };

if (require.main === module) {
  (async () => {
    const root = path.join(__dirname, '..');
    const now = Date.now();
    const s = await gather(root, now);
    const result = assess(s);
    console.log(result.problems.length ? 'PROBLEMS:\n- ' + result.problems.map((p) => p.text).join('\n- ') : 'All checks passed.');
    console.log(`checked HQ ${s.hq.status}, data ${s.data.status}, products ${s.products.length}, last work ${s.lastWorkAt}, books changed ${s.booksChangedAt}`);
    const next = nextHealth(s.health, result, new Date(now).toISOString());
    if (next) {
      fs.writeFileSync(path.join(root, 'company/health.json'), JSON.stringify(next, null, 2) + '\n');
      console.log('health.json updated' + (result.redeploy ? ' (asks for a fresh HQ deploy)' : ''));
    }
    if (process.env.GITHUB_OUTPUT) {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `status=${result.problems.length ? 'problem' : 'ok'}\nchanged=${next ? 'yes' : 'no'}\n`);
      fs.writeFileSync('/tmp/watchdog-report.md', result.problems.length
        ? 'The watchdog found a problem with the platform:\n\n' + result.problems.map((p) => '- ' + p.text).join('\n') + '\n\nThe next work session fixes these first. If the work sessions themselves stopped, open claude.ai, check the plan usage, and run the "Venture company cycle" scheduled task once.'
        : 'All checks pass again. Closing.');
    }
  })().catch((e) => { console.error(e); process.exit(1); });
}
