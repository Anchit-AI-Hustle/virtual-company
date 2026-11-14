#!/usr/bin/env node
// Browser check for the HQ page at phone, tablet and desktop widths.
// Usage: NODE_PATH=<dir with playwright>/node_modules node scripts/hq-check.js [baseUrl] [--sample]
// With no baseUrl it serves hq/public locally. --sample swaps in a busy made-up state to test layout.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const sample = args.includes('--sample');
const base = args.find((a) => /^https?:/.test(a));
const pub = path.join(__dirname, '..', 'hq', 'public');
const shots = path.join(__dirname, '..', 'shots');

const SAMPLE = {
  builtAt: new Date().toISOString(),
  company: { name: 'Venture HQ', domain: 'anchit-tandon.com', owner: 'Anchit Tandon' },
  stages: ['idea', 'validating', 'validated', 'spec', 'building', 'qa', 'live', 'scaling', 'killed'],
  wip: { building: 1, liveTests: 3, openIdeas: 12 },
  money: { revenueINR: 4776, costINR: 900, netINR: 3876, revenueUSD: 50.27, costUSD: 9.47, netUSD: 40.8, fx: { usdInr: 95, asOf: '2026-11-14', source: 'https://example.com' }, monthlyCapINR: 2000 },
  approvals: [
    { id: 'ap-2', type: 'public-post', ask: 'Publish the launch post for Invoice Buddy in two freelancer communities, text attached in the issue', costINR: 0, createdAt: '2026-11-14T02:00:00Z', issueUrl: 'https://github.com/Anchit-AI-Hustle/virtual-company/issues/2' },
    { id: 'ap-1', type: 'money', ask: 'Spend on a payment gateway setup fee', costINR: 900, createdAt: '2026-11-13T02:00:00Z', issueUrl: 'https://github.com/Anchit-AI-Hustle/virtual-company/issues/1' }
  ],
  ventures: [
    { id: 'invoice-buddy', title: 'Invoice Buddy', oneLiner: 'GST invoices in one minute for freelancers', stage: 'live', score: 17, priceINR: 199, url: 'https://invoice-buddy.anchit-tandon.com', nextAction: 'Add a sample invoice to the first screen', metrics: { signups: 41, paidOrders: 24 }, evidenceCount: 5 },
    { id: 'rent-receipt', title: 'Rent Receipt Maker with a very long product name that has to wrap properly', oneLiner: 'HRA rent receipts for the whole year in one PDF, ready for the employer portal', stage: 'building', score: 16, priceINR: 99, url: null, nextAction: 'Finish PDF export and the pay screen', metrics: null, evidenceCount: 4 },
    { id: 'menu-qr', title: 'Menu QR', oneLiner: 'QR menus for small cafes', stage: 'validating', score: 14, priceINR: null, url: null, nextAction: 'Find 3 sources showing cafes pay for this', metrics: null, evidenceCount: 1 },
    { id: 'resume-fit', title: 'Resume Fit', oneLiner: 'Checks a resume against a job post', stage: 'idea', score: 13, priceINR: null, url: null, nextAction: 'Wait for a turn', metrics: null, evidenceCount: 0 },
    { id: 'wedding-budget', title: 'Wedding Budget Sheet', oneLiner: 'A planner for Indian wedding costs', stage: 'idea', score: 12, priceINR: null, url: null, nextAction: 'Wait for a turn', metrics: null, evidenceCount: 0 },
    { id: 'pet-names', title: 'Pet Name Finder', oneLiner: 'Names for pets', stage: 'killed', score: 6, priceINR: null, url: null, nextAction: null, killReason: 'Free everywhere, nobody pays', metrics: null, evidenceCount: 0 }
  ],
  team: ['ceo', 'research', 'product', 'engineer', 'qa', 'growth', 'support', 'finance'].map((agent, i) => ({ agent, last: i === 6 ? null : { at: '2026-11-14T03:00:00Z', agent, action: 'Did the work for this cycle and wrote it down in the books for the next role' } })),
  log: Array.from({ length: 8 }, (_, i) => ({ at: `2026-11-1${4 - (i > 4 ? 1 : 0)}T0${i}:00:00Z`, agent: 'ceo', action: 'Picked Rent Receipt Maker to build next because it has the highest score among proven ideas', ventureId: 'rent-receipt' }))
};

function serve() {
  const types = { '.html': 'text/html', '.json': 'application/json' };
  const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];
    if (sample && url === '/data.json') { res.writeHead(200, { 'content-type': 'application/json' }); return res.end(JSON.stringify(SAMPLE)); }
    const file = path.join(pub, url === '/' ? 'index.html' : url);
    if (!file.startsWith(pub) || !fs.existsSync(file)) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'text/plain' });
    res.end(fs.readFileSync(file));
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
    await page.waitForFunction(() => !/Opening the books/.test(document.getElementById('status').textContent), null, { timeout: 15000 });
    const facts = await page.evaluate(() => ({
      status: document.getElementById('status').textContent,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      stations: document.querySelectorAll('.station').length,
      cards: document.querySelectorAll('.card').length,
      asks: document.querySelectorAll('.ask').length,
      team: document.querySelectorAll('.team li').length,
      smallTaps: [...document.querySelectorAll('.ask a')].filter((a) => a.getBoundingClientRect().height < 44).length,
      font: getComputedStyle(document.getElementById('status')).fontFamily.split(',')[0]
    }));
    if (/did not load/.test(facts.status)) problems.push('data failed to load');
    if (facts.overflow > 0) problems.push('horizontal overflow of ' + facts.overflow + 'px');
    if (facts.stations !== 9) problems.push('expected 9 stages, saw ' + facts.stations);
    if (facts.team !== 8) problems.push('expected 8 roles, saw ' + facts.team);
    if (facts.smallTaps) problems.push(facts.smallTaps + ' tap targets under 44px');
    if (sample && (facts.cards !== 6 || facts.asks !== 2)) problems.push(`sample should show 6 cards and 2 asks, saw ${facts.cards} and ${facts.asks}`);
    const shot = path.join(shots, `hq-${sample ? 'sample' : (base ? 'live' : 'local')}-${width}.png`);
    await page.screenshot({ path: shot, fullPage: true });
    console.log(`${problems.length ? 'FAIL' : 'PASS'} ${width}px | "${facts.status}" | cards ${facts.cards} | asks ${facts.asks} | overflow ${facts.overflow} | font ${facts.font}`);
    for (const p of problems) console.log('   ' + p);
    if (problems.length) failed = true;
    await page.close();
  }
  await browser.close();
  if (server) server.close();
  process.exit(failed ? 1 : 0);
})();
