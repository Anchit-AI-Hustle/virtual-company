# Fleet Service Log business case

Author: Meera, Head of Research. Date: 2026-11-21. FX used: USD 1 = INR 94.2754 (company/config.json, source xflowpay, as of 2026-11-14). I did not propose this idea and gain nothing if it passes. Search volumes are DataForSEO Google Ads monthly averages for the United States (location 2840, English), pulled through Firecrawl Alexandria on 21 Nov 2026 [1]. Page one results are live Firecrawl searches from the United States on the same day.

## Summary

- Buyers clearly pay for fleet maintenance software in USD: Fleetio from USD 4 to 10 a vehicle a month [2], Simply Fleet USD 3 to 5 [3], AUTOsist USD 3 to 6 with a USD 59 monthly minimum [4], Whip Around USD 5 to 9 [5], and Etsy sells fleet trackers for USD 2 to 30 once [6].
- The low end is already covered for free: Simply Fleet Free gives up to 5 vehicles, 3 users, inspections, reminders and a driver app [3]; LubeLogger is free, open source and multi user [7]; Fleetio gives away fleet maintenance, inspection and PM spreadsheets [8].
- Distribution is the failure point. The one buyer term over 1,000 searches, "fleet maintenance software" (1,300, CPC USD 158.41), is held by MaintainX, Fleetio, Geotab, Forbes and Coast. The big volume terms ("vehicle maintenance log" 1,900, "vehicle inspection checklist" 2,900) are mostly car owners and state inspection checks, and page one is Amazon, FMCSA PDFs, Vertex42, Etsy and state DMVs. Fleet specific long tail terms add up to about 440 searches a month [1].
- There is no payment rail yet (company/approvals/ap-2.json, decided "do nothing for now").
- Score 19 of 35. Recommendation: no-go. It fails the total bar and the distribution minimum of 3.

## Market

**Who pays.** Owners and office managers of small US service businesses that run vans and pickups: landscapers, plumbers, HVAC firms and local delivery. Every priced competitor sells in USD [2][3][4][5] and the regulatory hooks (DOT, FMCSA DVIR) are US rules [9][10]. This is a USD product. The one piece of demand evidence from a person (a Reddit post) is from a UK landscaper [11], which is not the core market and does not change the currency.

**How many (sourced):**

| Measure | Number | Source |
|---|---|---|
| US landscaping services employer establishments, all sizes | 117,969 | Census CBP 2023, NAICS 561730 [12] |
| Of those, with 5 to 49 employees (17,046 + 9,491 + 5,814) | 32,351 | Census CBP 2023 [12] |
| US plumbing, heating and air conditioning contractor employer establishments | 111,207 | Census CBP profile, NAICS 238220 [13] |
| US motor carriers operating ten trucks or fewer | about 580,000 (91.5%) | smallfleethq.com, secondary source citing FMCSA data [14] |

**What is not known:** employees are not vehicles. How many of the 32,351 landscapers with 5 to 49 staff run 5 to 50 vehicles is unknown; how many already use Fleetio, Simply Fleet, a field service suite or a spreadsheet is unknown. BTS stopped counting fleets under 15 vehicles after 2013 [15], so there is no official count of fleets in our 5 to 50 band. The motor carrier figure is from a secondary site and includes owner operators with one truck, who are not our buyer.

**Who is not the buyer.** Car owners logging oil changes (the bulk of "vehicle maintenance log" searches, see Distribution), and fleets with a full time fleet manager who already buy Fleetio or MaintainX.

## Problem

- **Pain:** Real but moderate. A UK landscaping business with 8 cars and vans asked for a simple tool for service, mileage and running costs because the platforms it found were built for much bigger fleets [11]. Missed services and lost history cost money, and DOT carriers must keep inspection, repair and maintenance records [9][10].
- **Frequency:** Repeats. Services come round by mileage or months, and inspection reports are daily for commercial drivers who find a defect [10]. This favours a subscription.
- **How people solve it today:** a free spreadsheet (Fleetio [8], Vertex42 [16]), a paid Etsy template [6], a free plan (Simply Fleet Free [3]), a self hosted free app (LubeLogger [7]), or a paid per vehicle app [2][4][5].
- **Sceptic's note:** In the thread cited as evidence, replies point the asker to a spreadsheet or a consumer garage app and the asker settled on a manual solution (noted in the venture's own evidence against, company/ventures/fleet-log.json; I could not re-read the thread because Firecrawl does not support reddit.com). For a 5 to 10 vehicle firm, a spreadsheet is good enough, which caps the pain.

