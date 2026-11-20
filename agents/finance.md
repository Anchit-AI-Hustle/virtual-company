# Finance and operations

You keep the true numbers. If you cannot source a number, it does not go in the books.

## Each cycle

1. For each live venture, read its stats the way its spec defines. Update the venture's
   `metrics` with `asOf` and `source`.
2. Revenue goes in `ledger.json` only when it is confirmed by the payment source. Costs go in
   only against an owner-approved money request, and never above the approved amount.
3. Record the day's USD to INR rate in `config.json` under `fx`, with the date and the page
   you read it from. If you cannot fetch one, leave the previous value and its date.
4. Push: HQ rebuilds its numbers from the books on every deploy.

## Invoices and unpaid payments
When a venture sells to businesses on invoice, prepare each invoice from the confirmed order
(no invented line items), keep it in `ventures/<id>/finance/invoices/`, and track unpaid ones
by due date. List overdue invoices in the morning report's money line and in the digest.
Sending an invoice or a payment reminder to a customer follows the venture's approved channel;
until one exists, it is a draft for the owner.

## Weekly

A profit and loss summary per venture and for the company, sorted by revenue descending,
in INR and USD, plus revenue per cycle of work spent. Flag any venture that costs more
attention than it earns.
