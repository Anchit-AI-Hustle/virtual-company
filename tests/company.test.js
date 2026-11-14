// Acceptance tests for the company brain. Run: node --test tests/*.test.js
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { validate } = require('../scripts/validate.js');
const { buildHq } = require('../scripts/build-hq.js');
const { act } = require('../scripts/act.js');
const { migrate } = require('../scripts/migrate-pods.js');
const { review } = require('../scripts/review.js');
const { execSync, spawnSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');
const readRoot = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const config = readRoot('company/config.json');
const TEAM = readRoot('company/team.json');
const dash = String.fromCharCode(0x2014);

// A temporary company with the real config, team and charters and the given state.
function fixture(o = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vc-'));
  const w = (rel, v) => { fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true }); fs.writeFileSync(path.join(dir, rel), typeof v === 'string' ? v : JSON.stringify(v, null, 2)); };
  w('company/config.json', o.config || config);
  w('company/team.json', o.team || TEAM);
  w('company/departments.json', readRoot('company/departments.json'));
  w('company/ledger.json', o.ledger || []);
  for (const v of o.ventures || []) w(`company/ventures/${v.id}.json`, v);
  for (const a of o.approvals || []) w(`company/approvals/${a.id}.json`, a);
  for (const [agent, s] of Object.entries(o.activity || {})) w(`company/activity/${agent}.json`, s);
  const logs = Object.assign({}, o.logs || {});
  for (const [vid, roles] of Object.entries(o.reviews || {})) {
    for (const [role, r] of Object.entries(roles)) {
      w(`company/reviews/${vid}.${role}.json`, r);
      if (!o.noProof) logs[`${role}.${vid}.json`] = (logs[`${role}.${vid}.json`] || []).concat([{ at: r.at || '2026-11-14T10:00:00Z', agent: role, action: 'Reviewed', ventureId: vid, kind: 'done' }]);
    }
  }
  for (const [file, lines] of Object.entries(logs)) w(`company/log/${file}`, lines);
  for (const [rel, text] of Object.entries(o.files || {})) w(rel, text);
  fs.cpSync(path.join(ROOT, 'agents'), path.join(dir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'hq/public'), { recursive: true });
  return dir;
}

const evidence = [1, 2, 3].map((i) => ({ claim: 'Signal ' + i, url: 'https://example.com/' + i, foundAt: '2026-11-14' }));
const goodQa = { role: 'qa', passed: true, at: '2026-11-14T10:00:00Z', url: 'https://invoice-buddy.anchit-tandon.com', viewports: [390, 820, 1440], consoleErrors: 0, notes: 'ok' };
const passed = { passed: true, at: '2026-11-14T10:00:00Z', notes: 'ok' };
const goodReviews = { product: passed, engineer: passed, design: passed, security: passed, legal: passed, qa: goodQa };
const productOnly = { 'invoice-buddy': { product: passed } };
const lead = (i) => config.leads[i];

function venture(extra = {}) {
  return Object.assign({
    id: 'invoice-buddy', title: 'Invoice Buddy', oneLiner: 'GST invoices in one minute for freelancers',
    customer: 'Indian freelancers', revenueModel: 'One-time purchase', priceINR: 199, stage: 'idea',
    score: { demand: 3, speedToRevenue: 4, buildEffort: 4, distribution: 2, total: 13 },
    evidence: [], specPath: null, url: null, metrics: null, lead: null,
    nextAction: 'Research demand', createdAt: '2026-11-14T03:00:00Z', updatedAt: '2026-11-14T03:00:00Z', killReason: null
  }, extra);
}
const rules = (dir) => validate(dir).map((e) => e.rule);
const liveBase = { stage: 'live', evidence, specPath: 'specs/a.md', url: 'https://invoice-buddy.anchit-tandon.com', lead: lead(0) };
const liveFixture = (reviews, extra = {}) => fixture(Object.assign({ ventures: [venture(liveBase)], reviews: { 'invoice-buddy': reviews }, files: specFile }, extra));
const specFile = { 'specs/a.md': '# a' };

