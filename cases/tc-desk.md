# Closing Desk business case

Author: Meera, Head of Research. Date: 2026-11-28. FX used: USD 1 = INR 94.2754 (company/config.json, source xflowpay, as of 2026-11-14). I did not propose or validate this idea and gain nothing if it passes. Search volumes are seodata.dev Google Ads monthly averages for the United States, read today [1][2][3][4]. Page one results are live US web searches run on 28 Nov 2026 [20][21][22]. Two vendor pages (ListedKit and Open to Close) blocked the page reader, so I read their own HTML pricing pages directly with curl the same day [6][8]. The Fiverr page from the screen returned HTTP 403 today and is not used here.

## Summary

- Agents and transaction coordinators (TCs) clearly pay for contract to close tracking: Nekst Solo Pro USD 790 a year [5], ListedKit Solo USD 99 a month [6], Paperless Pipeline from USD 69 a month [7], Open to Close from USD 99 a month [8], and human TC services at USD 339 to 399 a deal [9].
- But the free version we would ship (enter contract dates, get deadlines and tasks) is already free in pieces: Nekst Solo Lite gives 5 transactions with deadline sync and client portals free [5], ListedKit Free gives 1 active closing with its AI assistant [6], free PDF and Excel checklists are everywhere [11][12][13], and a free no account date calculator already does acceptance date plus N days [15].
- Distribution is the failure: the checklist terms we could plausibly rank for total at most about 590 searches a month [2][3], page one is vendors, template sites and two AI built checklist tools [20][22], and the 2,410 software searches [1] are listicles and vendor blogs with CPC USD 17 to 37.
- Legal: we may only do date arithmetic on dates the user enters. Texas says an unlicensed assistant "cannot review a contract" [18]; our product must never read, explain or recommend contract terms.
- Score 19 of 35. Recommendation: no-go. It fails the 24 total and distribution is under 3.

## Market

**Who pays.** US residential real estate agents who run their own files, and independent TCs who coordinate files for several agents. Every competitor prices in USD [5][6][7][8][9] and the job is tied to US purchase contracts. This is a USD product.

**How many (sourced):**

| Measure | Number | Source |
|---|---|---|
| US real estate brokers and sales agents, 2025 | about 530,600 (103,500 brokers, 427,000 agents) | BLS Occupational Outlook [16] |
| Existing US home sales, 2025 | about 4.06 million | NAR via PBS [17] |
| Typical Realtor transaction sides, 2025 | 9 | NAR 2026 Member Profile [19] |

About 4.06 million sales means up to about 8 million transaction sides a year (two sides a sale), each one a file with deadlines. That is my arithmetic, not a published number.

**What is not known:** how many independent TCs exist (the Zippia demographics page that might count them showed only a bot check today, so it is not used); how many agents already use a brokerage provided platform such as dotloop or SkySlope at no personal cost; how many would pay out of pocket for a tool on top. The pool is big. The pool is not the constraint.

## Problem

- **Pain:** real. A missed inspection, financing or appraisal deadline can cost a client their earnest money or the deal, which is why every vendor sells due dates calculated from the contract's key dates [7] and why human TCs are paid USD 300 to 750 a file, per a BiggerPockets thread [10]. That thread is from 2015, so the fee range is dated.
- **Frequency:** repeats on every deal. A typical agent had 9 sides in 2025 [19], so roughly one new file a month: recurring, but light and seasonal for a solo agent. A TC with 10 or more files at once feels it far more.
- **How people solve it today:** the brokerage's platform, a paid tool on a free tier (Nekst 5, ListedKit 1, DocJacket 3 [5][6][14]), a free PDF or Excel checklist [11][12], a spreadsheet, or a human TC [9][10].

## Competition

| Alternative | Price (from its own page) | What it does | Source |
|---|---|---|---|
| Nekst Solo Lite / Solo Pro / Team Pro | Free for 5 total transactions; USD 790 a year plus USD 299 onboarding; USD 1,990 a year plus USD 399 | Preloaded workflows, deadline sync to calendar, client portals, AI email, even on the free plan | [5] |
| ListedKit Free / Solo / Team | USD 0 for 1 active closing; USD 99 a month (USD 1,069 a year) for 10; USD 249 a month for 25; USD 29 a credit per extra closing | AI assistant Ava manages the closing, unlimited eSign | [6] |
| Paperless Pipeline | From USD 69 a month for up to 5 new transactions; 14 day free trial | Checklists applied per deal, due dates calculated from key dates in business or calendar days | [7] |
| Open to Close Grow / Pro / Scale | USD 99 / 199 / 399 a month, USD 69 a month per extra user; 30 day free trial | Unlimited transactions, free agent and client portals, task management | [8] |
| Transactly | Human TC USD 339 to 399 a transaction; Access plan (platform only) USD 49 a month | Full coordination service | [9] |
| Free checklists: dotloop, Paperless Pipeline Excel, template.net, ClickUp | USD 0, no signup for some | Buyer and seller task lists; a due date column but no date calculation | [11][12][13] |
| DocJacket TC Checklist Builder | Free checklist; DocJacket software free for 3 transactions | 29 tasks in 5 phases, filter and PDF; timing is relative ("3 days before closing"), not calculated | [14] |
| Wild and Free Tools date calculator | Free, no account | Acceptance date plus N days, days between; no weekend rule, no recalculation | [15] |
| DealTC | "Try free", price not shown | Forward the executed contract and the timeline builds itself, with reminders | [23] |
| TitleTap Critical Dates Calculator | USD 50 a month add on | Closing deadlines, aimed at Florida title and attorneys | [24] |

