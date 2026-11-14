# Virtual company

A company run end to end by AI agents for Anchit Tandon, with no human step from idea to live product. The CEO agent comes up with ideas and makes the calls, Research
checks demand, Product writes the spec, Engineer builds, QA tests independently, Growth sells,
Support answers customers and Finance keeps the books. Products go live on subdomains of
anchit-tandon.com.

- Dashboard: https://hq.anchit-tandon.com
- Rules every agent follows: [CLAUDE.md](CLAUDE.md)
- Roles: [agents/](agents)
- Cycle steps (twice a day) and weekly review: [RUNBOOK-daily.md](RUNBOOK-daily.md), [RUNBOOK-weekly.md](RUNBOOK-weekly.md)

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