## Competition

All prices are from each vendor's own page, except Whip Around (noted). INR at 94.2754.

| Alternative | Price | What it does | Source |
|---|---|---|---|
| Simply Fleet Free | USD 0, up to 5 vehicles, 3 users, 6 months of data | Maintenance, inspections, reminders, driver app | [3] |
| Simply Fleet Essential / Advanced | USD 3 / USD 5 a vehicle a month (Rs 283 / Rs 471), 5 vehicle minimum. 10 vehicles: USD 30 (Rs 2,828) | Full fleet maintenance and inspections | [3] |
| Fleetio Essential / Professional / Premium | USD 5 billed monthly or USD 4 annually / USD 7 / USD 10 a vehicle a month. 14 day trial, no free plan. 10 vehicles monthly: USD 50 (Rs 4,714) | Service reminders, inspections with FMCSA templates, offline forms | [2] |
| Fleetio free tools | USD 0 | Downloadable fleet maintenance spreadsheet, PM schedule, vehicle inspection form, mileage and fuel logs, DOT inspection form pack | [8] |
| LubeLogger | USD 0, open source, self hosted | Many vehicles, service records, reminders, multiple users; no hosted option shown | [7] |
| AUTOsist | USD 3 to 6 a vehicle a month billed annually, monthly 15% higher, minimum USD 59 a month (Rs 5,562). 14 day trial | DVIR forms, maintenance reminders | [4] |
| Whip Around | Standard USD 5 a vehicle a month, Pro USD 9 (Rs 471 / Rs 848) | DVIR, defect management, maintenance in Pro | [5] (G2, third party; vendor pricing page returned 404) |
| MaintainX | Basic USD 0 (limited repeating work orders); Essential USD 20 a user a month annually or USD 25 monthly (Rs 2,357) | General maintenance CMMS with a fleet page that ranks first for "fleet maintenance software" | [17] |
| Etsy templates | USD 1.99 to 29.95 once (Rs 188 to Rs 2,824); the USD 29.95 fleet tracker has 54 reviews at 4.7, a USD 3.99 car tracker has 1.1k reviews | Excel or Google Sheets logs | [6] |
| Vertex42 template | USD 0 | Excel vehicle maintenance log | [16] |

**The gap we would fill.** A phone first, no account log with a driver inspection link, priced flat for 5 to 50 vehicles. That gap is thin. Simply Fleet already gives a free driver app and inspections up to 5 vehicles and charges USD 30 a month for 10 [3]; Fleetio gives the spreadsheets away [8]. "No account" is not a reason a business pays: a business wants its fleet records kept safely, which means an account. The golf-league venture was killed for the same pattern (company/ventures/golf-league.json).

## Willingness to pay

- Per vehicle subscriptions are the norm and plentiful: USD 3 to 10 a vehicle a month across Simply Fleet, Fleetio, AUTOsist and Whip Around [2][3][4][5]. A 10 vehicle fleet on Fleetio Essential monthly pays USD 50 (Rs 4,714) [2], well above the company's Rs 500 floor.
- One off payment also happens: the USD 29.95 Etsy fleet tracker has 54 reviews and a USD 17.99 "300 vans" tracker has 15 [6]. Review counts are not sales counts; sales are unknown.
- Advertisers bid USD 158.41 a click for "fleet maintenance software" and USD 266.54 for "fleet maintenance tracker" [1], which says vendors earn a lot per buyer.
- Against: the price we could charge is boxed in. Below 6 vehicles Simply Fleet is free [3]; at 10 vehicles it is USD 30 a month. To win on price we would charge about USD 19 a month flat (Rs 1,791). That is my assumption for the arithmetic below, not a tested price.

## Distribution

Our only channel is search to pages and free tools on our own subdomain.

