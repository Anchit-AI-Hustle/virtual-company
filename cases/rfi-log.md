# RFI Log business case

Author: Meera, Head of Research. Date: 2026-11-28. FX used: USD 1 = INR 94.2754 (company/config.json, source xflowpay, as of 2026-11-14). I did not propose or validate this idea and gain nothing if it passes. Firecrawl credits were exhausted this cycle, so this case uses WebSearch and WebFetch. Several WebFetch calls were refused this session (fieldwire.com/pricing, dailybuild.co, contractorforeman.com/plans, knowify.com/pricing, census.gov); where a page was refused I use the figure already recorded on company/ventures/rfi-log.json and say so. Every other vendor price was read on the vendor's own page on 28 Nov 2026.

## Summary

- Contractors pay for RFI tracking only inside construction suites: Fieldwire Business Plus USD 89 a user a month [1], Knowify from USD 99 a month [2], Raken USD 23 to 59 a user a month with a 3 user minimum [3], Forma Build from USD 117 a month [4], Contractor Foreman from USD 49 a month [5]. No one shows sales for RFI tracking alone; the one standalone RFI kit we found (Payhip, USD 19) shows no reviews or sales [6].
- The free part is already given away: Procore offers a free Excel RFI log and PDF RFI form [7], Smartsheet, SafetyCulture, Levelset, Jotform, ClickUp, Mastt and ProjectManager publish free RFI or submittal log templates [8][9][10].
- Distribution fails: about 1,530 US searches a month across the three terms [11], and a second search source shows "rfi template" page one held by Asana, Notion, Oracle, monday, ClickUp, Smartsheet, Autodesk and Procore (Levelset), with "rfi log" mostly off topic [12].
- Score 17 of 35. Recommendation: no-go.

## Market

**Who pays.** Small US general contractors and subcontractors on commercial jobs too small for Procore, who must send RFIs to architects and owners and track replies against due dates. Every competitor prices in USD [1][2][3][4][5][6] and the buyer posts are US contractors [13][14][15]. This is a USD product.

**How many.** null. I did not open a count of US general contractors or subcontractors this session (the Census page I tried was refused). The demand signal I do have is search: about 1,530 US searches a month for "rfi template", "submittal log" and "rfi log" combined [11], and "rfi template" carries procurement intent too [11][12].

**What is not known:** how many small GCs write enough RFIs to want a log (RFIs are mostly a commercial and public job habit, less so residential remodels), how many already use a spreadsheet they are content with, and how many already have Procore, Fieldwire or Buildertrend from a larger client.

## Problem

- **Pain:** Real but modest. A small LA commercial GC with about 40 active jobs tracks RFIs and change orders in Google Sheets and calls Procore too heavy [13]; a small commercial GC owner wanted a board to track RFIs and hold stakeholders accountable [14]; a Mike Holt forum member tracking RFIs in a spreadsheet wanted purpose built software [15]. A late RFI answer can stall a job, so the cost of a lost RFI is real.
- **Frequency:** Repeats on every commercial job, several to dozens of RFIs per project, which suits a subscription.
- **How people solve it today:** a spreadsheet or Word form (free templates from Procore [7], Smartsheet [8] and others [9]), email, or the RFI module of the suite they already pay for [1][2][3][4][5].
- **Sceptic's note:** the VitalMX owner who found Procore more than they needed bought Procore anyway [14], and the Mike Holt replies point to AIA document software, Oracle or a home made Access database [15]. Buyers who outgrow a spreadsheet move to a suite, not to a single purpose RFI tool. Three buyer posts is thin evidence for a whole market.

## Competition

INR at 94.2754. Prices from each vendor's own page unless marked.

