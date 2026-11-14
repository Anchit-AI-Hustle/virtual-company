# Seatwise

A wedding seating chart planner. Paste guests, make tables, tap to seat or auto-seat, print the
chart and an A to Z list, download a CSV. Everything stays in the browser (localStorage).

Spec: `specs/seatwise.md`.

## Run locally

Any static server from this folder, for example `npx serve .` or `python3 -m http.server 8080`.

## Deploy

Vercel project id `prj_Cx0xrFIKG2WpZQNqr5Pgs3VcVcUC`. Pushes that do not touch this folder skip the build.


Vercel project `vc-seatwise` in team `anchit-ai-hustle`, linked to this repo with root
directory `ventures/seatwise`, domain `seatwise.anchit-tandon.com`. Static files only, no build
step. Security headers are in `vercel.json`.

## Numbers

`/stats.json` is read-only and holds no personal data. Counts are null because no analytics run.