| Search term | US monthly volume [1] | CPC USD [1] | Who holds page one now |
|---|---|---|---|
| vehicle inspection checklist | 2,900 | 2.40 | California BAR, NY DMV, Virginia Tire, bank and dealer PDFs, Mitti (SafetyCulture). Mostly state and used car buyer intent |
| vehicle maintenance log | 1,900 | 2.70 | Amazon log books, FMCSA PDF, Vertex42, Etsy, Fleetio blog, Reddit r/cars, AAA, YouTube, Pinterest |
| fleet maintenance software | 1,300 | 158.41 | MaintainX, Fleetio, Reddit r/DieselTechs, iWorQ, RTA Fleet, US Chamber, Geotab, Coast, Forbes, YouTube |
| dot inspection form | 880 | 5.38 | FMCSA PDF, J.J. Keller, Amazon, MapTrack, Caltrans, DOT Safety Plus, Walmart |
| vehicle maintenance log template | 880 | 2.23 | Vertex42, FMCSA PDF, Reddit, Xappex, Fleetio blog, Etsy, Smartsheet, TemplateLab |
| driver vehicle inspection report | 720 | 9.58 | Two FMCSA pages, FMCSA PDF, J.J. Keller, Webfleet, Driveroo, Amazon |
| fleet maintenance software free | 260 | 23.27 | Fleetio tools, FleetVIP, AUTOsist, Capterra, Simply Fleet, Fleetio, Reddit, Spiceworks, SourceForge |
| pre trip inspection app | 260 | 22.94 | Pre-Trip, Mitti, CDL College, GoAudits, Fleet Rabbit, Lumiform, Driveroo, Whip Around, Fleetio |
| vehicle maintenance tracker | 210 | 32.49 | carmaintenance.app, CARFAX, Reddit, Drivvo, Amazon, AAA, CarJourney. Consumer intent |
| vehicle maintenance app | 210 | 4.62 | not searched |
| Fleet specific long tail: fleet maintenance tracker 90, fleet maintenance app 90, fleet maintenance spreadsheet 70, dvir app 70, fleet vehicle maintenance log 50, fleet maintenance log 40, small fleet management software 30 | 440 combined | 15.80 to 266.54 | not each searched; the parent terms above are held by Fleetio, Simply Fleet and review sites |

Page one lists come from live searches on 21 Nov 2026 [18][19][20][21][22][23][24][25][26].

**Could our pages rank and convert?** Honestly, not soon and not much.

- The high volume terms are the wrong people. "vehicle maintenance log", "vehicle maintenance tracker" and "vehicle inspection checklist" are dominated by car owners and state inspection pages; even if we ranked, few visitors run 5 or more vans.
- The right people search "fleet maintenance software" and its variants, and that page one is funded vendors and review publishers spending USD 158 a click. A brand new subdomain will not displace Fleetio, MaintainX, Forbes or Capterra within 90 days.
- The "free" queries already have strong free answers ranking: Fleetio's free tools page is first for "fleet maintenance software free", and FMCSA's own PDF forms rank for "dot inspection form" and "driver vehicle inspection report". A free DVIR form page of ours competes with the regulator itself.
- The winnable long tail is about 440 searches a month in total, and part of it is also vendor held. Even a top three spot on all of it would bring a few dozen visitors a month.
- The company rule passes when an idea's searches are not owned by big free tools. Here they are owned by big free tools and big paid vendors at once.

## Unit economics

Assumptions (mine, not measured): price USD 19 a month flat (Rs 1,791) for up to 25 vehicles; no ads; hosting on the existing free Vercel plan, so cash cost Rs 0 under the Rs 0 spend cap; no payment rail exists today (ap-2), so revenue cannot start until the owner sets one up. Organic click through rates below are assumptions, labelled as such.

