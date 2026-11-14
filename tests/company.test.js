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
    config: overrides.config || config,
    ventures: overrides.ventures || [],
    approvals: overrides.approvals || [],
    ledger: overrides.ledger || [],
    log: overrides.log || []
  };
  for (const [name, data] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, 'company', name + '.json'), JSON.stringify(data, null, 2));
  }
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
  const base = { stage: 'live', evidence, specPath: 'specs/a.md', url: 'https://invoice-buddy.anchit-tandon.com' };
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
    ventures: [venture({ stage: 'live', evidence, specPath: 'specs/a.md', qa: goodQa, url: 'https://invoice-buddy.vercel.app' })],
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
  const noFx = buildHq(fixture({ ventures, ledger, approvals: [approved] }));
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
