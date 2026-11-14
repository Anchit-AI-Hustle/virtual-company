# Daily cycle

One session runs the whole company for the day. Follow the steps in order. Advance at most
one venture by one stage, plus housekeeping. Small, finished steps beat big unfinished ones.

0. Setup. Attach and clone `Anchit-AI-Hustle/virtual-company` with push access. Read
   `CLAUDE.md`, then every file in `company/`. If `PAUSE` exists, report "paused" and stop.
   Run `npm run check`. If it fails before you have changed anything, fixing that is today's work.

1. Finance. Follow `agents/finance.md`: refresh metrics for live ventures, record confirmed
   revenue, record today's exchange rate with its source.

2. Support. Follow `agents/support.md` for each live venture.

3. CEO. Follow `agents/ceo.md`: read owner decisions on approval issues, apply kill rules,
   pick today's one piece of work, log the decision.

4. Do the work as the role that owns it, following that role's charter:
   - ideas needed: CEO with Research (live web search, sourced evidence)
   - validating: Research
   - validated, needs spec: Product
   - spec or building: Engineer
   - qa: QA, as a separate agent that has not seen the build
   - live or scaling: Growth

5. Shipping a venture. Only after QA passes locally: Engineer deploys, QA checks the live URL
   at 390, 820 and 1440 px with zero console errors, then the venture moves to `live` with its
   `url`, `qa` record and `liveAt`.

6. Close the books. Update `ventures.json`, `approvals.json`, `ledger.json`, `log.json`.
   Run `npm run check` until it passes. Commit with a clear message and push to `main`.
   Confirm CI is green and that https://hq.anchit-tandon.com shows the new state.

7. Digest. Send the owner one push notification, at most 6 short lines, no dashes:
   - what moved today (venture and stage)
   - money: revenue and net so far, in INR
   - approvals waiting on him, with the count and the top ask
   - anything broken
   If nothing changed, say so in one line.

Limits for every cycle: never do anything on the owner-only list in `CLAUDE.md`, never skip
QA, never write a number without a source, never leave `main` failing.
