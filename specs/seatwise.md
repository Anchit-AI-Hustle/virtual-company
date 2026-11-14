# Seatwise spec

## 1. Goal

A person planning a wedding seats every guest at a table and prints the chart, on a phone, in
under ten minutes, without creating an account.

## 2. Customer

Couples and the relatives helping them, a few weeks before the event. They hold a guest list in
a notes app, a spreadsheet or a chat. Today they use paper, a spreadsheet, a wedding site's
built-in seating tool, or a paid seating app.

## 3. The smallest product that earns

One flow: paste guests, set tables, seat guests by tapping, print the chart.

- Paste a guest list, one name per line. An optional group after a comma (`Asha Rao, Rao family`)
  keeps households together.
- Choose number of tables and seats per table. Rename any table and change its seats.
- Tap a guest, then tap a table to seat them. Tap a seated guest to send them back.
- Auto-seat fills tables in order, keeping each group at one table where it fits.
- Print view: one block per table, plus an A to Z "find your seat" list.
- Download CSV (name, group, table). The plan saves in the browser automatically.

## 4. How it earns

- Free: everything above, no limits.
- Pro (planned, not on sale): printable place cards and escort cards, multiple events.
  Proposed one-time price INR 799 (USD 8.47 at 94.2754 on 2026-11-14), filed as a `pricing`
  approval. No payment rail exists, filed as an `account` approval.
- Until both are approved, a "Pro" page states the planned features and the proposed price,
  says plainly that it is not on sale, and takes no money and no personal data.

## 5. Screens and copy

1. Home (`/`): headline "Seat every guest in minutes." Sub "Paste your list, tap to seat, print
   the chart. Free, private, no signup." Button "Start planning". If a saved plan exists:
   "Continue your plan" and "Start over".
2. Guests: label "Paste your guest list, one per line. Add a comma and a group to keep families
   together." Textarea, button "Add guests". Count line "N guests".
3. Tables: "Number of tables", "Seats per table", button "Make tables".
4. Plan: top bar "N of M seated" and buttons "Auto-seat", "Print", "CSV". Unseated list with a
   search box. Table cards "Table 1 . 6 of 8". Empty state "Everyone has a seat." Full table:
   "Table 3 is full".
5. Print (`?print` view, browser print): event name, tables with guests, A to Z list.
6. Pro (`/pro.html`): "Seatwise Pro is not on sale yet." Planned features, proposed price.
7. Privacy note in footer: "Your list never leaves this device. Seatwise stores it only in your
   browser's local storage."

## 6. Data

Guest names, groups and tables are kept only in the visitor's browser (localStorage). Nothing
is sent to any server. No cookies, no analytics scripts, no third-party scripts.

## 7. Acceptance tests

1. Home loads at 390, 820 and 1440 px with no horizontal scroll and zero console errors.
2. Pasting 3 lines `Asha Rao, Rao family` / `Vik Rao, Rao family` / `Meena` adds 3 guests.
3. Blank lines and duplicate whitespace are ignored. Adding an empty list shows "Add at least one name."
4. Making 2 tables of 2 seats shows "Table 1 . 0 of 2" and "Table 2 . 0 of 2".
5. Tapping a guest then a table seats them; the count updates; tapping a seated guest unseats.
6. A full table refuses another guest and shows "Table N is full".
7. Auto-seat seats both Rao family members at the same table.
8. Reloading the page keeps the plan. "Start over" clears it after a confirm.
9. Print view lists every table and an A to Z list with each guest's table.
10. CSV download has header `name,group,table` and one row per guest.
11. Every control is reachable and usable with the keyboard; tap targets at least 44 px.
12. `/pro.html` says Pro is not on sale and contains no form or payment.
13. `/stats.json` is read-only and contains no personal data.
14. The core flow (paste, tables, auto-seat, print) completes at 390 px.
15. Body text contrast is at least 4.5 to 1.

## 8. Out of scope

Accounts, sharing a plan between devices, drag and drop floor maps, place cards, payments,
emailing guests, RSVP tracking.

## 9. Assumptions

People will try a free, private tool from search without signing up. Weddings with up to 500
guests fit in localStorage easily.

## Design

- The plan screen matters most. The eye lands first on the "N of M seated" progress line, then
  the unseated list.
- Tokens: ink `#1F2430`, paper `#FBF8F3`, accent `#8C3B4A` (deep rose), accent-soft `#F3E4E6`,
  line `#E3DDD3`, ok `#2F6B4F`. Headings in Georgia, serif; body in system-ui sans. Spacing
  scale 4, 8, 12, 16, 24, 32.
- States: empty (no guests: prompt to paste), loading (none, all local), error (inline message
  under the field), success ("Everyone has a seat.").
- Tap targets at least 44 px; body text `#1F2430` on `#FBF8F3` is above 13 to 1.

## Measurement

- Funnel: visit, start (guests added), complete (all seated), print. Pay is not possible yet.
- No tracking of people. Without an analytics product, counts are not collected, and
  `/stats.json` reports them as null with the reason, so nobody invents a number.
- When the owner approves a privacy-friendly counter, visits and prints will be counted as
  totals only, and `/stats.json` will expose those totals.
