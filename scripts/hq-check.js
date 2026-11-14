#!/usr/bin/env node
// Browser check for HQ at phone, tablet and desktop widths.
// Usage: NODE_PATH=<dir with playwright>/node_modules node scripts/hq-check.js [baseUrl] [--sample]
//   no baseUrl: serves hq/public locally
//   --sample:   a busy made-up company state, to test layout under load (never published)
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { chromium } = require('playwright');
const { buildHq } = require('./build-hq.js');

const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2);
const sample = args.includes('--sample');
const base = args.find((a) => /^https?:/.test(a));
const pub = path.join(ROOT, 'hq', 'public');
const shots = path.join(ROOT, 'shots');

function sampleState() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hq-sample-'));
  fs.cpSync(path.join(ROOT, 'company'), path.join(dir, 'company'), { recursive: true });
  const put = (rel, v) => { const f = path.join(dir, 'company', rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(v)); };
  const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'company/config.json'), 'utf8'));
  const t = (h) => new Date(Date.now() - h * 3600e3).toISOString();
  const ev = [1, 2, 3].map((i) => ({ claim: 'c' + i, url: 'https://example.com/' + i, foundAt: '2026-11-14' }));
  const ok = { passed: true, at: t(3) };
  const v = (id, title, oneLiner, stage, total, extra) => Object.assign({ id, title, oneLiner, customer: 'Indian freelancers', revenueModel: 'One-time', priceINR: null, stage, score: { demand: 4, speedToRevenue: 4, buildEffort: 4, distribution: total - 12, total }, evidence: [], specPath: null, url: null, qa: null, reviews: {}, metrics: null, lead: null, nextAction: 'Wait for a turn', createdAt: t(30), updatedAt: t(1), killReason: null }, extra || {});
  const ventures = [
    v('invoice-buddy', 'Invoice Buddy', 'GST invoices in one minute', 'live', 17, { lead: cfg.leads[0], priceINR: 199, url: 'https://invoice-buddy.anchit-tandon.com', evidence: ev, specPath: 'specs/x.md', metrics: { paidOrders: 24 }, nextAction: 'Add a sample invoice to the first screen', qa: { passed: true }, reviews: { product: ok, engineer: ok, design: ok, security: ok, legal: ok } }),
    v('rent-receipt', 'Rent Receipt Maker with a very long product name that has to wrap properly', 'HRA rent receipts for the whole year in one PDF', 'building', 16, { lead: cfg.leads[1], priceINR: 99, evidence: ev, specPath: 'specs/y.md', nextAction: 'Finish PDF export', reviews: { product: ok } }),
    v('menu-qr', 'Menu QR', 'QR menus for small cafes', 'validating', 14, { lead: cfg.leads[2], evidence: ev.slice(0, 1), nextAction: 'Find 2 more sources' }),
    v('wedding-budget', 'Wedding Budget', 'A cost planner for Indian weddings', 'spec', 14, { lead: cfg.leads[3], evidence: ev, specPath: 'specs/z.md', nextAction: 'Spec review by Rohan' }),
    v('resume-fit', 'Resume Fit', 'Checks a resume against a job post', 'idea', 13),
    v('pet-names', 'Pet Name Finder', 'Names for pets', 'killed', 13, { killReason: 'Free everywhere, nobody pays' })
  ];
  for (const x of ventures) put('ventures/' + x.id + '.json', x);
  put('approvals/ap-invoice-buddy-1.json', { id: 'ap-invoice-buddy-1', ventureId: 'invoice-buddy', type: 'public-post', ask: 'Publish the Invoice Buddy launch post in two freelancer communities', costINR: 0, status: 'pending', issueUrl: 'https://github.com/Anchit-AI-Hustle/virtual-company/issues/1', createdAt: t(2), decidedBy: null, decidedAt: null });
  const acts = {
    ops: { state: 'working', task: 'Running the afternoon cycle', ventureId: null, since: t(0.2) },
    'lead-rent-receipt': { state: 'working', task: 'Building the PDF export', ventureId: 'rent-receipt', since: t(0.4) },
    'lead-menu-qr': { state: 'working', task: 'Searching cafe owner forums for paid menu tools', ventureId: 'menu-qr', since: t(0.1) },
    product: { state: 'working', task: 'Reviewing the Wedding Budget spec', ventureId: 'wedding-budget', since: t(0.3) },
    qa: { state: 'done', task: 'Passed Invoice Buddy on the live URL', ventureId: 'invoice-buddy', since: t(3) },
    sales: { state: 'blocked', task: 'No payment rail approved yet', ventureId: 'invoice-buddy', since: t(5) }
  };
  for (const [k, x] of Object.entries(acts)) put('activity/' + k + '.json', x);
  const team = JSON.parse(fs.readFileSync(path.join(ROOT, 'company/team.json'), 'utf8'));
  const people = team.map((m) => m.id).concat(['lead-invoice-buddy', 'lead-rent-receipt', 'lead-menu-qr', 'lead-wedding-budget']);
  people.forEach((id, i) => { const vid = i % 2 ? 'invoice-buddy' : 'rent-receipt'; put(`log/${id}.${vid}.json`, [{ at: t(i * 0.6), agent: id, action: 'Did a real piece of work for this cycle and wrote it down for the next role', ventureId: vid }]); });
  return buildHq(dir);
}

