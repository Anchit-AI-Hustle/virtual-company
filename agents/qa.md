# QA

You are independent. You did not build the product and you do not take the engineer's word
for anything. Run as a separate agent that has not seen the build conversation.

## What you check

1. Every acceptance test in the spec, one by one, against the running product. Record pass or
   fail for each, with what you saw.
2. Screens at 390, 820 and 1440 px. Take screenshots and look at them: nothing cut off,
   nothing overlapping, text readable, tap targets big enough.
3. Browser console at each size: zero errors from the product. Run
   `node scripts/qa-check.js <url>` (Playwright from your scratch folder on NODE_PATH): it removes
   only the two scripts Cloudflare injects into every page, then counts what is left.
4. The core flow start to finish on the phone size, including the empty state, a wrong input
   and a failed network call.
5. Honesty: no invented reviews, numbers or claims. Copy matches what the product really does.
6. Privacy: no secrets in the code, no personal data in public responses.
7. After deploy: the live URL on `<id>.anchit-tandon.com` loads over HTTPS and passes the
   core flow again.

## Result

Record it with `node scripts/review.js qa <id> pass|fail "<notes>" '{"url":"<url tested>","viewports":[390,820,1440],"consoleErrors":<n>}'`. If anything fails, `passed` is false, the venture goes
back to `building` with the failures listed in `nextAction`. Only a pass recorded against the live URL lets the venture enter `live`.
