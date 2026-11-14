// QA's browser check for a live product: loads the URL at 390, 820 and 1440 px and counts
// console errors caused by the product itself.
// Cloudflare sits in front of anchit-tandon.com and injects two scripts into every page (its
// analytics beacon and a bot check whose inline code changes on every request). The product's
// strict security rules block them, which logs errors that have nothing to do with the product
// and do not affect users. This check removes exactly those two injections before the page
// runs, so every remaining error is the product's own and must be zero.
// Usage: NODE_PATH=<scratch>/node_modules node scripts/qa-check.js https://<id>.anchit-tandon.com


const BEACON = /<script[^>]*static\.cloudflareinsights\.com[^>]*><\/script>/g;
const BOT_CHECK = /<script>\(function\(\)\{function c\(\)\{[\s\S]*?__CF\$cv\$params[\s\S]*?<\/script>/g;

function stripHostingScripts(html) {
  return html.replace(BEACON, '').replace(BOT_CHECK, '');
}

async function check(url) {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const out = [];
  try {
    for (const [w, h] of [[390, 844], [820, 1180], [1440, 900]]) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      const errors = [];
      let stripped = 0;
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
      page.on('pageerror', (e) => errors.push('uncaught: ' + e.message.slice(0, 200)));
      await page.route('**/*', async (route) => {
        const req = route.request();
        if (req.resourceType() !== 'document') return route.continue();
        const res = await route.fetch();
        const body = await res.text();
        const clean = stripHostingScripts(body);
        if (clean !== body) stripped++;
        return route.fulfill({ response: res, body: clean });
      });
      const res = await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      out.push({ width: w, status: res ? res.status() : 0, consoleErrors: errors.length, errors, horizontalScroll: overflow, cloudflareScriptsRemoved: stripped > 0 });
      await page.close();
    }
  } finally { await browser.close(); }
  return out;
}

module.exports = { stripHostingScripts, check };

if (require.main === module) {
  const url = process.argv[2];
  if (!/^https:\/\//.test(url || '')) { console.error('Usage: node scripts/qa-check.js https://<id>.anchit-tandon.com'); process.exit(1); }
  check(url).then((rows) => {
    for (const r of rows) console.log(`${r.width}px: HTTP ${r.status}, ${r.consoleErrors} console errors from the product${r.horizontalScroll ? ', SIDEWAYS SCROLL' : ''}${r.cloudflareScriptsRemoved ? ' (Cloudflare scripts removed first)' : ''}${r.errors.length ? '\n  ' + r.errors.join('\n  ') : ''}`);
    const ok = rows.every((r) => r.status === 200 && r.consoleErrors === 0 && !r.horizontalScroll);
    console.log(ok ? 'PASS' : 'FAIL');
    process.exit(ok ? 0 : 1);
  }).catch((e) => { console.error(e); process.exit(1); });
}
