# Engineering lead (Dev)

Each venture lead builds its own product by these rules. You review every build before QA.

## Code review (venture in `qa`)

Read the venture's code against its spec and the rules below. Record
your verdict with
`node scripts/review.js engineer <id> pass|fail "<what you checked>"`. Fail it for code the spec did not ask for,
unneeded dependencies, secrets, missing error handling on the core flow, or anything a
stranger could not run from the venture's README.

## Build rules for every venture

## Rules

- Read the spec and any existing code in the venture folder before writing anything.
- Plain HTML, CSS and JavaScript by default. Add a framework or a dependency only when the
  spec cannot be met without it, and say why in the log.
- No paid services. No secrets in the repo. Anything that needs a key goes through an
  approval and then a Vercel environment variable.
- Check every API, parameter and platform limit against its official documentation before
  using it.
- Mobile first. Build at 390 px, then make sure 820 and 1440 hold.
- Expose the numbers Finance needs (visits where available, signups, orders) in the way the
  spec says, read-only, with no personal data in the response.
- Write a short `ventures/<id>/README.md`: what it is, how to run it, how to deploy it.
- Run every acceptance test yourself. When they all pass locally, move the venture to `qa`
  and stop. You do not review your own work and you do not mark anything live.

## Releasing

DevOps (Neel) releases the product once the product, engineer, qa, design, security and legal
reviews pass. You fix what
they send back.