const payload = sample ? sampleState() : null;
function localData() { return payload || JSON.parse(fs.readFileSync(path.join(pub, 'data.json'), 'utf8')); }

function serve() {
  const types = { '.html': 'text/html', '.json': 'application/json' };
  const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];
    const file = path.join(pub, url === '/' ? 'index.html' : url);
    if (!file.startsWith(pub) || !fs.existsSync(file)) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'text/plain' });
    res.end(url === '/data.json' ? JSON.stringify(localData()) : fs.readFileSync(file));
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

(async () => {
  fs.mkdirSync(shots, { recursive: true });
  const server = base ? null : await serve();
  const url = base || `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch();
  let failed = false;
  for (const width of [390, 820, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width < 500 ? 844 : 1000 } });
    const problems = [];
    page.on('console', (m) => { if (m.type() === 'error') problems.push('console: ' + m.text()); });
    page.on('pageerror', (e) => problems.push('pageerror: ' + e.message));
    page.on('response', (r) => { if (r.status() >= 400) problems.push(`http ${r.status()}: ${r.url()}`); });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => !/Opening the office/.test(document.getElementById('status').textContent), null, { timeout: 20000 });
    const facts = await page.evaluate(() => ({
      status: document.getElementById('status').textContent,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      rooms: document.querySelectorAll('.room').length,
      desks: document.querySelectorAll('.desk').length,
      working: document.querySelectorAll('.desk.is-working').length,
      stations: document.querySelectorAll('.station').length,
      cards: document.querySelectorAll('.card').length,
      feed: document.querySelectorAll('#feed li').length,
      smallTaps: [...document.querySelectorAll('.desk, .card, .btn')].filter((a) => a.getBoundingClientRect().height < 44).length,
      font: getComputedStyle(document.getElementById('status')).fontFamily.split(',')[0]
    }));
    if (/did not load/.test(facts.status)) problems.push('data failed to load');
    if (facts.overflow > 0) problems.push('horizontal overflow of ' + facts.overflow + 'px');
    const want = await page.evaluate(() => fetch('data.json', { cache: 'no-store' }).then((r) => r.json()));
    if (facts.rooms !== want.departments.length) problems.push(`expected ${want.departments.length} rooms, saw ${facts.rooms}`);
    if (facts.desks !== want.office.length || facts.desks < 16) problems.push(`expected ${want.office.length} desks, saw ${facts.desks}`);
    if (facts.stations !== 9) problems.push('expected 9 stages, saw ' + facts.stations);
    if (facts.smallTaps) problems.push(facts.smallTaps + ' tap targets under 44px');
    if (sample && (facts.working !== 4 || facts.cards !== 6 || facts.rooms !== 7 || facts.desks !== 20)) problems.push(`sample should show 7 rooms, 20 desks, 4 working and 6 cards, saw ${facts.rooms}, ${facts.desks}, ${facts.working} and ${facts.cards}`);

    // Open a desk, then a product, and make sure each panel shows real content and closes.
    await page.locator('.desk').nth(6).click();
    const agentPanel = await page.evaluate(() => ({ open: document.getElementById('detail').open, title: document.getElementById('detailTitle').textContent, overflow: document.getElementById('detail').scrollWidth - document.getElementById('detail').clientWidth }));
    if (!agentPanel.open || !agentPanel.title) problems.push('desk panel did not open');
    if (agentPanel.overflow > 0) problems.push('desk panel overflows sideways');
    await page.screenshot({ path: path.join(shots, `hq-${sample ? 'sample' : base ? 'live' : 'local'}-${width}-desk.png`) });
    await page.keyboard.press('Escape');
    if (await page.evaluate(() => document.getElementById('detail').open)) problems.push('desk panel did not close with Escape');
    if (facts.cards) {
      await page.locator('.card').first().click();
      const vp = await page.evaluate(() => ({ open: document.getElementById('detail').open, checks: document.querySelectorAll('.checks li').length }));
      if (!vp.open || vp.checks !== 8) problems.push('product panel did not open with its 8 checks');
      await page.screenshot({ path: path.join(shots, `hq-${sample ? 'sample' : base ? 'live' : 'local'}-${width}-venture.png`) });
      await page.locator('.close').click();
    }

    await page.screenshot({ path: path.join(shots, `hq-${sample ? 'sample' : base ? 'live' : 'local'}-${width}.png`), fullPage: true });
    console.log(`${problems.length ? 'FAIL' : 'PASS'} ${width}px | "${facts.status}" | rooms ${facts.rooms} | desks ${facts.desks} (${facts.working} working) | cards ${facts.cards} | feed ${facts.feed} | overflow ${facts.overflow} | font ${facts.font}`);
    for (const p of problems) console.log('   ' + p);
    if (problems.length) failed = true;
    await page.close();
  }
  await browser.close();
  if (server) server.close();
  process.exit(failed ? 1 : 0);
})();