**The gap we would fill:** unlimited free deadline lists from dates the user types in, with a share link for the client, and no account. That gap is narrow. Nekst already gives client portals and deadline sync free for 5 files [5], which covers a typical agent for about half a year at 9 sides [19]. ListedKit and DealTC read the contract with AI [6][23], which we must not do. The free date calculator already does the arithmetic [15]. Our edge is only "no signup, unlimited, a status link", and the paid tier would sell saved files and reminders, which every vendor above already bundles.

## Willingness to pay

- Strong in general: agents and TCs pay USD 66 to 166 a month for software [5][6][7][8], USD 49 a month for a platform only plan [9], and USD 339 to 399 a file for a human TC [9]. A Florida title tool charges USD 50 a month just for a dates calculator [24].
- Weak for us specifically: the evidence is that people pay established vendors that also hold documents, eSign, compliance and commission features [6][7][8]. I found no evidence that anyone pays for a standalone deadline list. Our paid tier (saved files, reminders, links) is the free tier of Nekst [5].
- Currency: USD. A plausible price for us is USD 15 a month (about Rs 1,414), well under ListedKit and Nekst, because we offer less.

## Distribution

Search only, from pages and free tools on tc-desk.anchit-tandon.com.

| Term | Monthly US searches | CPC USD | Source |
|---|---|---|---|
| real estate transaction management software | 1,300 | 36.84 | [1] |
| transaction coordinator software | 320 | 17.66 | [1] |
| real estate transaction coordinator software | 260 | 23.47 | [1] |
| best transaction coordinator software | 210 | 26.75 | [1] |
| transaction coordinator checklist | 170 | 5.16 | [2] |
| transaction coordinator real estate checklist | 170 | 5.02 | [2] |
| real estate transaction checklist | 170 | 0.29 | [3] |
| transaction coordinator checklist pdf | 40 | 4.44 | [2] |
| real estate transaction checklist pdf | 40 | 0.92 | [3] |
| real estate closing checklist | 110 | 5.10 | [4] (mostly home buyer intent: "home closing checklist for buyer") |
| real estate contract deadline calculator | 0 | 0 | [4b] |
| real estate deadline calculator / closing timeline calculator | 0 / 0 | 0 | [4b] |
| transaction coordinator | 4,400 | 4.00 | [4c] (job and hiring intent, not a tool) |

seodata.dev lists the checklist terms as similar to each other (overlap 9 to 12) [2][3], so the 590 total for the five checklist terms is an upper bound. Nobody searches for a deadline calculator (0) [4b], which is the one thing our free tool would do that a PDF does not.

**Who ranks now.** "transaction coordinator checklist": RealTrends, dotloop (twice), Process Street, Paperless Pipeline, Transactly, ListedKit, Serif AI, DocJacket, signNow, Lark and DealTC [20]. "transaction coordinator software": Paperless Pipeline (twice), Gitnux, WifiTalents, ZipDo, ListedKit, GetApp and Software Advice [21]. "real estate transaction checklist template free": SafetyCulture, ClickUp, template.net (several), Paperless Pipeline and Manifestly [22].

**Can we rank and convert?** Unlikely within 90 days. The checklist SERP already contains two AI built checklist pages on pages.dev (DealTC and the DocJacket builder) [20][14][23], so "a quick checklist page on a new subdomain" is exactly what others have already done. The software terms are commercial (CPC up to USD 37) and held by vendors with years of content. The searcher who wants a checklist wants a free PDF; the searcher who wants software compares Nekst, ListedKit and Pipeline, which all have free tiers or trials.

## Unit economics

Assumptions (mine, labelled): price USD 15 a month; hosting on the existing free Vercel plan, so cash cost Rs 0 under the Rs 0 cap; no payment rail exists (company/approvals/ap-2.json, decided "do nothing for now"), so revenue also needs the owner to open one. Click through and conversion rates are assumptions.

