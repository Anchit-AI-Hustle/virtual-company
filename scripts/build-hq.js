#!/usr/bin/env node
// Turns the company brain into the one data file the HQ page reads.
// Runs on every HQ deploy (Vercel build) and locally. The output is not committed.
// Usage: node scripts/build-hq.js
const fs = require('node:fs');
const path = require('node:path');
const { loadBrain, leadId } = require('./brain.js');
const { computeSizing, checkSizing, loadSizing } = require('./sizing.js');

const round2 = (n) => Math.round(n * 100) / 100;

function buildHq(dir) {
  const { config, team, departments, ledger, ventures, approvals, activity, log, reviews } = loadBrain(dir);

  const sum = (type) => ledger.filter((l) => l.type === type).reduce((t, l) => t + l.amountINR, 0);
  const revenueINR = sum('revenue');
  const costINR = sum('cost');
  const netINR = revenueINR - costINR;
  const rate = config.fx && typeof config.fx.usdInr === 'number' && config.fx.usdInr > 0 ? config.fx.usdInr : null;
  const usd = (inr) => (rate ? round2(inr / rate) : null);

  const stageRank = (s) => config.stages.indexOf(s);
  const sorted = ventures.slice().sort((a, b) =>
    (((b.score || {}).total || 0) - ((a.score || {}).total || 0)) || (stageRank(b.stage) - stageRank(a.stage)) || a.id.localeCompare(b.id));

  const lastByAgent = {};
  const countByAgent = {};
  for (const e of log) {
    countByAgent[e.agent] = (countByAgent[e.agent] || 0) + 1;
    if (!lastByAgent[e.agent] || e.at > lastByAgent[e.agent].at) lastByAgent[e.agent] = e;
  }
  const titleOf = (id) => { const v = ventures.find((x) => x.id === id); return v ? v.title : null; };
  const desk = (base) => {
    const a = activity[base.id] || {};
    const last = lastByAgent[base.id] || null;
    return Object.assign({}, base, {
      state: a.state || 'idle', task: a.task || null, since: a.since || null,
      ventureId: a.ventureId || null, ventureTitle: titleOf(a.ventureId),
      last: last ? { at: last.at, action: last.action } : null,
      actions: countByAgent[base.id] || 0
    });
  };

  // Department agents, then one venture lead per venture that is still being worked or run.
  const office = team.map((t) => desk({ id: t.id, name: t.name, title: t.title, department: t.department, color: t.color, trait: t.trait, charter: t.charter }));
  const podVentures = sorted.filter((v) => v.lead && v.stage !== 'killed' && v.stage !== 'idea');
  for (const v of podVentures) {
    office.push(desk({ id: leadId(v.id), name: v.lead.name, title: 'Lead, ' + v.title, department: 'pods', color: v.lead.color, trait: v.lead.trait || 'Owns ' + v.title + ' from research to revenue.', charter: 'agents/venture-lead.md', ventureOwned: v.id }));
  }

  return {
    builtAt: new Date().toISOString(),
    report: (() => { try { const rd = path.join(dir, 'company/reports'); const f = fs.readdirSync(rd).filter((x) => /^\d{4}-\d{2}-\d{2}\.md$/.test(x)).sort().pop(); return f ? { date: f.slice(0, 10), text: fs.readFileSync(path.join(rd, f), 'utf8') } : null; } catch (e) { return null; } })(),
    health: (() => { try { return JSON.parse(fs.readFileSync(path.join(dir, 'company/health.json'), 'utf8')); } catch (e) { return null; } })(),
    company: { name: config.name, domain: config.domain, owner: config.owner.name, ownerLogin: config.owner.github },
    stages: config.stages,
    schedule: config.schedule || null,
    wip: config.wip,
    money: {
      revenueINR, costINR, netINR,
      revenueUSD: usd(revenueINR), costUSD: usd(costINR), netUSD: usd(netINR),
      fx: rate ? { usdInr: rate, asOf: config.fx.asOf, source: config.fx.source } : null,
      monthlyCapINR: config.budget.monthlyCapINR
    },
    decisions: approvals.filter((a) => a.status === 'decided' || a.status === 'overturned').map((a) => ({ id: a.id, title: a.title, status: a.status, why: a.why, options: a.options, decision: a.decision, issueUrl: a.issueUrl })).sort((a, b) => ((b.decision || {}).decidedAt || '').localeCompare((a.decision || {}).decidedAt || '')),
    approvals: approvals.filter((a) => a.status === 'pending').sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')),
    ventures: sorted.map((v) => ({
      id: v.id, title: v.title, oneLiner: v.oneLiner, customer: v.customer, revenueModel: v.revenueModel,
      priceINR: v.priceINR, stage: v.stage, score: (v.score || {}).total || 0, url: v.url, nextAction: v.nextAction,
      metrics: v.metrics, killReason: v.killReason, updatedAt: v.updatedAt,
      evidenceCount: Array.isArray(v.evidence) ? v.evidence.length : 0,
      specPath: v.specPath || null,
      lead: v.lead ? { id: leadId(v.id), name: v.lead.name, color: v.lead.color } : null,
      reviews: Object.fromEntries((config.reviewsToGoLive || []).map((r) => { const x = (reviews[v.id] || {})[r]; return [r, x ? !!x.passed : null]; })),
      qaPassed: (reviews[v.id] || {}).qa ? !!reviews[v.id].qa.passed : null,
      goDecision: (reviews[v.id] || {}).ceo ? !!reviews[v.id].ceo.passed : null,
      sizing: (() => { const sz = v.sizing && v.sizing.path ? loadSizing(dir, v.sizing.path) : null; if (!sz) return null; try { return Object.assign({ path: v.sizing.path, clearsBar: checkSizing(sz, config.sizing).length === 0, problem: sz.problem ? { who: sz.problem.who, frequency: sz.problem.frequency } : null }, computeSizing(sz)); } catch (e) { return null; } })(),
      businessCase: v.case && v.case.path ? { path: v.case.path, total: v.case.total || null, recommendation: v.case.recommendation || null } : null
    })),
    departments: departments.concat(podVentures.length ? [{ id: 'pods', name: 'Venture pods' }] : []),
    office,
    ventureTrail: Object.fromEntries(ventures.map((v) => [v.id, log.filter((e) => e.ventureId === v.id)
      .sort((a, b) => b.at.localeCompare(a.at)).map((e) => ({ at: e.at, agent: e.agent, action: e.action }))])),
    // The newest 80 tasks travel with the office; the complete history is history.json, loaded on demand.
    log: log.slice().sort((a, b) => b.at.localeCompare(a.at)).slice(0, 80),
    logTotal: log.length,
    history: log.slice().sort((a, b) => b.at.localeCompare(a.at)).map((e) => ({ at: e.at, agent: e.agent, action: e.action, ventureId: e.ventureId || null }))
  };
}

module.exports = { buildHq };

if (require.main === module) {
  const root = path.join(__dirname, '..');
  const out = path.join(root, 'hq/public/data.json');
  const d = buildHq(root);
  const history = d.history; delete d.history;
  fs.writeFileSync(out, JSON.stringify(d, null, 2) + '\n');
  fs.writeFileSync(path.join(root, 'hq/public/history.json'), JSON.stringify({ builtAt: d.builtAt, total: history.length, log: history }) + '\n');
  console.log('Wrote hq/public/data.json and hq/public/history.json');
}
