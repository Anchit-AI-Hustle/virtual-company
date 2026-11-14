// Acceptance tests for the company brain. Written before the validator.
// Run: node --test tests/*.test.js
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { validate } = require('../scripts/validate.js');
const { buildHq } = require('../scripts/build-hq.js');

const ROOT = path.join(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'company/config.json'), 'utf8'));

function fixture(overrides = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vc-'));
  fs.mkdirSync(path.join(dir, 'company'));
  fs.mkdirSync(path.join(dir, 'specs'));
  const files = {
    team: overrides.team || JSON.parse(fs.readFileSync(path.join(ROOT, 'company/team.json'), 'utf8')),
    departments: JSON.parse(fs.readFileSync(path.join(ROOT, 'company/departments.json'), 'utf8')),
    activity: overrides.activity || {},
    config: overrides.config || config,
    ventures: overrides.ventures || [],
    approvals: overrides.approvals || [],
    ledger: overrides.ledger || [],
    log: overrides.log || []
  };
  for (const [name, data] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, 'company', name + '.json'), JSON.stringify(data, null, 2));
  }
  fs.cpSync(path.join(ROOT, 'agents'), path.join(dir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'hq/public'), { recursive: true });
  for (const [rel, text] of Object.entries(overrides.files || {})) {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), text);
  }
  return dir;
}

const evidence = [
  { claim: 'People search for this', url: 'https://example.com/a', foundAt: '2026-11-14' },
  { claim: 'Competitor charges for it', url: 'https://example.com/b', foundAt: '2026-11-14' },
  { claim: 'Forum thread asking for it', url: 'https://example.com/c', foundAt: '2026-11-14' }
];
const goodQa = { passed: true, reviewer: 'qa', viewports: [390, 820, 1440], consoleErrors: 0, checkedAt: '2026-11-14T10:00:00Z' };
const passed = { passed: true, at: '2026-11-14T10:00:00Z', notes: 'ok' };
const goodReviews = { design: passed, security: passed, legal: passed };

function venture(extra = {}) {
  return Object.assign({
    id: 'invoice-buddy',
    title: 'Invoice Buddy',
    oneLiner: 'GST invoices in one minute for freelancers',
    customer: 'Indian freelancers',
    revenueModel: 'One-time purchase',
    priceINR: 199,
    stage: 'idea',
    score: { demand: 3, speedToRevenue: 4, buildEffort: 4, distribution: 2, total: 13 },
    evidence: [],
    specPath: null,
    url: null,
    qa: null,
    metrics: null,
    nextAction: 'Research demand',
    createdAt: '2026-11-14T03:00:00Z',
    updatedAt: '2026-11-14T03:00:00Z',
    killReason: null
  }, extra);
}

const errorsOf = (dir) => validate(dir).map((e) => e.rule);

test('the committed company state is valid', () => {
  assert.deepStrictEqual(validate(ROOT), []);
});

test('an idea with no evidence is allowed', () => {
  assert.deepStrictEqual(validate(fixture({ ventures: [venture()] })), []);
});

test('a venture cannot be validated without 3 sourced pieces of evidence', () => {
  const dir = fixture({ ventures: [venture({ stage: 'validated', evidence: evidence.slice(0, 2) })] });
  assert.ok(errorsOf(dir).includes('evidence'));
  const noUrl = fixture({ ventures: [venture({ stage: 'validated', evidence: [evidence[0], evidence[1], { claim: 'x', url: 'trust me' }] })] });
  assert.ok(errorsOf(noUrl).includes('evidence'));
  const ok = fixture({ ventures: [venture({ stage: 'validated', evidence })] });
  assert.deepStrictEqual(validate(ok), []);
});

test('spec stage and later need a spec file that exists', () => {
  const missing = fixture({ ventures: [venture({ stage: 'spec', evidence, specPath: 'specs/invoice-buddy.md' })] });
  assert.ok(errorsOf(missing).includes('spec'));
  const ok = fixture({
    ventures: [venture({ stage: 'spec', evidence, specPath: 'specs/invoice-buddy.md' })],
    files: { 'specs/invoice-buddy.md': '# Spec' }
  });
  assert.deepStrictEqual(validate(ok), []);
});

test('only one venture may be in build or QA at a time', () => {
  const files = { 'specs/a.md': '# a', 'specs/b.md': '# b' };
  const dir = fixture({
    ventures: [
      venture({ id: 'alpha-tool', stage: 'building', evidence, specPath: 'specs/a.md' }),
      venture({ id: 'beta-tool', stage: 'qa', evidence, specPath: 'specs/b.md' })
    ],
    files
  });
  assert.ok(errorsOf(dir).includes('wip'));
});

