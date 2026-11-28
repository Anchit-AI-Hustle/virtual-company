# OSHA Log business case

Author: Meera, Head of Research. Date: 2026-11-28. FX used: USD 1 = INR 94.2754 (company/config.json, source xflowpay, as of 2026-11-14). I did not propose or validate this idea and gain nothing if it passes. Vendor prices were read on 28 Nov 2026 on the vendor's own page where one could be found (LogStead, HB Next, Salus); SiteSafety HQ, Epostrix and IncidentLog have no reachable own pricing page, so their prices come from their Capterra or AlternativeTo listings and are marked so. Page one results are live US web searches run on 28 Nov 2026. Firecrawl was out of credits; pages were read with WebSearch, WebFetch and curl.

## Summary

- The obligation is real and large: OSHA's recordkeeping rule covers about 1.3 million establishments [1], and about 300,000 establishments file a 300A through OSHA's ITA each year [2]. Penalties are up to USD 16,550 per violation as stated for 2026 by two vendors [4][9].
- People do pay for software that keeps the log: HB Next USD 99 a year per establishment [5], LogStead USD 39 a month [4], SiteSafety HQ USD 39 to 199 a month [6], IncidentLog up to USD 89 a month [8], Epostrix USD 299 a month [7]. None shows a review count that proves many buyers.
- The free gap is narrower than the screen said: Salus gives a free Excel workbook, no email, that keeps the 300 log, totals the 300A and builds the ITA upload row, with a 301 worksheet [9], and it sits on page one for "osha 300 log" [12]. LogStead gives a free auto-totaling workbook too [10]. Our revenue model also gives the single-establishment log away, which is most of the target market.
- Score 20 of 35. Recommendation: no-go. Fails the 24 bar; competitionGap and speedToRevenue are 2.

## Market

**Who pays.** US employers with more than 10 employees in non-exempt industries, who must keep the OSHA 300 log, 300A summary and 301 reports for each establishment and keep them five years [3]. Employers with 10 or fewer employees at all times in the prior year, and listed low-hazard industries, are partially exempt [3]. This is a US-only legal duty, priced by every rival in USD [4][5][6][7][8]. It is a USD product.

**How many (sourced):**

| Measure | Number | Source |
|---|---|---|
| Establishments covered by OSHA's recordkeeping rule | about 1,300,000 (more than 600,000 employers) | OSHA final rule, 12 May 2016 [1] |
| Establishments that submit Form 300A through ITA each year since 2017 | roughly 300,000 | OSHA final rule, 21 Jul 2023 [2] |
| Establishments (100+ staff, designated industries) that must also e-submit 300 and 301 case data each year | 52,092 | OSHA final rule, 21 Jul 2023 [2] |

