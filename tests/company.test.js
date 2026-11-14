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
  for (const [file, lines] of Object.entries(o.logs || {})) w(`company/log/${file}`, lines);
  for (const [rel, text] of Object.entries(o.files || {})) w(rel, text);
  fs.cpSync(path.join(ROOT, 'agents'), path.join(dir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'hq/public'), { recursive: true });
  return dir;
}

const evidence = [1, 2, 3].map((i) => ({ claim: 'Signal ' + i, url: 'https://example.com/' + i, foundAt: '2026-11-14' }));
const goodQa = { passed: true, reviewer: 'qa', viewports: [390, 820, 1440], consoleErrors: 0, checkedAt: '2026-11-14T10:00:00Z' };
const passed = { passed: true, at: '2026-11-14T10:00:00Z', notes: 'ok' };
const goodReviews = { product: passed, engineer: passed, design: passed, security: passed, legal: passed };
const lead = (i) => config.leads[i];

function venture(extra = {}) {
  return Object.assign({
    id: 'invoice-buddy', title: 'Invoice Buddy', oneLiner: 'GST invoices in one minute for freelancers',
    customer: 'Indian freelancers', revenueModel: 'One-time purchase', priceINR: 199, stage: 'idea',
    score: { demand: 3, speedToRevenue: 4, buildEffort: 4, distribution: 2, total: 13 },
    evidence: [], specPath: null, url: null, qa: null, reviews: {}, metrics: null, lead: null,
    nextAction: 'Research demand', createdAt: '2026-11-14T03:00:00Z', updatedAt: '2026-11-14T03:00:00Z', killReason: null
  }, extra);
}
const rules = (dir) => validate(dir).map((e) => e.rule);
const liveBase = { stage: 'live', evidence, specPath: 'specs/a.md', url: 'https://invoice-buddy.anchit-tandon.com', qa: goodQa, reviews: goodReviews, lead: lead(0) };
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
  const clash = fixture({ ventures: [venture({ stage: 'validating', lead: { name: 'Arya', color: '#123456' } })] });
  assert.ok(rules(clash).includes('lead'));
});

test('several ventures run in parallel up to the pod limit, not beyond', () => {
  const v = (i, stage) => venture({ id: 'venture-' + 'abcdef'[i], stage, lead: lead(i), evidence, specPath: 'specs/a.md' });
  const three = fixture({ ventures: [v(0, 'validating'), v(1, 'building'), v(2, 'qa')], files: specFile });
  assert.deepStrictEqual(validate(three), []);
  const four = fixture({ ventures: [v(0, 'validating'), v(1, 'building'), v(2, 'qa'), v(3, 'spec')], files: specFile });
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

test('a venture cannot go live without independent QA on all three screen sizes', () => {
  const cases = [null, Object.assign({}, goodQa, { passed: false }), Object.assign({}, goodQa, { viewports: [390, 1440] }),
    Object.assign({}, goodQa, { consoleErrors: 2 }), Object.assign({}, goodQa, { reviewer: 'engineer' })];
  for (const qa of cases) assert.ok(rules(fixture({ ventures: [venture(Object.assign({}, liveBase, { qa }))], files: specFile })).includes('qa'), JSON.stringify(qa));
  assert.deepStrictEqual(validate(fixture({ ventures: [venture(liveBase)], files: specFile })), []);
});

test('a venture cannot go live without product, engineering, design, security and legal sign-off', () => {
  for (const missing of config.reviewsToGoLive) {
    const reviews = Object.assign({}, goodReviews);
    delete reviews[missing];
    const errs = validate(fixture({ ventures: [venture(Object.assign({}, liveBase, { reviews }))], files: specFile }));
    assert.ok(errs.some((e) => e.rule === 'review' && e.message.includes(missing)), missing);
  }
  const failed = Object.assign({}, goodReviews, { legal: { passed: false, at: '2026-11-14T10:00:00Z' } });
  assert.ok(rules(fixture({ ventures: [venture(Object.assign({}, liveBase, { reviews: failed }))], files: specFile })).includes('review'));
});

test('a live venture must sit on its own subdomain of the owner domain', () => {
  assert.ok(rules(fixture({ ventures: [venture(Object.assign({}, liveBase, { url: 'https://invoice-buddy.vercel.app' }))], files: specFile })).includes('url'));
});

test('venture ids are unique, subdomain safe, not reserved, and match their file name', () => {
  assert.ok(rules(fixture({ ventures: [venture({ id: 'Bad_Name' })] })).includes('id'));
  assert.ok(rules(fixture({ ventures: [venture({ id: 'kits' })] })).includes('id'));
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
});

test('HQ data totals money in INR, converts to USD only with a recorded rate, and sorts descending', () => {
  const approved = { id: 'ap-1', ventureId: null, type: 'money', ask: 'x', costINR: 500, status: 'approved', issueUrl: null, createdAt: '2026-11-14T03:00:00Z', decidedBy: 'owner', decidedAt: '2026-11-14T04:00:00Z' };
  const ledger = [
    { date: '2026-11-14', ventureId: 'invoice-buddy', type: 'revenue', amountINR: 1000, note: 'Sales', source: 'payment dashboard' },
    { date: '2026-11-14', ventureId: null, type: 'cost', amountINR: 400, note: 'Tool', source: 'invoice', approvalId: 'ap-1' }
  ];
  const ventures = [venture({ id: 'low-score', score: { demand: 1, speedToRevenue: 1, buildEffort: 1, distribution: 1, total: 4 } }), venture()];
  const noFx = buildHq(fixture({ ventures, ledger, approvals: [approved] }));
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