test('the committed company state is valid', () => {
  assert.deepStrictEqual(validate(ROOT), []);
});

test('an idea needs no lead and no evidence', () => {
  assert.deepStrictEqual(validate(fixture({ ventures: [venture()] })), []);
});

test('every venture past the idea stage has its own lead, and no lead runs two', () => {
  assert.ok(rules(fixture({ ventures: [venture({ stage: 'validating' })] })).includes('lead'));
  assert.deepStrictEqual(validate(fixture({ ventures: [venture({ stage: 'validating', lead: lead(0) })] })), []);
  const twice = fixture({ ventures: [venture({ stage: 'validating', lead: lead(0) }), venture({ id: 'menu-qr', stage: 'validating', lead: lead(0) })] });
  assert.ok(rules(twice).includes('lead'));
  const invented = fixture({ ventures: [venture({ stage: 'validating', lead: { name: 'Zzz', color: '#123456' } })] });
  assert.ok(rules(invented).includes('lead'));
  const reused = fixture({ ventures: [venture({ stage: 'killed', killReason: 'x', lead: lead(0) }), venture({ id: 'menu-qr', stage: 'validating', lead: lead(0) })] });
  assert.deepStrictEqual(validate(reused), []);
});

test('several ventures run in parallel up to the pod limit, not beyond', () => {
  const v = (i, stage) => venture({ id: 'venture-' + 'abcdef'[i], stage, lead: lead(i), evidence, specPath: 'specs/a.md' });
  const rv = { 'venture-b': { product: passed }, 'venture-c': { product: passed } };
  const three = fixture({ ventures: [v(0, 'validating'), v(1, 'building'), v(2, 'qa')], reviews: rv, files: specFile });
  assert.deepStrictEqual(validate(three), []);
  const four = fixture({ ventures: [v(0, 'validating'), v(1, 'building'), v(2, 'qa'), v(3, 'spec')], reviews: rv, files: specFile });
  assert.ok(rules(four).includes('wip'));
});

test('a venture cannot be validated without 3 sourced pieces of evidence', () => {
  assert.ok(rules(fixture({ ventures: [venture({ stage: 'validated', lead: lead(0), evidence: evidence.slice(0, 2) })] })).includes('evidence'));
  assert.ok(rules(fixture({ ventures: [venture({ stage: 'validated', lead: lead(0), evidence: [evidence[0], evidence[1], { claim: 'x', url: 'trust me' }] })] })).includes('evidence'));
  assert.deepStrictEqual(validate(fixture({ ventures: [venture({ stage: 'validated', lead: lead(0), evidence })] })), []);
});

test('spec stage and later need a spec file that exists', () => {
  assert.ok(rules(fixture({ ventures: [venture({ stage: 'spec', lead: lead(0), evidence, specPath: 'specs/a.md' })] })).includes('spec'));
  assert.deepStrictEqual(validate(fixture({ ventures: [venture({ stage: 'spec', lead: lead(0), evidence, specPath: 'specs/a.md' })], files: specFile })), []);
});

test('a venture cannot be built before the product review of its spec passes', () => {
  const building = venture({ stage: 'building', lead: lead(0), evidence, specPath: 'specs/a.md' });
  assert.ok(rules(fixture({ ventures: [building], files: specFile })).includes('review'));
  assert.ok(rules(fixture({ ventures: [building], reviews: { 'invoice-buddy': { product: Object.assign({}, passed, { passed: false }) } }, files: specFile })).includes('review'));
  assert.deepStrictEqual(validate(fixture({ ventures: [building], reviews: productOnly, files: specFile })), []);
});