test('a venture cannot go live without independent QA on all three screen sizes', () => {
  const base = { stage: 'live', evidence, specPath: 'specs/a.md', url: 'https://invoice-buddy.anchit-tandon.com', reviews: goodReviews };
  const files = { 'specs/a.md': '# a' };
  const cases = [
    { qa: null },
    { qa: Object.assign({}, goodQa, { passed: false }) },
    { qa: Object.assign({}, goodQa, { viewports: [390, 1440] }) },
    { qa: Object.assign({}, goodQa, { consoleErrors: 2 }) },
    { qa: Object.assign({}, goodQa, { reviewer: 'engineer' }) }
  ];
  for (const c of cases) {
    const dir = fixture({ ventures: [venture(Object.assign({}, base, c))], files });
    assert.ok(errorsOf(dir).includes('qa'), JSON.stringify(c));
  }
  const ok = fixture({ ventures: [venture(Object.assign({}, base, { qa: goodQa }))], files });
  assert.deepStrictEqual(validate(ok), []);
});

test('a live venture must sit on its own subdomain of the owner domain', () => {
  const files = { 'specs/a.md': '# a' };
  const dir = fixture({
    ventures: [venture({ stage: 'live', evidence, specPath: 'specs/a.md', qa: goodQa, reviews: goodReviews, url: 'https://invoice-buddy.vercel.app' })],
    files
  });
  assert.ok(errorsOf(dir).includes('url'));
});

test('venture ids are unique, subdomain safe and not reserved', () => {
  assert.ok(errorsOf(fixture({ ventures: [venture(), venture()] })).includes('id'));
  assert.ok(errorsOf(fixture({ ventures: [venture({ id: 'Bad_Name' })] })).includes('id'));
  assert.ok(errorsOf(fixture({ ventures: [venture({ id: 'kits' })] })).includes('id'));
});

test('a killed venture records why', () => {
  assert.ok(errorsOf(fixture({ ventures: [venture({ stage: 'killed' })] })).includes('kill'));
  assert.deepStrictEqual(validate(fixture({ ventures: [venture({ stage: 'killed', killReason: 'No demand found in 3 days' })] })), []);
});

test('scores add up', () => {
  const dir = fixture({ ventures: [venture({ score: { demand: 5, speedToRevenue: 5, buildEffort: 5, distribution: 5, total: 3 } })] });
  assert.ok(errorsOf(dir).includes('score'));
});

test('only the owner can decide an approval', () => {
  const pending = { id: 'ap-1', ventureId: null, type: 'money', ask: 'Spend Rs 500 on a domain', costINR: 500, status: 'pending', issueUrl: null, createdAt: '2026-11-14T03:00:00Z', decidedBy: null, decidedAt: null };
  assert.deepStrictEqual(validate(fixture({ approvals: [pending] })), []);
  const selfApproved = Object.assign({}, pending, { status: 'approved', decidedBy: 'ceo', decidedAt: '2026-11-14T04:00:00Z' });
  assert.ok(errorsOf(fixture({ approvals: [selfApproved] })).includes('approval'));
  const ownerApproved = Object.assign({}, pending, { status: 'approved', decidedBy: 'owner', decidedAt: '2026-11-14T04:00:00Z' });
  assert.deepStrictEqual(validate(fixture({ approvals: [ownerApproved] })), []);
});

test('no cost is booked without an owner-approved request, and no revenue without a source', () => {
  const cost = { date: '2026-11-14', ventureId: null, type: 'cost', amountINR: 500, note: 'Domain', source: 'invoice', approvalId: 'ap-1' };
  assert.ok(errorsOf(fixture({ ledger: [cost] })).includes('ledger'));
  const approved = { id: 'ap-1', ventureId: null, type: 'money', ask: 'x', costINR: 500, status: 'approved', issueUrl: null, createdAt: '2026-11-14T03:00:00Z', decidedBy: 'owner', decidedAt: '2026-11-14T04:00:00Z' };
  assert.deepStrictEqual(validate(fixture({ ledger: [cost], approvals: [approved] })), []);
  const overspend = Object.assign({}, cost, { amountINR: 900 });
  assert.ok(errorsOf(fixture({ ledger: [overspend], approvals: [approved] })).includes('ledger'));
  const revenue = { date: '2026-11-14', ventureId: null, type: 'revenue', amountINR: 199, note: 'Sale', source: '' };
  assert.ok(errorsOf(fixture({ ledger: [revenue] })).includes('ledger'));
});

test('log entries come from a real role', () => {
  const dir = fixture({ log: [{ at: '2026-11-14T03:00:00Z', agent: 'intern', action: 'x', ventureId: null }] });
  assert.ok(errorsOf(dir).includes('log'));
});

test('no em or en dashes anywhere in company text', () => {
  const dir = fixture({ ventures: [venture({ oneLiner: 'Fast ' + String.fromCharCode(0x2014) + ' simple' })] });
  assert.ok(errorsOf(dir).includes('dash'));
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
  assert.strictEqual(noFx.money.revenueINR, 1000);
  assert.strictEqual(noFx.money.costINR, 400);
  assert.strictEqual(noFx.money.netINR, 600);
  assert.strictEqual(noFx.money.netUSD, null);
  assert.strictEqual(noFx.ventures[0].id, 'invoice-buddy');
  const cfg = JSON.parse(JSON.stringify(config));
  cfg.fx = { usdInr: 100, asOf: '2026-11-14', source: 'https://example.com/rate' };
  const withFx = buildHq(fixture({ config: cfg, ventures, ledger, approvals: [approved] }));
  assert.strictEqual(withFx.money.netUSD, 6);
});