| Alternative | Price | RFI log, reply link, due dates | Source |
|---|---|---|---|
| Procore free RFI templates | Free | PDF RFI form and Excel RFI log, static | [7] |
| Smartsheet free RFI templates | Free; Smartsheet Pro USD 9 a member a month yearly, USD 12 monthly (Rs 848 / Rs 1,131), no free plan, 30 day trial | Word and Excel RFI forms and logs; a live shared sheet on Pro | [8][16] |
| SafetyCulture, Levelset, Jotform, ClickUp, Mastt, ProjectManager, MangoApps templates | Free (template pages; plan prices not read) | Static or form based RFI and submittal logs | [9][10] |
| Payhip RFI + Submittal Log Kit | USD 19 once (Rs 1,791); membership USD 15 a month or USD 149 a year | Excel and Google Sheets log with ball in court, due dates, overdue flags, dashboard; no reply link; no reviews or sales shown | [6] |
| CM Fusion RFI Management app | Free download, 30 day trial then a paid plan, price not shown; no ratings | Document and RFI workflow | [17] |
| Raken | Basic USD 23, Performance USD 59 a user a month billed yearly, minimum 3 users (Rs 6,505 a month minimum on Basic) | RFIs with reminders, and external guests reply through an emailed guest link; the page does not say which plan includes RFIs | [3] |
| Fieldwire Business Plus | USD 89 a user a month (Rs 8,391), first plan with RFIs and submittals; free Basic has neither | Full RFI and submittal workflow | [1] (venture file; page refused this session) |
| Knowify | From USD 99 a month (Rs 9,333) | RFIs and submittals with response due dates and a portal where respondents reply, attach files and e-sign | [2] |
| Contractor Foreman | From USD 49 a month (Rs 4,619) | Submittals listed, RFIs mentioned under Documents | [5] |
| Forma Build (Autodesk Build) | From USD 117 a month (Rs 11,030); Essentials tier lists no RFIs | RFIs and submittals | [4] |
| Procore | No published price; annual contracts, unlimited users | RFI tool (the evidence says about USD 20k a year on a USD 15M job [13]) | [18] |
| Buildertrend | Custom quote, no published price | Not stated on the pricing page | [19] |

**The gap we would fill.** A free, no account RFI log on a phone with a reply link the architect can answer without signing up, and due date tracking. The reply link without a suite is the only open part, and it is narrow: Raken already gives external guests an emailed reply link [3] and Knowify a respondent portal [2], both inside suites a growing GC will buy anyway; the log and due dates are free in Procore's and Smartsheet's templates [7][8] and USD 19 in the Payhip kit [6]. If free tools do the log well, and they do, our only edge is the reply link.

## Willingness to pay

- **For:** GCs pay USD 49 to 117 a month or more for suites that include RFIs [1][2][3][4][5], and Fieldwire withholds RFIs from its free plan to push upgrades to USD 89 a user [1]. All clear the company's Rs 500 a month floor.
- **Against:** I found no evidence anyone pays for RFI tracking alone. The single standalone product (Payhip kit, USD 19) shows no reviews or sales [6]. The small GC in the evidence who called Procore too heavy is still on Google Sheets [13]; the one who called it too big bought it [14]. The payer buys the suite.
- **Price we could charge:** about USD 15 a month (Rs 1,414), my assumption and not tested: equal to the Payhip membership [6], well under Raken's 3 user minimum [3].

## Distribution

Our only channel is search to pages and free tools on our own subdomain.

| Search term | US monthly volume | Who holds page one now |
|---|---|---|
| rfi template | 1,000 [11] | Second source: safetyculture, Oracle docs (2), Asana (2), Harvard PDF, Notion, Google Docs, Spendflo, Autodesk (2), Responsive, ClickUp, monday, mass.gov, Smartsheet (2), ProjectManager (2), Levelset (Procore), Mastt [12]; much of it procurement intent |
| submittal log | 320 [11] | Jotform (2), Smartsheet, ClickUp, Autodesk, ProjectManager, MangoApps, Sitemate, Mastt, Spreadsheet Daddy, Etsy [10] |
| rfi log | 210 [11] | Mostly off topic (radio frequency interference, remote file inclusion, NetApp, Oracle docs, Wikipedia) plus Newforma, Autodesk Forma Build, Hexagon EcoSys help pages [12] |
| rfi log template construction | not measured | SafetyCulture (2), Archdesk, Paperform, Smartsheet (2), MangoApps (2), Procore, Levelset, Jodoo, CrewCost, Google Docs [9] |

**Could our pages rank and convert?** Not within 90 days.