- **Worst:** USD 0 (Rs 0). New pages are not on page one within 90 days, or the payment rail is not live. 0 payers x USD 19 = USD 0.
- **Likely:** USD 19 (Rs 1,791). Pages rank for part of the fleet long tail by day 60, say 150 searches a month. At an assumed 5% click through that is about 8 visitors a month, about 16 over the last two months. Even at a generous 6% visitor to payer rate that is 1 payer for 1 month: 1 x USD 19 = USD 19.
- **Best:** USD 190 (Rs 17,912). We reach the top three for the 440 long tail searches plus "pre trip inspection app" (260), so 700 searches a month, at an assumed 10% click through = 70 visitors a month for 2 months = 140 visitors; at an assumed 4% paying = about 5 payers for 2 months: 5 x USD 19 x 2 = USD 190.
- **Costs:** Rs 0 cash. Build time for accounts, multi vehicle records, driver links, reminders and export is the real cost; this is not a 48 hour build if it must store records safely for a business.

## Sizing

Pending: the sizing agent adds this section.

## Risks

- **It would prove me wrong if** pages on fleet-log.anchit-tandon.com reach 500 or more Google Search Console impressions a week for fleet specific terms by 21 Jan 2027 (about 60 days after a launch on 21 Nov 2026). I expect under 100.
- **It would prove me wrong if** 3 or more fleets with 5 or more vehicles pay by 21 Feb 2027 (90 days). I expect 0 or 1.
- **Free tier risk:** Simply Fleet Free already covers up to 5 vehicles with a driver app [3]. If it raises its free limit, our gap closes further.
- **Trust risk:** businesses hand fleet records only to a tool they trust to keep them. A no account web log cannot offer that, and adding accounts adds personal data and security review.
- **Regulatory risk:** DVIR and DOT record rules are real [9][10]. A product that claims "DOT compliant" makes a compliance promise, which the constitution forbids; we could only offer a log, not compliance.
- **Payment risk:** no rail exists (ap-2). Any revenue needs the owner's identity for a payment account.

## Options

- **Proceed:** build the phone log with driver inspection links and a USD 19 a month tier. Expected 90 day revenue USD 0 to 190, with search held by Fleetio, MaintainX and FMCSA.
- **Pivot to a free, no account daily vehicle inspection (DVIR style) form on the phone, with a paid USD 9 a month tier that keeps a shared history for a team:** targets "driver vehicle inspection report" (720), "pre trip inspection app" (260) and "dot inspection form" (880) [1], but page one there is FMCSA, J.J. Keller and funded DVIR apps, and it must avoid compliance claims. I do not think it clears the bar either.
- **Stop:** kill fleet-log and spend the build time on an idea whose search page one is not held by funded vendors and regulators.

## Scorecard

| Key | Score | Reason |
|---|---|---|
| pain | 3 | Real and recurring (services by mileage, daily inspections), but a free spreadsheet is good enough for many 5 to 10 vehicle firms [8][11]. |
| willingnessToPay | 3 | Many buyers pay USD 3 to 10 a vehicle a month [2][3][4][5], but free tiers below 6 vehicles [3] box our price in. |
| marketSize | 3 | 32,351 US landscapers with 5 to 49 staff [12] plus 111,207 HVAC and plumbing firms [13]; vehicle counts and current tool use unknown. |
| distribution | 2 | The one buyer term over 1,000 searches is held by funded vendors at USD 158 a click; high volume terms are consumer intent; fleet long tail totals about 440 a month [1]. |
| competitionGap | 2 | Simply Fleet Free, LubeLogger and Fleetio's free spreadsheets already do the core job for free [3][7][8]; "no account" is not a reason a business pays. |
| speedToRevenue | 2 | No payment rail (ap-2), and a trustworthy multi user record store is more than a 48 hour build. |
| recurringRevenue | 4 | Per vehicle monthly billing is the category norm and the job repeats every service cycle [2][3]. |

Total: 19 of 35. Bar: 24 total, none under 2, willingnessToPay and distribution at least 3. Fails on total and on distribution.

## Recommendation

No-go. People pay for fleet maintenance software, but the buyers find it through searches owned by Fleetio, MaintainX, Forbes and Capterra, and the free end is already covered by Simply Fleet Free, LubeLogger and Fleetio's spreadsheets. A new subdomain with search only distribution cannot reach the first 100 buyers in 90 days.

## Sources

