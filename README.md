# Virtual company

A company run end to end by AI agents for Anchit Tandon, with no human step from idea to live product. The CEO agent comes up with ideas and makes the calls, Research
checks demand, Product writes the spec, Engineer builds, QA tests independently, Growth sells,
Support answers customers and Finance keeps the books. Products go live on subdomains of
anchit-tandon.com.

- Dashboard: https://hq.anchit-tandon.com
- Rules every agent follows: [CLAUDE.md](CLAUDE.md)
- Roles: [agents/](agents)
- Cycle steps (every 3 hours) and weekly review: [RUNBOOK-daily.md](RUNBOOK-daily.md), [RUNBOOK-weekly.md](RUNBOOK-weekly.md)

## How the owner steers it

- Approve or reject: open the issue labelled `needs-owner`, add the label `approved` or
  `rejected` (or comment "approve" or "reject").
- Pause everything: add an empty file named `PAUSE` to the repo root. Delete it to resume.
- Change limits: edit `company/config.json` (work in progress limits, kill rules, budget).

## Checks

```
npm run check
```

Rebuilds the dashboard data, validates the company state against the stage gates and runs
the tests. CI runs the same on every push.

## The office

HQ shows every agent at its desk, including one lead per idea being worked. Agents report:

```
node scripts/act.js lead-invoice-buddy start "Building the checkout form" invoice-buddy
node scripts/review.js qa invoice-buddy pass "Core flow works on a phone" '{"url":"https://invoice-buddy.anchit-tandon.com","viewports":[390,820,1440],"consoleErrors":0}'
bash scripts/push.sh
```

`push.sh` is the only way agents publish: it rebases on main, re-runs every check on the merged
result and pushes, so parallel agents never overwrite each other or break main. Each push
rebuilds HQ, and the page checks for new data every minute.
Browser check for HQ (needs Playwright): `node scripts/hq-check.js [url] [--sample]`.
