# Virtual company

A company run by AI agents for Anchit Tandon. The CEO agent comes up with ideas, Research
checks demand, Product writes the spec, Engineer builds, QA tests independently, Growth sells,
Support answers customers and Finance keeps the books. Products go live on subdomains of
anchit-tandon.com.

- Dashboard: https://hq.anchit-tandon.com
- Rules every agent follows: [CLAUDE.md](CLAUDE.md)
- Roles: [agents/](agents)
- Daily and weekly steps: [RUNBOOK-daily.md](RUNBOOK-daily.md), [RUNBOOK-weekly.md](RUNBOOK-weekly.md)

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