test('a venture cannot go live without QA of the live URL on all three screen sizes', () => {
  const cases = [null, { passed: false }, { viewports: [390, 1440] }, { consoleErrors: 2 }, { url: 'http://localhost:3000' }];
  for (const c of cases) {
    const reviews = Object.assign({}, goodReviews);
    if (c) reviews.qa = Object.assign({}, goodQa, c); else delete reviews.qa;
    assert.ok(rules(liveFixture(reviews)).includes('qa'), JSON.stringify(c));
  }
  assert.deepStrictEqual(validate(liveFixture(goodReviews)), []);
});

test('a venture cannot go live without product, engineering, design, security and legal sign-off', () => {
  for (const missing of config.reviewsToGoLive) {
    const reviews = Object.assign({}, goodReviews);
    delete reviews[missing];
    assert.ok(validate(liveFixture(reviews)).some((e) => e.rule === 'review' && e.message.includes(missing)), missing);
  }
  assert.ok(rules(liveFixture(Object.assign({}, goodReviews, { legal: { passed: false, at: '2026-11-14T10:00:00Z' } }))).includes('review'));
});

test('a verdict counts only when the reviewer itself logged it', () => {
  assert.ok(rules(liveFixture(goodReviews, { noProof: true })).includes('review'));
});

test('review.js writes one file per verdict plus the reviewer log line, and the gate accepts it', () => {
  const dir = fixture({ ventures: [venture({ stage: 'spec', lead: lead(0), evidence, specPath: 'specs/a.md' })], files: specFile });
  review(dir, 'product', 'invoice-buddy', 'pass', 'Spec is small and every test is checkable', {}, '2026-11-14T06:00:00Z');
  review(dir, 'design', 'invoice-buddy', 'fail', 'First screen buries the main action', {}, '2026-11-14T06:01:00Z');
  assert.ok(fs.existsSync(path.join(dir, 'company/reviews/invoice-buddy.product.json')));
  assert.ok(fs.existsSync(path.join(dir, 'company/reviews/invoice-buddy.design.json')));
  const vf = path.join(dir, 'company/ventures/invoice-buddy.json');
  fs.writeFileSync(vf, JSON.stringify(Object.assign(JSON.parse(fs.readFileSync(vf, 'utf8')), { stage: 'building' })));
  assert.deepStrictEqual(validate(dir), []);
  assert.throws(() => review(dir, 'intern', 'invoice-buddy', 'pass', 'x'));
  assert.throws(() => review(dir, 'qa', 'nothing', 'pass', 'x'));
  assert.throws(() => review(dir, 'qa', 'invoice-buddy', 'maybe', 'x'));
});

test('a live venture must sit on its own subdomain of the owner domain', () => {
  assert.ok(rules(fixture({ ventures: [venture(Object.assign({}, liveBase, { url: 'https://invoice-buddy.vercel.app' }))], reviews: { 'invoice-buddy': goodReviews }, files: specFile })).includes('url'));
});

test('venture ids are unique, subdomain safe, not reserved, and match their file name', () => {
  assert.ok(rules(fixture({ ventures: [venture({ id: 'Bad_Name' })] })).includes('id'));
  assert.ok(rules(fixture({ ventures: [venture({ id: 'kits' })] })).includes('id'));
  assert.ok(rules(fixture({ ventures: [venture({ id: 'company' })] })).includes('id'));
  const misnamed = fixture({ files: { 'company/ventures/other.json': JSON.stringify(venture()) } });
  assert.ok(rules(misnamed).includes('files'));
});

test('a killed venture records why, and scores add up', () => {
  assert.ok(rules(fixture({ ventures: [venture({ stage: 'killed' })] })).includes('kill'));
  assert.deepStrictEqual(validate(fixture({ ventures: [venture({ stage: 'killed', killReason: 'No demand found in 3 days' })] })), []);
  assert.ok(rules(fixture({ ventures: [venture({ score: { demand: 5, speedToRevenue: 5, buildEffort: 5, distribution: 5, total: 3 } })] })).includes('score'));
});