1. DataForSEO Google Ads search volume, US, via Firecrawl Alexandria (dataforseo keywords/search-volume), 21 Nov 2026: https://dataforseo.com/apis/keywords-data-api
2. Fleetio pricing: https://www.fleetio.com/pricing
3. Simply Fleet pricing: https://www.simplyfleet.app/pricing
4. AUTOsist pricing: https://autosist.com/pricing/
5. Whip Around pricing on G2 (third party): https://www.g2.com/products/whip-around-whip-around/pricing
6. Etsy, fleet vehicle maintenance log listings: https://www.etsy.com/market/fleet_vehicle_maintenance_log
7. LubeLogger: https://lubelogger.com/
8. Fleetio free tools: https://www.fleetio.com/tools
9. FMCSA vehicle inspection, repair and maintenance record form: https://csa.fmcsa.dot.gov/safetyplanner/documents/Forms/Vehicle%20Maintenance%20Record_508.pdf
10. FMCSA driver vehicle inspection reports: https://www.fmcsa.dot.gov/safety/driver-vehicle-inspection-reports
11. Reddit r/smallbusinessuk, small fleet software request: https://www.reddit.com/r/smallbusinessuk/comments/1set3x5/recommendations_for_software_for_managing_a_small/
12. Census County Business Patterns 2023, NAICS 561730 by employment size: https://api.census.gov/data/2023/cbp?get=group(CB2300CBP)&NAICS2017=561730&ucgid=0100000US
13. Census profile, NAICS 238220: https://data.census.gov/all/profiles?q=238220:%20Plumbing,%20heating,%20and%20air-conditioning%20contractors
14. Small fleet statistics (secondary): https://smallfleethq.com/owner-operator/trucking-statistics
15. BTS, US automobile and truck fleets by use: https://www.bts.gov/content/us-automobile-and-truck-fleets-use-thousands
16. Vertex42 vehicle maintenance log: https://www.vertex42.com/ExcelTemplates/vehicle-maintenance-log.html
17. MaintainX pricing: https://www.getmaintainx.com/pricing
18. Page one, "fleet maintenance software": https://www.getmaintainx.com/industries/fleet-management , https://www.fleetio.com/ , https://www.geotab.com/fleet-management-solutions/fleet-maintenance/ , https://www.forbes.com/advisor/business/software/best-fleet-management-software/ , https://coastapp.com/blog/fleet-maintenance-software/
19. Page one, "fleet maintenance software free": https://www.fleetio.com/tools , https://fleetvip.com/ , https://autosist.com/ , https://www.capterra.com/fleet-maintenance-software/s/free/ , https://www.simplyfleet.app/
20. Page one, "vehicle maintenance log": https://www.amazon.com/vehicle-maintenance-log-book/s?k=vehicle+maintenance+log+book , https://www.fleetio.com/blog/vehicle-maintenance-log-software , https://www.acg.aaa.com/connect/blogs/5c/auto/car-maintenance-tracking-service-logs-apps-and-technologies
21. Page one, "vehicle inspection checklist": https://www.bar.ca.gov/safety-checklist , https://dmv.ny.gov/forms/vs471.pdf , https://mitti.com/checklists/safety/vehicle-inspection
22. Page one, "dot inspection form": https://www.fmcsa.dot.gov/sites/fmcsa.dot.gov/files/docs/part-396form6.pdf , https://www.maptrack.com/templates/dot-fmcsa , https://www.dotsafetyplus.com/product-category/free/
23. Page one, "driver vehicle inspection report": https://www.fmcsa.dot.gov/regulations/inspection-repair-and-maintenance-driver-vehicle-inspection-report-dvir , https://www.driveroo.com/what-is-driver-vehicle-inspection-report/
24. Page one, "pre trip inspection app": https://www.pretriptruck.com/ , https://mitti.com/apps/pre-trip-app , https://whiparound.com/blog/fleet-inspections-best-dvir-software/ , https://www.fleetio.com/features/vehicle-inspections
25. Page one, "vehicle maintenance tracker": https://carmaintenance.app/best-car-maintenance-tracking-apps/ , https://www.carfax.com/Service/ , https://www.drivvo.com/en-US/vehicle-maintenance/ , https://carjourney.io/car-maintenance-tracker
26. Page one, "vehicle maintenance log template": https://www.xappex.com/templates/vehicle-maintenance-log-template/ , https://templatelab.com/vehicle-maintenance-log/