- The first source (Firecrawl) showed weak sites on page one for "rfi template" (mitti, dailybuild, planspan, Scribd, Pinterest) [11]. On the second source none of them appeared; page one is Asana, Notion, Oracle, monday, ClickUp, Smartsheet, Autodesk and Procore's Levelset [12]. I weigh the second source heavily: the weak results did not hold, and the strong result I would have to beat is a very high authority domain.
- Most of the 1,000 "rfi template" searches are not construction RFIs [12], so the construction slice is smaller than the headline. "rfi log" (210) is mostly off topic [12], so its construction slice is a fraction of 210.
- "submittal log" (320) page one is Jotform, Smartsheet, ClickUp, Autodesk and ProjectManager [10].
- At best a few hundred construction searches a month are left, and a converted visitor can download Procore's free Excel log [7] in one click.
- Long tail (for example "rfi log template construction") exists but I have no volume for it read this session, so I do not count it.

## Unit economics

Assumptions (mine, not measured): USD 15 a month (Rs 1,414) paid tier; no ads; hosting on the existing free Vercel plan, cash cost Rs 0 under the Rs 0 spend cap; no payment rail exists (company/approvals/ap-2.json, decided "do nothing for now"), so no revenue until the owner opens one. Click-through and conversion rates are assumptions.

- **Worst:** USD 0 (Rs 0). Not on page one in 90 days, or no payment rail. 0 x USD 15 = 0.
- **Likely:** USD 0 to 30 (Rs 0 to 2,828). Page two for part of the 1,530 searches [11] by day 60; assumed 1% click-through = 15 visitors a month, 30 over two months; assumed 2% paying = 0.6, so 0 or 1 payer: 1 x USD 15 x 2 = USD 30.
- **Best:** USD 210 (Rs 19,798). Top five for all 1,530 searches by day 30; assumed 8% click-through = 122 visitors a month, 245 over two months; assumed 3% paying = 7 payers: 7 x USD 15 x 2 = USD 210.
- **Costs:** Rs 0 cash. The free one-off RFI with PDF is a small build. The paid tier needs accounts, a saved project log, reply links with access control for outside parties, reminders and team use, which is a real build plus security and legal review (drawings and project details are confidential to the client).

## Sizing

The sizing agent (Farhan) adds this in cases/rfi-log.sizing.json.

## Risks

- **It would prove me wrong if** pages on rfi-log.anchit-tandon.com reach 500 or more Google Search Console impressions a week for RFI and submittal terms by 28 Jan 2027. I expect under 100.
- **It would prove me wrong if** 10 or more contractors pay by 28 Feb 2027 (90 days). I expect 0.
- **Intent risk:** much of "rfi template" is procurement, and "rfi log" is mostly radio and security [12]; the construction slice of 1,530 is unknown and likely well under half.
- **Suite risk:** buyers who outgrow a spreadsheet buy Procore, Fieldwire, Raken or Knowify [13][14][1][3][2]; a single purpose tool sits between a free template and a suite.
- **Copy risk:** Procore's and Smartsheet's free logs [7][8] are one reply link away from our free version, and Raken already has the guest reply link [3].
- **Payment risk:** no rail exists (ap-2). Any revenue needs the owner's identity for a payment account.

## Options

- **Proceed:** build the free phone RFI with PDF and a USD 15 a month project log with reply links. Expected 90 day revenue USD 0 to 210, against free Procore and Smartsheet logs and suites with reply links.
- **Pivot to a bundle with the change order and work order ideas (one small GC paperwork site):** pools the searches, but all three cases scored no-go on the same page one (Smartsheet, Procore, Autodesk); not recommended without a new screen of measured long tail volumes.
- **Stop:** kill rfi-log and spend the build on a job where page one is not held by Asana, Oracle, Smartsheet, Autodesk and Procore.

## Scorecard