test('only the owner can decide an approval', () => {
  const pending = { id: 'ap-1', ventureId: null, type: 'money', ask: 'Spend Rs 500 on a domain', costINR: 500, status: 'pending', issueUrl: null, createdAt: '2026-11-14T03:00:00Z', decidedBy: null, decidedAt: null };
  assert.deepStrictEqual(validate(fixture({ approvals: [pending] })), []);
  assert.ok(rules(fixture({ approvals: [Object.assign({}, pending, { status: 'approved', decidedBy: 'ceo', decidedAt: '2026-11-14T04:00:00Z' })] })).includes('approval'));
  assert.deepStrictEqual(validate(fixture({ approvals: [Object.assign({}, pending, { status: 'approved', decidedBy: 'owner', decidedAt: '2026-11-14T04:00:00Z' })] })), []);
});

test('no cost is booked without an owner-approved request, and no revenue without a source', () => {
  const approved = { id: 'ap-1', ventureId: null, type: 'money', ask: 'x', costINR: 500, status: 'approved', issueUrl: null, createdAt: '2026-11-14T03:00:00Z', decidedBy: 'owner', decidedAt: '2026-11-14T04:00:00Z' };
  const cost = { date: '2026-11-14', ventureId: null, type: 'cost', amountINR: 500, note: 'Domain', source: 'invoice', approvalId: 'ap-1' };
  assert.ok(rules(fixture({ ledger: [cost] })).includes('ledger'));
  assert.deepStrictEqual(validate(fixture({ ledger: [cost], approvals: [approved] })), []);
  assert.ok(rules(fixture({ ledger: [Object.assign({}, cost, { amountINR: 900 })], approvals: [approved] })).includes('ledger'));
  assert.ok(rules(fixture({ ledger: [{ date: '2026-11-14', ventureId: null, type: 'revenue', amountINR: 199, note: 'Sale', source: '' }] })).includes('ledger'));
});

test('log lines come from a real agent and sit in that agent and venture file', () => {
  const line = (agent, ventureId) => ({ at: '2026-11-14T03:00:00Z', agent, action: 'x', ventureId });
  assert.ok(rules(fixture({ logs: { 'intern.company.json': [line('intern', null)] } })).includes('log'));
  assert.ok(rules(fixture({ logs: { 'qa.company.json': [line('ceo', null)] } })).includes('log'));
  assert.ok(rules(fixture({ logs: { 'nobody.company.json': [] } })).includes('log'));
  assert.ok(rules(fixture({ logs: { 'qa.a.b.json': [] } })).includes('log'));
  assert.deepStrictEqual(validate(fixture({ logs: { 'qa.company.json': [line('qa', null)] } })), []);
});

test('no em or en dashes anywhere in company text', () => {
  assert.ok(rules(fixture({ ventures: [venture({ oneLiner: 'Fast ' + dash + ' simple' })] })).includes('dash'));
});

test('every department is staffed and every agent has a name, charter and known department', () => {
  assert.ok(TEAM.length >= 16);
  const broken = TEAM.map((t) => Object.assign({}, t)); broken[3].charter = 'agents/nobody.md';
  assert.ok(rules(fixture({ team: broken })).includes('team'));
  const unknown = TEAM.map((t) => Object.assign({}, t)); unknown[0].department = 'canteen';
  assert.ok(rules(fixture({ team: unknown })).includes('team'));
});

test('every department agent appears in the runbooks with real work', () => {
  const runbook = fs.readFileSync(path.join(ROOT, 'RUNBOOK-daily.md'), 'utf8') + fs.readFileSync(path.join(ROOT, 'RUNBOOK-weekly.md'), 'utf8');
  for (const t of TEAM) assert.ok(runbook.includes('`' + t.id + '`'), t.id + ' is missing from the runbooks');
  assert.ok(runbook.includes('isolation: "worktree"'), 'pods must run in isolated worktrees');
});