test('the published HQ data matches the company state', () => {
  const published = JSON.parse(fs.readFileSync(path.join(ROOT, 'hq/public/data.json'), 'utf8'));
  const fresh = buildHq(ROOT);
  delete published.builtAt;
  delete fresh.builtAt;
  assert.deepStrictEqual(published, fresh);
});

test('a venture cannot go live without design, security and legal sign-off', () => {
  const files = { 'specs/a.md': '# a' };
  const base = { stage: 'live', evidence, specPath: 'specs/a.md', url: 'https://invoice-buddy.anchit-tandon.com', qa: goodQa };
  for (const missing of ['design', 'security', 'legal']) {
    const reviews = Object.assign({}, goodReviews);
    delete reviews[missing];
    const dir = fixture({ ventures: [venture(Object.assign({}, base, { reviews }))], files });
    assert.ok(validate(dir).some((e) => e.rule === 'review' && e.message.includes(missing)), missing);
  }
  const failed = Object.assign({}, goodReviews, { legal: { passed: false, at: '2026-11-14T10:00:00Z' } });
  assert.ok(errorsOf(fixture({ ventures: [venture(Object.assign({}, base, { reviews: failed }))], files })).includes('review'));
});

test('every department is staffed and every agent has a name, charter and known department', () => {
  const team = JSON.parse(fs.readFileSync(path.join(ROOT, 'company/team.json'), 'utf8'));
  assert.ok(team.length >= 16);
  const broken = team.map((t) => Object.assign({}, t));
  broken[3].charter = 'agents/nobody.md';
  assert.ok(errorsOf(fixture({ team: broken })).includes('team'));
  const unknown = team.map((t) => Object.assign({}, t));
  unknown[0].department = 'canteen';
  assert.ok(errorsOf(fixture({ team: unknown })).includes('team'));
});

test('every role in the team appears in the cycle runbook', () => {
  const team = JSON.parse(fs.readFileSync(path.join(ROOT, 'company/team.json'), 'utf8'));
  const runbook = fs.readFileSync(path.join(ROOT, 'RUNBOOK-daily.md'), 'utf8') + fs.readFileSync(path.join(ROOT, 'RUNBOOK-weekly.md'), 'utf8');
  for (const t of team) assert.ok(runbook.includes('`' + t.id + '`'), t.id + ' is missing from the runbooks');
});

test('act.js records real status and a log line, and rejects unknown agents and dashes', () => {
  const { act } = require('../scripts/act.js');
  const dir = fixture({});
  act(dir, 'research', 'start', 'Searching for demand', 'invoice-buddy', '2026-11-14T05:00:00Z');
  act(dir, 'research', 'done', 'Found 3 sources', 'invoice-buddy', '2026-11-14T05:10:00Z');
  const activity = JSON.parse(fs.readFileSync(path.join(dir, 'company/activity.json'), 'utf8'));
  assert.deepStrictEqual(activity.research, { state: 'done', task: 'Found 3 sources', ventureId: 'invoice-buddy', since: '2026-11-14T05:10:00Z' });
  const log = JSON.parse(fs.readFileSync(path.join(dir, 'company/log.json'), 'utf8'));
  assert.strictEqual(log.length, 2);
  assert.strictEqual(log[0].action, 'Started: Searching for demand');
  assert.deepStrictEqual(validate(dir), []);
  const hq = JSON.parse(fs.readFileSync(path.join(dir, 'hq/public/data.json'), 'utf8'));
  assert.strictEqual(hq.office.find((a) => a.id === 'research').state, 'done');
  assert.throws(() => act(dir, 'intern', 'start', 'x'));
  assert.throws(() => act(dir, 'qa', 'start', 'a ' + String.fromCharCode(0x2014) + ' b'));
  assert.throws(() => act(dir, 'qa', 'start', ''));
});

test('HQ office lists every agent with department, status and current venture title', () => {
  const dir = fixture({ ventures: [venture()], activity: { engineer: { state: 'working', task: 'Building the form', ventureId: 'invoice-buddy', since: '2026-11-14T05:00:00Z' } } });
  const hq = buildHq(dir);
  assert.strictEqual(hq.office.length, 16);
  const dev = hq.office.find((a) => a.id === 'engineer');
  assert.strictEqual(dev.state, 'working');
  assert.strictEqual(dev.ventureTitle, 'Invoice Buddy');
  assert.strictEqual(hq.office.find((a) => a.id === 'legal').state, 'idle');
  assert.strictEqual(hq.departments.length, 6);
});