- **Worst:** USD 0 (Rs 0). No page one position within 90 days, or no payment rail. 0 x USD 15 = 0.
- **Likely:** USD 15 (about Rs 1,414). Page two for the checklist terms by day 60: assumed 3% click through on at most 590 searches = about 18 visitors a month, 36 over the last two months; assumed 2% pay = 0.7, so 1 payer for 1 month: 1 x USD 15 = USD 15.
- **Best:** USD 180 (about Rs 16,970). Top five for the checklist terms by day 30 (assumed 10% of 590 = 59 visitors a month) plus the bottom of page one for the software terms (assumed 2% of 2,410 [1] = 48 a month) = about 107 a month, 214 over two months; assumed 3% pay = 6 payers x USD 15 x 2 months = USD 180.
- **Costs:** Rs 0 cash. The free date list is a small build. The paid tier needs accounts, saved files, email reminders and an access controlled client link, which adds security and legal review and a sending service that must stay free.

## Sizing

The sizing agent (Farhan) adds this in cases/tc-desk.sizing.json.

## Risks

- **It would prove me wrong if** tc-desk pages reach 500 or more Google Search Console impressions a week for checklist and TC software terms by 28 Jan 2027. I expect under 100.
- **It would prove me wrong if** 10 or more agents or TCs pay by 28 Feb 2027 (90 days). I expect 0 or 1.
- **Legal risk (biggest after distribution):** deadlines come from each state's contract form and each deal's negotiated terms. Texas says unlicensed assistants "cannot review a contract or facilitate a transaction" [18]. Our tool must only add days to dates the user types, show the user's own numbers back, label every date "check against your contract", and never suggest default periods per state, read an uploaded contract, or say whether a date is correct. That rules out the most useful features (state templates, contract parsing) that ListedKit and DealTC sell [6][23], which shrinks our product further. A wrong date shown to a client through our status link could still be blamed on us.
- **Free tier risk:** Nekst already gives deadline sync and client portals free for 5 files [5]; if it raises that cap, or ListedKit raises its 1 closing free plan [6], our free gap closes.
- **Data risk:** a client status link exposes addresses, names and deal dates. It needs unguessable links and expiry, or it leaks a client's purchase.
- **Payment risk:** no rail exists (ap-2). Any revenue needs the owner's identity for a payment account.

## Options

- **Proceed:** build a free no account deadline list from user entered dates with a client share link, and a USD 15 a month saved tier. Expected 90 day revenue USD 0 to 180, against free Nekst, ListedKit and DocJacket tiers.
- **Pivot to a TC tool for independent TCs only (multi agent file board, per agent status pages):** a sharper buyer, but Open to Close and Pipeline already sell exactly that with unlimited users [7][8], and the searches are the same contested software terms [1]. I do not recommend it without new evidence.
- **Stop:** kill tc-desk and spend the build on a job where free tools leave the paid part open and the searches are not owned by vendors.

## Scorecard

| Key | Score | Reason |
|---|---|---|
| pain | 3 | Missed deadlines are costly and TCs are paid hundreds a file [9][10], but a typical agent has only 9 sides a year [19] and already has a brokerage platform or a free tier. |
| willingnessToPay | 3 | Clear spend on software (USD 66 to 166 a month) and human TCs (USD 339 to 399 a file) [5][6][7][8][9], but none found for a standalone deadline list, and our paid tier is Nekst's free tier [5]. |
| marketSize | 4 | About 530,600 US agents and brokers [16] and about 4.06 million sales a year [17]; the share who would pay out of pocket is unknown. |
| distribution | 2 | Winnable checklist terms total at most about 590 a month [2][3]; deadline calculator terms are 0 [4b]; page one is vendors, template sites and AI built checklist pages [20][21][22]. |
| competitionGap | 2 | Only "no signup, unlimited, a share link". Nekst free covers 5 files with portals [5], a free calculator does the date math [15], and AI contract reading is what buyers value and we must not offer [6][23]. |
| speedToRevenue | 2 | The free version is quick to build, but no payment rail exists (ap-2) and the paid tier needs accounts, reminders and access control. |
| recurringRevenue | 3 | Deals repeat and every vendor sells subscriptions [5][6][7][8], but a solo agent's volume is lumpy and free tiers are one click away. |

Total: 19 of 35. Bar: 24 total, none under 2, willingnessToPay and distribution at least 3. Fails on the total and on distribution (2).

## Recommendation

No-go. Agents and TCs do pay for contract to close tracking, so this is a better market than most we have screened. But they pay established platforms that bundle documents, eSign, AI contract reading and client portals, and two of those (Nekst and ListedKit) already give a free tier that covers a light agent. The part we are legally allowed to build, date arithmetic on dates the user enters, is already free and has no searches of its own, and the checklist searches we could chase are small and already crowded with vendors, template sites and AI built checklist pages. A new subdomain with search only distribution is unlikely to find 100 paying buyers in 90 days.