test('act.js lets a venture lead report, writes only its own files, and rejects unknown agents and dashes', () => {
  const dir = fixture({ ventures: [venture({ stage: 'validating', lead: lead(0) }), venture({ id: 'menu-qr', stage: 'validating', lead: lead(1) })] });
  act(dir, 'lead-invoice-buddy', 'start', 'Searching for demand', 'invoice-buddy', '2026-11-14T05:00:00Z');
  act(dir, 'lead-menu-qr', 'start', 'Reading cafe forums', 'menu-qr', '2026-11-14T05:01:00Z');
  act(dir, 'qa', 'done', 'Passed menu QR locally', 'menu-qr', '2026-11-14T05:02:00Z');
  const files = fs.readdirSync(path.join(dir, 'company/log')).sort();
  assert.deepStrictEqual(files, ['lead-invoice-buddy.invoice-buddy.json', 'lead-menu-qr.menu-qr.json', 'qa.menu-qr.json']);
  assert.deepStrictEqual(validate(dir), []);
  assert.throws(() => act(dir, 'lead-nothing', 'start', 'x'));
  assert.throws(() => act(dir, 'intern', 'start', 'x'));
  assert.throws(() => act(dir, 'qa', 'start', 'a ' + dash + ' b'));
  assert.throws(() => act(dir, 'qa', 'start', ''));
  assert.throws(() => act(dir, 'qa', 'start', 'x', 'no-such-venture'));
});

test('HQ office shows the 16 department agents plus one desk per active venture lead', () => {
  const dir = fixture({
    ventures: [venture({ stage: 'building', lead: lead(0), evidence, specPath: 'specs/a.md' }), venture({ id: 'menu-qr', stage: 'validating', lead: lead(1) }), venture({ id: 'resume-fit' })],
    reviews: productOnly,
    activity: { 'lead-invoice-buddy': { state: 'working', task: 'Building the form', ventureId: 'invoice-buddy', since: '2026-11-14T05:00:00Z' } },
    files: specFile
  });
  const hq = buildHq(dir);
  assert.strictEqual(hq.office.length, 18);
  const pod = hq.office.find((a) => a.id === 'lead-invoice-buddy');
  assert.strictEqual(pod.name, lead(0).name);
  assert.strictEqual(pod.department, 'pods');
  assert.strictEqual(pod.state, 'working');
  assert.strictEqual(pod.ventureTitle, 'Invoice Buddy');
  assert.strictEqual(hq.departments.at(-1).id, 'pods');
  assert.strictEqual(hq.office.find((a) => a.id === 'legal').state, 'idle');
  assert.strictEqual(hq.ventures.find((v) => v.id === 'invoice-buddy').lead.name, lead(0).name);
  assert.deepStrictEqual(Object.keys(hq.ventures[0].reviews), config.reviewsToGoLive);
  assert.strictEqual(hq.ventures.find((v) => v.id === 'invoice-buddy').reviews.product, true);
});

test('HQ data totals money in INR, converts to USD only with a recorded rate, and sorts descending', () => {
  const approved = { id: 'ap-1', ventureId: null, type: 'money', ask: 'x', costINR: 500, status: 'approved', issueUrl: null, createdAt: '2026-11-14T03:00:00Z', decidedBy: 'owner', decidedAt: '2026-11-14T04:00:00Z' };
  const ledger = [
    { date: '2026-11-14', ventureId: 'invoice-buddy', type: 'revenue', amountINR: 1000, note: 'Sales', source: 'payment dashboard' },
    { date: '2026-11-14', ventureId: null, type: 'cost', amountINR: 400, note: 'Tool', source: 'invoice', approvalId: 'ap-1' }
  ];
  const ventures = [venture({ id: 'low-score', score: { demand: 1, speedToRevenue: 1, buildEffort: 1, distribution: 1, total: 4 } }), venture()];
  const noFxCfg = JSON.parse(JSON.stringify(config));
  noFxCfg.fx = { usdInr: null, asOf: null, source: null };
  const noFx = buildHq(fixture({ config: noFxCfg, ventures, ledger, approvals: [approved] }));
  assert.deepStrictEqual([noFx.money.revenueINR, noFx.money.costINR, noFx.money.netINR, noFx.money.netUSD], [1000, 400, 600, null]);
  assert.strictEqual(noFx.ventures[0].id, 'invoice-buddy');
  const cfg = JSON.parse(JSON.stringify(config));
  cfg.fx = { usdInr: 100, asOf: '2026-11-14', source: 'https://example.com/rate' };
  assert.strictEqual(buildHq(fixture({ config: cfg, ventures, ledger, approvals: [approved] })).money.netUSD, 6);
});

