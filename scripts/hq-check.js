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
  for (const sub of ['ventures', 'approvals', 'activity', 'log', 'reviews']) fs.rmSync(path.join(dir, 'company', sub), { recursive: true, force: true });
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
  const types = { '.html': 'text/html', '.json': 'application/json', '.js': 'text/javascript' };
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
  for (const [width, height] of [[390, 844], [820, 1180], [1440, 900]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const problems = [];
    page.on('console', (m) => { if (m.type() === 'error') problems.push('console: ' + m.text()); });
    page.on('pageerror', (e) => problems.push('pageerror: ' + e.message));
    page.on('response', (r) => { if (r.status() >= 400) problems.push(`http ${r.status()}: ${r.url()}`); });
    const tag = `hq-${sample ? 'sample' : base ? 'live' : 'local'}-${width}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('.plan .desk', { timeout: 20000 });
    await page.waitForTimeout(400);
    const want = await page.evaluate(() => fetch('data.json', { cache: 'no-store' }).then((r) => r.json()));
    const f = await page.evaluate(() => {
      const st = document.getElementById('stage').getBoundingClientRect();
      const pl = document.querySelector('.plan').getBoundingClientRect();
      return {
        status: document.getElementById('statusText').textContent,
        pageScroll: document.documentElement.scrollHeight - window.innerHeight,
        pageOverflowX: document.documentElement.scrollWidth - window.innerWidth,
        planFits: pl.left >= st.left - 1 && pl.top >= st.top - 1 && pl.right <= st.right + 1 && pl.bottom <= st.bottom + 1,
        planShare: (pl.width * pl.height) / (st.width * st.height),
        rooms: document.querySelectorAll('.proom').length,
        desks: document.querySelectorAll('.plan .desk').length,
        people: document.querySelectorAll('.plan .desk svg.person').length,
        working: document.querySelectorAll('.plan .desk.is-working').length,
        smallTaps: [...document.querySelectorAll('.nav button, .iconbtn')].filter((x) => x.offsetParent && x.getBoundingClientRect().height < 44).length,
        font: getComputedStyle(document.querySelector('.brand')).fontFamily.split(',')[0]
      };
    });
    if (f.pageScroll > 1) problems.push('the page scrolls by ' + f.pageScroll + 'px; it must fit one screen');
    if (f.pageOverflowX > 0) problems.push('horizontal overflow of ' + f.pageOverflowX + 'px');
    if (!f.planFits) problems.push('the floor plan does not fit inside its area');
    if (f.planShare < 0.45) problems.push('the floor plan uses only ' + Math.round(f.planShare * 100) + '% of its area');
    if (f.rooms !== 9) problems.push('expected 9 rooms on the plan, saw ' + f.rooms);
    if (f.desks !== want.office.length || f.people !== f.desks) problems.push(`expected ${want.office.length} people at desks, saw ${f.people} of ${f.desks}`);
    if (f.smallTaps) problems.push(f.smallTaps + ' navigation buttons under 44px');
    if (sample && f.working !== 4) problems.push('sample should show 4 people working, saw ' + f.working);
    await page.screenshot({ path: path.join(shots, tag + '-office.png') });

    // A person opens their record, Escape closes it.
    await page.locator('.plan .desk').nth(6).click();
    if (!(await page.evaluate(() => document.getElementById('detail').open && !!document.getElementById('detailTitle').textContent))) problems.push('person panel did not open');
    await page.keyboard.press('Escape');

    // Step inside a room and back to the floor plan.
    await page.locator('button.plabel').nth(3).click();
    const inside = await page.evaluate(() => ({ room: !!document.querySelector('.roomview .room'), people: document.querySelectorAll('.roomview .desk svg.person').length, scroll: document.documentElement.scrollHeight - window.innerHeight }));
    if (!inside.room || !inside.people) problems.push('stepping inside a room showed nobody');
    if (inside.scroll > 1) problems.push('the page scrolls inside a room');
    await page.screenshot({ path: path.join(shots, tag + '-room.png') });
    await page.locator('#crumb .iconbtn').click();
    if (!(await page.locator('.plan').count())) problems.push('back to floor plan failed');

    // Every section opens from the navigation and never scrolls the page.
    for (const v of ['decisions', 'pipeline', 'activity', 'money']) {
      await page.locator(`.nav button[data-view="${v}"]`).click();
      const vf = await page.evaluate((v) => ({ shown: !document.getElementById('view-' + v).hidden, scroll: document.documentElement.scrollHeight - window.innerHeight, asks: document.querySelectorAll('.ask:not(.done)').length, done: document.querySelectorAll('.ask.done').length, stations: document.querySelectorAll('.station').length, feed: document.querySelectorAll('#feed li').length }), v);
      if (!vf.shown) problems.push(v + ' did not open');
      if (vf.scroll > 1) problems.push(v + ' makes the page scroll');
      if (v === 'decisions' && (vf.asks !== want.approvals.length || vf.done !== (want.decisions || []).length)) problems.push(`decisions shows ${vf.asks} of ${want.approvals.length} waiting and ${vf.done} of ${(want.decisions || []).length} decided`);
      if (v === 'pipeline' && vf.stations !== 9) problems.push('pipeline shows ' + vf.stations + ' stages');
      if (v === 'activity' && !vf.feed) problems.push('activity is empty');
      await page.screenshot({ path: path.join(shots, `${tag}-${v}.png`) });
    }
    await page.locator('#helpBtn').click();
    if (await page.locator('#view-help').isHidden()) problems.push('how it works did not open');
    await page.locator('.nav button[data-view="office"]').click();

    // Replay acts out real log lines on the floor plan.
    await page.locator('#replay').click();
    await page.waitForTimeout(3200);
    const acting = await page.locator('.plan .desk.is-acting').count();
    const now = await page.locator('#now').textContent();
    if (!acting || !/of \d+/.test(now)) problems.push('replay did not act out any log line: ' + now);
    await page.screenshot({ path: path.join(shots, tag + '-replay.png') });
    await page.locator('#replay').click();
    if ((await page.locator('#replay .lbl').textContent()) !== 'Replay today') problems.push('replay did not stop');

    console.log(`${problems.length ? 'FAIL' : 'PASS'} ${width}x${height} | "${f.status.slice(0, 60)}" | rooms ${f.rooms} | people ${f.people} (${f.working} working) | plan fills ${Math.round(f.planShare * 100)}% | page scroll ${f.pageScroll} | font ${f.font}`);
    for (const p of problems) console.log('   ' + p);
    if (problems.length) failed = true;
    await page.close();
  }
  await browser.close();
  if (server) server.close();
  process.exit(failed ? 1 : 0);
})();