| Key | Score | Reason |
|---|---|---|
| pain | 3 | RFIs repeat on every commercial job and small GCs juggle them in spreadsheets [13][15], but only three buyer posts and one bought Procore anyway [14]. |
| willingnessToPay | 3 | GCs pay USD 49 to 117 a month and up for suites with RFIs [1][2][3][4][5]; no evidence anyone pays for RFI tracking alone, and the USD 19 kit shows no sales [6]. |
| marketSize | 2 | Buyer count is null (not measured this session); 1,530 searches a month [11] with mixed intent [12] point to a small construction slice. |
| distribution | 2 | Page one for "rfi template" is Asana, Notion, Oracle, monday, ClickUp, Smartsheet, Autodesk and Levelset, and "rfi log" is mostly off topic [12]; the weak results on the first source did not hold. |
| competitionGap | 2 | The log is free from Procore and Smartsheet [7][8]; the reply link exists in Raken and Knowify [3][2]; only a free no-suite reply link is open. |
| speedToRevenue | 2 | The free form is fast, but no payment rail exists (ap-2) and the paid log needs accounts and outside party access. |
| recurringRevenue | 3 | RFIs recur through a job and the category bills monthly [1][3], but a small GC may pay only while a commercial job is open. |

Total: 17 of 35. Bar: 24 total, none under 2, willingnessToPay and distribution at least 3. Fails on total and on distribution (2).

## Recommendation

No-go. The job is real, but contractors pay for it only inside suites, the log itself is free from Procore and Smartsheet, and the one open edge (a reply link for the architect) already exists in Raken and Knowify. The 1,530 monthly searches are small, mixed with procurement and radio intent, and a second search source shows page one held by Asana, Notion, Oracle, monday, ClickUp, Smartsheet, Autodesk and Procore. A new subdomain will not reach 100 paying contractors in 90 days.

## Sources

1. Fieldwire pricing (recorded on company/ventures/rfi-log.json; refused on WebFetch this session): https://www.Fieldwire.Com/pricing/
2. Knowify RFI and submittal management: https://knowify.com/rfi-submittal-management-software/
3. Raken RFIs and pricing: https://www.rakenapp.com/rfis-cya
4. Forma Build (Autodesk Build) overview: https://www.autodesk.com/products/forma-build/overview
5. Contractor Foreman home page: https://contractorforeman.com/
6. Payhip RFI + Submittal Log Kit: https://payhip.com/b/ANSyY
7. Procore free RFI templates: https://www.procore.com/library/rfi-templates
8. Smartsheet free construction RFI templates: https://smartsheet.com/content/construction-rfi-templates
9. Page one, "rfi log template construction" (WebSearch 2026-11-28): https://safetyculture.com/library/construction/rfi-log-template-4pupwtxgip5qmnda , https://archdesk.com/blog/rfi-log-template-construction , https://www.levelset.com/blog/rfi-templates-construction/ , https://www.mangoapps.com/templates/forms/rfi-log-and-register , https://www.jodoo.com/ai/construction-rfi-log
10. Page one, "submittal log template" (WebSearch 2026-11-28): https://www.jotform.com/table-templates/submittal-log , https://smartsheet.com/content/construction-submittal-templates , https://clickup.com/templates/submittal-log-t-205427505 , https://www.projectmanager.com/blog/construction-submittal-log , https://www.mastt.com/resources/submittal-log-template
11. Venture screen and first page one check (company/ventures/rfi-log.json, screen.searches and screen.serp): https://api.seodata.dev/v1/keyword?q=rfi+template&country=us , https://api.seodata.dev/v1/keyword?q=submittal+log&country=us ; rfi log from DataForSEO via Firecrawl Alexandria, request 4908d495-cca6-4d96-82d7-3c3039db7ae2
12. Second page one check, WebSearch 2026-11-28 (company/ventures/rfi-log.json, serpCheck2): https://monday.com/blog/project-management/rfi-template , https://www.projectmanager.com/blog/rfi-in-construction , https://www.levelset.com/blog/rfi-templates-construction/
13. r/ConstructionManagers thread via Redlib mirror (venture evidence): https://axebps-redlib.hf.space/r/ConstructionManagers/comments/1aocj9c/construction_management_software_recommendations
14. VitalMX forum, small GC software (venture evidence): https://www.vitalmx.com/forums/non-moto/construction-general-contracting-p-m-software
15. Mike Holt forum, RFI tracking software (venture evidence): https://forums.mikeholt.com/goto/post?id=1258458
16. Smartsheet pricing: https://www.smartsheet.com/pricing
17. CM Fusion RFI Management, App Store: https://apps.apple.com/np/app/rfi-management-by-cm-fusion/id6479235190
18. Procore pricing: https://www.procore.com/pricing
19. Buildertrend pricing guide: https://buildertrend.com/construction-software-pricing/