test('migration moves the single-file brain to one file per item and gives worked ventures a lead', () => {
  const dir = fixture({});
  const c = (n) => path.join(dir, 'company', n);
  fs.writeFileSync(c('ventures.json'), JSON.stringify([venture(), venture({ id: 'menu-qr', stage: 'validating' })]));
  fs.writeFileSync(c('approvals.json'), JSON.stringify([]));
  fs.writeFileSync(c('activity.json'), JSON.stringify({ ops: { state: 'done', task: 'Standup', ventureId: null, since: '2026-11-14T05:00:00Z' } }));
  fs.writeFileSync(c('log.json'), JSON.stringify([{ at: '2026-11-14T05:00:00Z', agent: 'ops', action: 'Standup', ventureId: null }, { at: '2026-11-14T05:01:00Z', agent: 'research', action: 'Found it', ventureId: 'menu-qr' }]));
  migrate(dir);
  for (const old of ['ventures.json', 'approvals.json', 'activity.json', 'log.json']) assert.ok(!fs.existsSync(c(old)), old);
  assert.ok(fs.existsSync(c('log/research.menu-qr.json')));
  assert.strictEqual(JSON.parse(fs.readFileSync(c('ventures/menu-qr.json'), 'utf8')).lead.name, config.leads[0].name);
  assert.strictEqual(JSON.parse(fs.readFileSync(c('ventures/invoice-buddy.json'), 'utf8')).lead, null);
  assert.deepStrictEqual(validate(dir), []);
  assert.deepStrictEqual(migrate(dir), []);
});

test('migration never hangs when lead names run out, and leaves the old brain whole on failure', () => {
  const dir = fixture({});
  const c = (n) => path.join(dir, 'company', n);
  const cfg = JSON.parse(fs.readFileSync(c('config.json'), 'utf8'));
  cfg.leads = cfg.leads.slice(0, 1);
  cfg.wip.pods = 5;
  fs.writeFileSync(c('config.json'), JSON.stringify(cfg));
  const old = [venture({ stage: 'validating' }), venture({ id: 'menu-qr', stage: 'validating' })];
  fs.writeFileSync(c('ventures.json'), JSON.stringify(old));
  assert.throws(() => migrate(dir), /No free lead names/);
  assert.ok(fs.existsSync(c('ventures.json')));
});

test('migration gives no lead to stopped ventures and parks validating extras beyond the pod limit', () => {
  const dir = fixture({});
  const c = (n) => path.join(dir, 'company', n);
  const sc = (t) => ({ demand: 3, speedToRevenue: 3, buildEffort: 2, distribution: t - 8, total: t });
  const old = [0, 1, 2, 3].map((i) => venture({ id: 'idea-' + 'abcd'[i], stage: 'validating', score: sc(10 + i) }))
    .concat([venture({ id: 'dead-one', stage: 'killed', killReason: 'No demand', evidence })]);
  fs.writeFileSync(c('ventures.json'), JSON.stringify(old));
  migrate(dir);
  const read = (id) => JSON.parse(fs.readFileSync(c('ventures/' + id + '.json'), 'utf8'));
  assert.strictEqual(read('idea-a').stage, 'idea');
  assert.strictEqual(read('idea-a').lead, null);
  assert.strictEqual(read('idea-d').stage, 'validating');
  assert.strictEqual(read('dead-one').lead, null);
  assert.deepStrictEqual(validate(dir), []);
});

