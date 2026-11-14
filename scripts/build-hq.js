#!/usr/bin/env node
// Turns the company brain into the single data file the HQ page reads.
// Usage: node scripts/build-hq.js
const fs = require('node:fs');
const path = require('node:path');

const read = (dir, name) => JSON.parse(fs.readFileSync(path.join(dir, 'company', name + '.json'), 'utf8'));
const round2 = (n) => Math.round(n * 100) / 100;

function buildHq(dir) {
  const config = read(dir, 'config');
  const ventures = read(dir, 'ventures');
  const approvals = read(dir, 'approvals');
  const ledger = read(dir, 'ledger');
  const log = read(dir, 'log');

  const sum = (type) => ledger.filter((l) => l.type === type).reduce((t, l) => t + l.amountINR, 0);
  const revenueINR = sum('revenue');
  const costINR = sum('cost');
  const netINR = revenueINR - costINR;
  const rate = config.fx && typeof config.fx.usdInr === 'number' && config.fx.usdInr > 0 ? config.fx.usdInr : null;
  const usd = (inr) => (rate ? round2(inr / rate) : null);

  const stageRank = (s) => config.stages.indexOf(s);
  const sorted = ventures.slice().sort((a, b) =>
    (b.score.total - a.score.total) || (stageRank(b.stage) - stageRank(a.stage)) || a.id.localeCompare(b.id));

  const lastByAgent = {};
  for (const entry of log) {
    if (!lastByAgent[entry.agent] || entry.at > lastByAgent[entry.agent].at) lastByAgent[entry.agent] = entry;
  }

  return {
    builtAt: new Date().toISOString(),
    company: { name: config.name, domain: config.domain, owner: config.owner.name },
    stages: config.stages,
    wip: config.wip,
    money: {
      revenueINR, costINR, netINR,
      revenueUSD: usd(revenueINR), costUSD: usd(costINR), netUSD: usd(netINR),
      fx: rate ? { usdInr: rate, asOf: config.fx.asOf, source: config.fx.source } : null,
      monthlyCapINR: config.budget.monthlyCapINR
    },
    approvals: approvals.filter((a) => a.status === 'pending').sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')),
    ventures: sorted.map((v) => ({
      id: v.id, title: v.title, oneLiner: v.oneLiner, customer: v.customer, revenueModel: v.revenueModel,
      priceINR: v.priceINR, stage: v.stage, score: v.score.total, url: v.url, nextAction: v.nextAction,
      metrics: v.metrics, killReason: v.killReason, updatedAt: v.updatedAt,
      evidenceCount: Array.isArray(v.evidence) ? v.evidence.length : 0
    })),
    team: config.roster.map((agent) => ({ agent, last: lastByAgent[agent] || null })),
    log: log.slice().sort((a, b) => b.at.localeCompare(a.at)).slice(0, 30)
  };
}

module.exports = { buildHq };

if (require.main === module) {
  const root = path.join(__dirname, '..');
  const out = path.join(root, 'hq/public/data.json');
  fs.writeFileSync(out, JSON.stringify(buildHq(root), null, 2) + '\n');
  console.log('Wrote ' + path.relative(root, out));
}