**What is not known:** how many covered establishments still keep the log on PDFs or spreadsheets (the venture's customer), and, crucial for our revenue model, how many of the 11 to 250 staff employers run more than one establishment. I found no figure for either. The 1.3 million figure is a 2016 estimate [1].

## Problem

- **Pain:** A legal duty with fines: OSHA requires the log, a certified 300A posted from 1 February to 30 April, and ITA submission by 2 March for covered establishments [3]. Vendors state up to USD 16,550 per recordkeeping violation in 2026 [4][9]. OSHA accepts software-made equivalent forms in any format, including Excel or CSV [11], so a tool is legal.
- **Frequency:** The log is updated within 7 days of each recordable case [3], and the 300A is a yearly deadline. For a 20 to 50 person employer that may be a handful of cases a year, so the felt pain is mostly once a year, in January and February.
- **How people solve it today:** OSHA's own PDF and fillable forms [12][13]; free spreadsheets that total the 300A (Salus [9], LogStead [10]); manual entry straight into OSHA's ITA web form, which OSHA recommends for small submissions [14]; or paid software [4][5][6][7][8].
- **Sceptic's note:** I found no forum or Reddit buyer threads (the validator found none either). OSHA's ITA does not keep the log or print forms [14], which is the real gap, but a free spreadsheet fills it for an employer with a few cases a year.

## Competition

INR at 94.2754.

| Alternative | Price | Keeps log, 300A totals, 301, ITA CSV | Source |
|---|---|---|---|
| OSHA official forms (PDF, fillable) | Free | Paper or fillable files; no saved log, no totals carried for you | [13] |
| OSHA ITA web form | Free | Manual entry of 300A and 300/301 case data for submission; does not keep the log, cannot export, does not print the forms | [14] |
| Salus OSHA 300 Log Workbook (2026) | Free, no email | Excel or Google Sheets: 300 worksheet with 301 companion, totals the 300A, creates the ITA upload row; plus free exemption check, recordability tree, day counter | [9] |
| LogStead free tools | Free, no signup | Auto-totaling 300 and 300A workbook, recordability checker, TRIR and DART calculator, ITA CSV validator | [10] |
| LogStead | USD 39 a month (Rs 3,677) or USD 390 a year (Rs 36,767); 14 day trial | Online log, auto 300A, ITA-ready CSV | [4] |
| HB Next OSHA 300 Cloud | USD 99 a year per establishment (Rs 9,333, about Rs 778 a month) | 300 log and 300A generated, 301s from any device, 300A submission to ITA | [5] |
| SiteSafety HQ (Capterra listing; no own site found) | Crew USD 39 a month (Rs 3,677) up to 15 people, 1 location; Company USD 99; Pro USD 199 (Rs 18,760); 14 day trial, no free version; 0 reviews | Forms 300, 301, 300A; ITA e-filing on Company | [6] |
| Epostrix (Capterra listing; no own site found) | Growth USD 299 a month (Rs 28,188); free version listed, contents not stated | OSHA 300 auto-fill, 300A generation, CSV export, inside an OSHA and EPA suite | [7] |
| IncidentLog (AlternativeTo listing) | Freemium, limited free version; up to USD 89 a month (Rs 8,390) | QR code reporting; 300, 300A and 301 PDFs; ITA CSV not mentioned. Own site incidentlog.com only redirects to a /lander parking page on 28 Nov 2026, so free limits could not be verified and the product may be gone | [8] |
| UpKeep EHS | Not priced on the page; free trial; free Reporter seats only | Auto-populates 300, 300A and 301 | [15] |
| Mitti (formerly SafetyCulture) OSHA 300 log page | Checklists free for up to 10 users; 14 day trial | A checklist template; no 300A totals or ITA CSV stated | [16] |

**Re-check of IncidentLog's free tier.** Its listing says a limited free version produces 300, 300A and 301 PDFs [8], but its own domain is a parking redirect today, so I cannot confirm it exists. I do not count it as a working free rival, and I do not count it as proof the gap is open either.

**Does any free tool do the whole job end to end?** As an online, saved, multi-device log: no, not that I found. As a file: nearly yes. Salus's free workbook keeps the log, totals the 300A, has a 301 worksheet and builds the ITA upload row [9]; LogStead's free workbook totals the 300A and its free validator checks the ITA CSV [10]. The gap we fill is "online and kept for you, free", which an employer with a few cases a year may not value over a spreadsheet.

## Willingness to pay

- **For:** Five vendors charge for this exact job, from USD 99 a year per establishment [5] to USD 299 a month [7]. Every one clears the company's Rs 500 a month floor. The fine exposure [4][9] and the annual ITA deadline [3] give a reason to pay.
- **Against:** No vendor shows proof of many buyers: SiteSafety HQ has 0 reviews [6], Epostrix shows none [7], IncidentLog's site is parked [8], and LogStead is new (listed on Product Hunt and Indie Hackers [17]). Prices show what sellers ask, not how many pay. The cheapest paid rival is USD 99 a year [5], so there is a low ceiling.
- **Our model's problem:** the venture plans a free log for one establishment and charges only for several establishments, team access, history and import. Most 11 to 250 staff employers are likely single establishment (no figure found), so the free tier covers most of the market and the payer pool is unknown.
- **Price we could charge:** about USD 90 a year (Rs 8,485) per account, my assumption, under HB Next [5]. Not tested.

## Distribution

Only search, to pages and free tools on our own subdomain. Volumes are Google Ads US monthly averages from seodata.dev, read 28 Nov 2026.

| Search term | US monthly volume | CPC | Who holds page one now |
|---|---|---|---|
| osha 300 log | 8,100 [18] | USD 3.20 | Nevada DIR PDFs (two), biotech.law.lsu.edu, Mitti (SafetyCulture), slh.wisc.edu PDF, Oracle docs, Kansas DOL, Oregon OSHA PDF, Arkansas fillable PDF, bls.gov PDF, SAIF PDFs, hsi.com, mass.gov, bluehive.com, eCFR, salussafety.io, duralabel, coggno [12] |
| osha form 300 | 9,900 [19] | USD 2.86 | not re-searched by me; the validator's search shows government PDFs, bamboohr.com glossary and osha.gov (venture screen) |
| osha 300a (and osha form 300a, 9,900) | 2,900 [20] | USD 4.74 | bls.gov PDF, Mitti (two), osha.gov forms (several URLs), labor.nc.gov fillable, Nevada DIR, hsi.com, jjkeller.com, ServiceNow docs, bluehive.com [21] |
| osha form 301 | 1,900 [22] | USD 1.77 | not searched separately |
| osha recordkeeping | 1,300 [23] | USD 12.64 | not searched separately |
| osha 300 log software | 0 [24] | none | buyers do not search for software |

Variants (osha form 300, osha log 300, osha form 300a) share Google groups with the head term [18][19], so I count the 8,100 head term, not the sum. Searches peak around the 1 February posting and 2 March ITA deadline [3]; monthly averages hide that.

**Could our pages rank and convert?**

- **For:** Page one is mostly static PDFs from state agencies and bls.gov [12][21], CPCs are USD 2 to 5 [18][20], so few funded vendors fight for the head terms, and no page-one result is an online log you can keep. A free tool that does the job beats a PDF for the searcher's intent.
- **Against:** osha.gov and bls.gov hold several spots each and will not move [12][21]. Mitti, HSI and J. J. Keller are high authority. Salus already ranks with a free tool that does most of the job, no email [9][12]. A new subdomain is unlikely to reach page one before the February 2027 peak, so the first real season is probably January 2028. The buyer intent is "download a form", and a buyer with three cases a year downloads Salus's workbook and leaves.
- **Verdict:** distribution is possible, not owned by giant free tools, but slow and seasonal: 3, not more.

## Unit economics

Assumptions (mine, not measured): USD 90 a year (Rs 8,485) paid account for several establishments; no ads; hosting on the free Vercel plan, cash cost Rs 0 under the Rs 0 cap; no payment rail exists (company/approvals/ap-2.json decided "do nothing for now"), so revenue starts only after the owner opens one. Click-through and conversion are assumptions.

- **Worst:** USD 0 (Rs 0). Not on page one by 26 Feb 2027, or no payment rail. 0 x USD 90 = 0.
- **Likely:** USD 90 (Rs 8,485). Page two for the 8,100 head term [18] by day 60; assumed 1% click-through = 81 visits a month, about 160 over two months; assumed 0.5% pay (only multi-establishment users have a reason) = 1 payer x USD 90 = USD 90.
- **Best:** USD 3,690 (Rs 3,47,876). Top five by day 30 for osha 300 log, osha 300a and osha form 301 (8,100 + 2,900 + 1,900 = 12,900 [18][20][22]); assumed 8% click-through = 1,032 visits a month, 2,064 over the two peak months; assumed 2% pay = 41 payers x USD 90 = USD 3,690.
- **Costs:** Rs 0 cash. The build is not small: accounts, saved cases with injured workers' names and health details (OSHA privacy cases [3]), five year retention [3], 301 reports and a correct ITA CSV. That needs security and legal review because it holds employee health data.

## Sizing

To follow: the sizing agent (Farhan) adds this in cases/osha-log.sizing.json.

## Risks

- **It would prove me wrong if** pages on osha-log.anchit-tandon.com reach 1,000 or more Google Search Console impressions a week for osha 300 terms by 31 Jan 2027, in the peak season. I expect under 200.
- **It would prove me wrong if** 10 or more accounts pay by 26 Feb 2027 (90 days). I expect 0 or 1.
- **Free rival risk:** Salus's free workbook [9] and LogStead's free tools [10] already do most of the job and Salus ranks on page one [12]. If either adds a free online log, the gap closes.
- **Model risk:** the free single-establishment tier covers most of the target; payers are multi-establishment employers, whose number is unknown.
- **Data risk:** the log holds injured workers' names and illness details; a breach is real harm. Privacy cases must be handled as OSHA requires [3].
- **Legal risk:** we must not claim the output guarantees compliance; OSHA accepts equivalent forms only if they carry the same information [11].
- **Payment risk:** no payment rail (ap-2); any revenue needs the owner's identity for a payment account.
- **Seasonality risk:** a new site will likely miss the Feb 2027 peak, so 90 day revenue is near zero even if the product is good.

## Options

- **Proceed:** build the free online log with 300, 300A, 301 and ITA CSV, and a USD 90 a year multi-establishment tier. Expected 90 day revenue USD 0 to 3,690, likely about USD 90.
- **Pivot to paid per establishment (charge the single establishment for the ITA CSV and 301s, like LogStead [4] and HB Next [5]):** fixes the model but puts us head to head with a USD 99 a year incumbent and free spreadsheets that already make the ITA row [9]; not recommended without new evidence of buyers.
- **Stop:** kill osha-log; keep the finding that "kept online log" is open but small, and move the build to a job whose free alternatives are weaker.

## Scorecard

| Key | Score | Reason |
|---|---|---|
| pain | 3 | A legal duty with fines up to USD 16,550 stated for 2026 [3][4][9], but a few cases a year for most small employers and no buyer threads found. |
| willingnessToPay | 3 | Five vendors charge USD 99 a year to USD 299 a month for it [4][5][6][7][8], but none shows reviews or buyer counts, and the floor is USD 99 a year [5]. |
| marketSize | 4 | About 1.3 million covered establishments [1] and about 300,000 ITA filers a year [2]; how many are multi-establishment (our payers) is unknown. |
| distribution | 3 | 8,100 a month for the head term [18] with low CPCs and many static PDFs on page one [12][21], but osha.gov, bls.gov, Mitti and a free Salus tool hold it, and the peak is seasonal. |
| competitionGap | 2 | No free online kept log exists, but free workbooks from Salus and LogStead already log, total the 300A and build the ITA row [9][10]. |
| speedToRevenue | 2 | No payment rail (ap-2), a new site will miss the Feb 2027 peak, and the free tier gives most users all they need. |
| recurringRevenue | 3 | The duty repeats every year with five year retention [3], so annual billing fits, but a small employer can drop back to a free workbook any year. |

Total: 20 of 35. Bar: 24 total, none under 2, willingnessToPay and distribution at least 3. Fails on total.

## Recommendation

No-go. The duty is real, the market is large and sellers do charge for it, but the free alternatives already do most of the job as files (Salus, LogStead, OSHA's own forms and ITA web form), our revenue model gives away the log that most of the target needs, and a new subdomain is unlikely to rank before the February 2027 peak. The likely 90 day revenue is about USD 90.

## Sources

1. OSHA final rule, Improve Tracking of Workplace Injuries and Illnesses, 81 FR 29623, 12 May 2016 ("covers more than 600,000 employers with approximately 1,300,000 establishments"): https://www.govinfo.gov/content/pkg/FR-2016-05-12/html/2016-10443.htm
2. OSHA final rule, Improve Tracking of Workplace Injuries and Illnesses, 88 FR 47254, 21 Jul 2023 (ITA 300A submissions from roughly 300,000 establishments a year; 52,092 Appendix B establishments submit 300/301): https://www.govinfo.gov/content/pkg/FR-2023-07-21/html/2023-15091.htm
3. 29 CFR Part 1904 (partial exemptions, 7 day recording, privacy cases, 300A posting 1 Feb to 30 Apr, five year retention, electronic submission): https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1904
4. LogStead home page (USD 39 a month or USD 390 a year, 14 day trial, ITA-ready CSV, USD 16,550 penalty claim): https://log-stead.vercel.app
5. HB Next OSHA 300 Cloud (USD 99.00 per year per establishment): https://www.hbnext.com/software-services/osha-300-cloud/
6. SiteSafety HQ on Capterra (Crew USD 39, Company USD 99, Pro USD 199 a month; 0 reviews): https://www.capterra.co.uk/software/1112709/SiteSafety-HQ
7. Epostrix on Capterra (Growth USD 299 a month, Professional USD 599): https://www.capterra.com/p/10045583/Epostrix/
8. IncidentLog on AlternativeTo (freemium, up to USD 89 a month, 300/300A/301 PDFs); own site https://incidentlog.com redirects to /lander on 28 Nov 2026: https://alternativeto.net/software/incidentlog/about/
9. Salus OSHA 300 log guide and free workbook (300A totals, ITA upload row, 301 companion, no email; 2026 penalty figures): https://www.salussafety.io/us/osha/300-log
10. LogStead free tools (auto-totaling 300 and 300A workbook, ITA CSV validator, no signup): https://log-stead.vercel.app/tools
11. OSHA letter of interpretation, 29 Apr 2025 (equivalent forms in any format accepted): https://www.osha.gov/laws-regs/standardinterpretations/2025-04-29
12. Page one, "osha 300 log" (WebSearch, 28 Nov 2026): https://dir.nv.gov/uploadedFiles/dirnvgov/content/Governance/300%20Logs%20(Instructions).pdf , https://biotech.law.lsu.edu/map/OSHA200Log.html , https://safetyculture.com/logs/osha-300-log , https://www.slh.wisc.edu/wp-content/uploads/2014/10/OSHA-300-Form.pdf , https://docs.oracle.com/en/applications/jd-edwards/health-safety-environment/9.2/eoasi/understanding-the-osha-300-log-report-and-the-osha-300a-summary.html , https://osha.oregon.gov/OSHARules/pd/pd-249.pdf , https://labor.arkansas.gov/wp-content/uploads/OSHA-300-fillable.pdf , https://www.bls.gov/respondents/iif/forms/oshaforms.pdf , https://hsi.com/blog/making-sense-of-the-osha-300-log-and-osha-forms-300a-and-301 , https://bluehive.com/resources/forms/osha-300-log/ , https://www.salussafety.io/us/osha/300-log , https://resources.duralabel.com/articles/what-is-an-osha-300-log-and-do-i-have-to-use-one
13. OSHA recordkeeping forms 300, 300A, 301: https://www.osha.gov/recordkeeping/forms
14. OSHA ITA FAQs (manual web form entry; ITA does not keep or export records): https://www.osha.gov/injuryreporting/faqs
15. UpKeep EHS: https://upkeep.com/product/ehs/
16. Mitti (formerly SafetyCulture) OSHA 300 log page, safetyculture.com now redirects here: https://mitti.com/logs/osha-300-log
17. LogStead on Indie Hackers: https://www.indiehackers.com/product/logstead and Product Hunt: https://www.producthunt.com/products/logstead
18. seodata.dev, "osha 300 log": https://api.seodata.dev/v1/keyword?q=osha+300+log&country=us
19. seodata.dev, "osha form 300": https://api.seodata.dev/v1/keyword?q=osha+form+300&country=us
20. seodata.dev, "osha 300a": https://api.seodata.dev/v1/keyword?q=osha+300a&country=us
21. Page one, "osha form 300a" (WebSearch, 28 Nov 2026): https://www.bls.gov/respondents/iif/forms/oshaforms.pdf , https://safetyculture.com/checklists/osha-form-300a , https://www.osha.gov/recordkeeping/forms , https://www.labor.nc.gov/osh/osh-example-programs/osha-recordkeeping-forms-300-300a-and-301-pdf-fillable , https://hsi.com/blog/making-sense-of-the-osha-300-log-and-osha-forms-300a-and-301 , https://www.jjkeller.com/learn/osha-recordkeeping-overview , https://bluehive.com/resources/forms/osha-300a-summary/
22. seodata.dev, "osha form 301": https://api.seodata.dev/v1/keyword?q=osha+form+301&country=us
23. seodata.dev, "osha recordkeeping": https://api.seodata.dev/v1/keyword?q=osha+recordkeeping&country=us
24. seodata.dev, "osha 300 log software": https://api.seodata.dev/v1/keyword?q=osha+300+log+software&country=us