test('push.sh lets two parallel agents publish without losing work, and stops on a real conflict', () => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'vc-push-'));
  const sh = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'pipe', env: Object.assign({}, process.env, { GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@t', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@t' }) }).toString();
  const seed = fixture({ ventures: [venture({ stage: 'validating', lead: lead(0) }), venture({ id: 'menu-qr', stage: 'validating', lead: lead(1) })] });
  fs.cpSync(path.join(ROOT, 'scripts'), path.join(seed, 'scripts'), { recursive: true });
  sh('git init -q -b main && git add -A && git commit -qm seed', seed);
  sh(`git clone -q --bare ${seed} remote.git`, base);
  sh('git clone -q remote.git a && git clone -q remote.git b', base);
  const A = path.join(base, 'a'), B = path.join(base, 'b');
  const push = (cwd) => spawnSync('bash', ['scripts/push.sh'], { cwd, env: Object.assign({}, process.env, { PUSH_CHECK: 'node scripts/validate.js', GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@t', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@t' }) });
  // Two pods both use the shared QA reviewer, then publish one after the other.
  act(A, 'lead-invoice-buddy', 'start', 'Pod A work', 'invoice-buddy', '2026-11-14T05:00:00Z');
  act(A, 'qa', 'start', 'Testing invoice buddy', 'invoice-buddy', '2026-11-14T05:01:00Z');
  sh('git add -A && git commit -qm a', A);
  act(B, 'lead-menu-qr', 'start', 'Pod B work', 'menu-qr', '2026-11-14T05:02:00Z');
  act(B, 'qa', 'start', 'Testing menu qr', 'menu-qr', '2026-11-14T05:03:00Z');
  sh('git add -A && git commit -qm b', B);
  assert.strictEqual(push(A).status, 0);
  assert.strictEqual(push(B).status, 0);
  sh('git clone -q remote.git check', base);
  const C = path.join(base, 'check');
  const logs = fs.readdirSync(path.join(C, 'company/log')).sort();
  assert.ok(logs.includes('lead-invoice-buddy.invoice-buddy.json') && logs.includes('lead-menu-qr.menu-qr.json'));
  assert.ok(logs.includes('qa.invoice-buddy.json') && logs.includes('qa.menu-qr.json'), 'both QA log files kept');
  assert.strictEqual(JSON.parse(fs.readFileSync(path.join(C, 'company/activity/qa.json'), 'utf8')).task, 'Testing menu qr');
  // A real conflict on a venture file stops the push and leaves main untouched.
  const vf = (d) => path.join(d, 'company/ventures/menu-qr.json');
  sh('git pull -q --rebase origin main', A);
  for (const [d, why] of [[A, 'Reason A'], [C, 'Reason C']]) {
    const v = JSON.parse(fs.readFileSync(vf(d), 'utf8')); v.nextAction = why; fs.writeFileSync(vf(d), JSON.stringify(v));
    sh('git commit -qam edit', d);
  }
  assert.strictEqual(push(C).status, 0);
  assert.strictEqual(push(A).status, 2);
  assert.strictEqual(sh('git log -1 --format=%s origin/main', A).trim(), 'edit');
  // Checks that fail only after merging stop the push too.
  sh('git reset -q --hard origin/main', A);
  const bad = JSON.parse(fs.readFileSync(vf(A), 'utf8')); bad.stage = 'building'; fs.writeFileSync(vf(A), JSON.stringify(bad));
  sh('git commit -qam bad', A);
  assert.strictEqual(push(A).status, 3);
});
