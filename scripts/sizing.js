// Recomputes a venture's market sizing from its cohorts, so the numbers on HQ and the gate
// never depend on arithmetic someone typed by hand.
//   users per cohort    = size x reachable% x paying%
//   earnings per cohort = users x price x purchases per year   (INR, 12 months)
//   likely              = sum of cohort earnings
//   worst, best         = likely x scenario factors
//   expected            = likely x likelihood
const fs = require('node:fs');
const path = require('node:path');

const isUrl = (s) => typeof s === 'string' && /^https?:\/\/[^\s]+\.[^\s]+/.test(s);

function computeSizing(s) {
  const cohorts = (s.cohorts || []).map((c) => {
    const users = Math.round(c.size * (c.reachablePct / 100) * (c.payingPct / 100));
    return { name: c.name, country: c.country, size: c.size, reachablePct: c.reachablePct, payingPct: c.payingPct, priceINR: c.priceINR, purchasesPerYear: c.purchasesPerYear, users, earningsINR: Math.round(users * c.priceINR * c.purchasesPerYear) };
  });
  cohorts.sort((a, b) => b.earningsINR - a.earningsINR);
  const likely = cohorts.reduce((t, c) => t + c.earningsINR, 0);
  const sc = s.scenarios || {};
  return {
    cohorts,
    payingUsers: cohorts.reduce((t, c) => t + c.users, 0),
    worstINR: Math.round(likely * (sc.worstFactor || 0)),
    likelyINR: likely,
    bestINR: Math.round(likely * (sc.bestFactor || 0)),
    likelihoodPct: s.likelihoodPct,
    expectedINR: Math.round(likely * (s.likelihoodPct / 100))
  };
}

// Returns a list of problems; empty means the sizing is complete and clears the bar.
function checkSizing(s, bar) {
  const out = [];
  const p = s.problem || {};
  if (!p.who || !p.frequency || !(p.severity >= 1 && p.severity <= 5)) out.push('problem needs who, frequency and a severity from 1 to 5');
  if (!Array.isArray(p.evidence) || !p.evidence.some((e) => e && e.claim && isUrl(e.url))) out.push('problem needs at least one sourced piece of evidence');
  const cohorts = Array.isArray(s.cohorts) ? s.cohorts : [];
  if (cohorts.length < bar.minCohorts) out.push(`needs at least ${bar.minCohorts} cohorts, has ${cohorts.length}`);
  cohorts.forEach((c, i) => {
    const tag = `cohort ${i + 1} (${c.name || 'unnamed'})`;
    if (!c.name || !c.country) out.push(`${tag}: needs a name and a country`);
    if (!(Number.isFinite(c.size) && c.size > 0)) out.push(`${tag}: size must be a positive number`);
    if (!isUrl(c.sizeSource)) out.push(`${tag}: size needs a source link`);
    for (const k of ['reachablePct', 'payingPct']) if (!(Number.isFinite(c[k]) && c[k] > 0 && c[k] <= 100)) out.push(`${tag}: ${k} must be between 0 and 100`);
    if (!c.reachBasis || !c.payingBasis) out.push(`${tag}: explain the basis for reach and paying shares`);
    if (!(Number.isFinite(c.priceINR) && c.priceINR > 0)) out.push(`${tag}: price in INR must be positive`);
    if (!(Number.isFinite(c.purchasesPerYear) && c.purchasesPerYear > 0)) out.push(`${tag}: purchases per year must be positive`);
  });
  if (!(Number.isFinite(s.likelihoodPct) && s.likelihoodPct > 0 && s.likelihoodPct <= 100)) out.push('likelihoodPct must be between 0 and 100');
  if (!s.likelihoodBasis) out.push('likelihood needs its basis');
  const comps = Array.isArray(s.comparables) ? s.comparables.filter((c) => c && c.name && isUrl(c.url)) : [];
  if (!comps.length) out.push('needs at least one sourced comparable');
  if (s.likelihoodPct > bar.maxLikelihoodPctWithoutComparables && comps.length < 3) out.push(`a likelihood above ${bar.maxLikelihoodPctWithoutComparables}% needs at least 3 sourced comparables`);
  const sc = s.scenarios || {};
  if (!(sc.worstFactor >= 0 && sc.worstFactor < 1 && sc.bestFactor > 1)) out.push('scenarios need a worst factor under 1 and a best factor over 1');
  if (out.length) return out;
  const r = computeSizing(s);
  if (r.likelihoodPct < bar.minLikelihoodPct) out.push(`likelihood ${r.likelihoodPct}% is under the bar of ${bar.minLikelihoodPct}%`);
  if (r.expectedINR < bar.minExpectedINR12m) out.push(`expected earnings Rs ${r.expectedINR.toLocaleString('en-IN')} a year are under the bar of Rs ${bar.minExpectedINR12m.toLocaleString('en-IN')}`);
  return out;
}

function loadSizing(root, rel) {
  const f = path.join(root, rel);
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null;
}

module.exports = { computeSizing, checkSizing, loadSizing };

if (require.main === module) {
  const rel = process.argv[2];
  if (!rel) { console.error('Usage: node scripts/sizing.js cases/<id>.sizing.json'); process.exit(1); }
  const root = path.join(__dirname, '..');
  const s = loadSizing(root, rel);
  const bar = JSON.parse(fs.readFileSync(path.join(root, 'company/config.json'), 'utf8')).sizing;
  const r = computeSizing(s);
  for (const c of r.cohorts) console.log(`${c.name}: ${c.users.toLocaleString('en-IN')} paying users, Rs ${c.earningsINR.toLocaleString('en-IN')} a year`);
  console.log(`Likely Rs ${r.likelyINR.toLocaleString('en-IN')}, worst Rs ${r.worstINR.toLocaleString('en-IN')}, best Rs ${r.bestINR.toLocaleString('en-IN')}, ${r.likelihoodPct}% likely, expected Rs ${r.expectedINR.toLocaleString('en-IN')} a year`);
  const problems = checkSizing(s, bar);
  console.log(problems.length ? 'Below the bar or incomplete:\n  ' + problems.join('\n  ') : 'Clears the bar.');
}