## Sources

1. seodata.dev, "transaction coordinator software" and similar terms (US, Google Ads averages), read 2026-11-28: https://api.seodata.dev/v1/keyword?q=transaction+coordinator+software&country=us
2. seodata.dev, "transaction coordinator checklist" and similar terms, read 2026-11-28: https://api.seodata.dev/v1/keyword?q=transaction+coordinator+checklist&country=us
3. seodata.dev, "real estate transaction checklist", read 2026-11-28: https://api.seodata.dev/v1/keyword?q=real+estate+transaction+checklist&country=us
4. seodata.dev, "real estate closing checklist", read 2026-11-28: https://api.seodata.dev/v1/keyword?q=real+estate+closing+checklist&country=us
   4b. seodata.dev, deadline calculator terms (all 0), read 2026-11-28: https://api.seodata.dev/v1/keyword?q=real+estate+contract+deadline+calculator&country=us ; https://api.seodata.dev/v1/keyword?q=real+estate+deadline+calculator&country=us ; https://api.seodata.dev/v1/keyword?q=closing+timeline+calculator&country=us
   4c. seodata.dev, "transaction coordinator", read 2026-11-28: https://api.seodata.dev/v1/keyword?q=transaction+coordinator&country=us
5. Nekst pricing: https://nekst.com/pricing
6. ListedKit pricing (own page, read as HTML): https://www.listedkit.com/pricing
7. Paperless Pipeline pricing: https://www.paperlesspipeline.com/pricing
8. Open to Close pricing (own page, read as HTML): https://opentoclose.com/v2/pricing
9. Transactly pricing: https://transactly.com/pricing
10. BiggerPockets forum, real estate transaction coordinator (2015 posts): https://www.biggerpockets.com/forums/21/topics/75324-real-estate-transaction-coordinator?page=2
11. dotloop free TC checklists (PDF): https://dotloop.com/resource-center/downloads/transaction-coordinator-checklists
12. Paperless Pipeline free TC checklist (Excel): https://www.paperlesspipeline.com/blog/real-estate-transaction-coordinator-checklist
13. template.net free TC checklist: https://www.template.net/edit-online/283065/real-estate-transaction-coordinator-checklist ; ClickUp template: https://clickup.com/templates/real-estate-transaction-checklist-t-2ytz6nj
14. DocJacket TC Checklist Builder: https://docjacket-marketing.pages.dev/resources/transaction-coordinator-checklist
15. Wild and Free Tools, free real estate date calculator: https://wildandfreetools.com/blog/date-calculator-real-estate-closing-dates-free/
16. BLS Occupational Outlook, real estate brokers and sales agents: https://www.bls.gov/ooh/Sales/real-estate-brokers-and-sales-agents.htm
17. PBS NewsHour, 2025 home sales at 30 year low (NAR data): https://www.pbs.org/newshour/economy/2025-home-sales-stuck-at-30-year-low
18. Texas Real Estate Commission, using unlicensed individuals: https://trec.texas.gov/article/can-you-use-unlicensed-individuals-help-your-texas-real-estate-transactions-it-depends
19. NAR 2026 Member Profile release (25 Jun 2026): https://www.nar.realtor/newsroom/experienced-realtors-anchor-the-industry-as-housing-affordability-remains-top-hurdle-new-nar-report
20. Live US web search "transaction coordinator checklist", 2026-11-28 (results include https://www.realtrends.com/blog/2025/02/06/transaction-coordinator-checklist/ , https://www.process.st/templates/transaction-coordinator-contract-to-close-checklist/ , https://transactly.com/transaction-coordinator-checklist/ , https://www.listedkit.com/resources/real-estate-transaction-coordinator-checklist , https://www.serif.ai/guides/real-estate-transaction-coordinator-checklist)
21. Live US web search "transaction coordinator software", 2026-11-28 (results include https://www.paperlesspipeline.com/blog/transaction-coordinator-software-free , https://gitnux.org/best/transaction-coordinator-software/ , https://www.listedkit.com/resources/best-transaction-coordinator-software)
22. Live US web search "real estate transaction checklist template free", 2026-11-28 (results include https://safetyculture.com/library/professional-services/real-estate-transaction-checklist , https://www.template.net/edit-online/283830/real-estate-transaction-timeline-checklist)
23. DealTC transaction coordinator checklist guide: https://dealtc.pages.dev/blog/transaction-coordinator-checklist/
24. TitleTap, Critical Dates Calculator: https://www.titletap.com/articles/why-your-company-needs-a-critical-dates-calculator/
