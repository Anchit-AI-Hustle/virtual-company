# Rent Ledger business case

Author: Meera, Head of Research. Date: 2026-11-21. FX used: USD 1 = INR 94.2754 (company/config.json, source xflowpay, as of 2026-11-14). I did not propose this idea and gain nothing if it passes. Firecrawl credits are exhausted, so this cycle used web search and direct page reads only. Search volumes come from the venture's screen (seodata.dev, Google Ads monthly averages, United States, read 21 Nov 2026 [1]); I tried to re-read that source this cycle and the fetch was blocked, so those numbers are not independently re-checked. Page one results below are live US web searches run on 21 Nov 2026 [17][18][19][20].

## Summary

- Small US landlords are a large pool (individual investors owned about 13.6 million rental properties in 2020 [2]) and they do pay monthly for landlord software: Stessa Manage USD 12 to 15 [3], Landlord Studio PRO USD 12 to 15 [4], TurboTenant Essentials USD 149 a year for 1 to 10 units [5].
- But the exact product proposed is already free. Stessa Essentials gives a tenant ledger and rent roll, automated late fees and online rent collection free, with unlimited properties [3]. Baselane Core gives a tenant ledger, rent roll, automated rent, reminders and late fees for USD 0 [6]. TenantCloud, TurboTenant and Avail all have free plans [5][7][8].
- Our proposed paid tier (saved ledgers across devices, several tenants) is exactly what Stessa and Baselane give away free. That leaves no reason to pay us.
- Distribution fails: "rent ledger" (5,400) and "rent ledger template" (2,400) [1] are template downloads, and page one is TurboTenant, Landlord Studio, TenantCloud, Baselane, DoorLoop and template.net [17][18].
- Score 16 of 35. Recommendation: no-go. It fails the total, competitionGap is under 2, and willingnessToPay and distribution are under 3.

## Market

**Who pays.** Individual US landlords with 1 to 10 units who self-manage. Every competitor below prices in USD [3][4][5][6][7][8], and all the demand evidence is from US landlords on BiggerPockets [9][10]. This is a USD product.

**How many (sourced):**

| Measure | Number | Source |
|---|---|---|
| US rental properties, 2020 | 19.3 million | 2021 Rental Housing Finance Survey via CRS [2] |
| Share of rental properties owned by individual investors, 2020 | 70.2% (about 13.6 million properties) | CRS [2] |
| Share of rental units owned by individual investors, 2020 | 37.6% (about 18.6 million units) | CRS [2] |
| Properties with 1 unit, 2024 RHFS | 82.9% of properties | Census 2024 RHFS infographic [11] |
| Properties with 2 to 4 units, 2024 RHFS | 14.6% of properties | Census 2024 RHFS infographic [11] |

**What is not known:** the number of individual landlords (CRS reports properties and units, not owners [2]); how many self-manage versus use a property manager; how many already use Stessa, Baselane, TurboTenant or a spreadsheet. The pool is large, but the pool is not the constraint here.

## Problem

- **Pain:** Real but mild. In a February 2026 BiggerPockets thread on a free Google Sheets rent tracker, landlords asked for actual payment date, late fees, remaining balance and partial payment columns, and one said spreadsheets "track what happened" but do not auto-calculate late fees [9]. A self-managing landlord calls a homemade Excel sheet tedious manual entry [10].
- **Frequency:** Repeats monthly (rent is due every month), which favours a subscription in principle.
- **How people solve it today:** a spreadsheet; a free PDF template from a vendor [17][18]; or a free account on Stessa or Baselane [3][6].
- **Sceptic's note:** In the same thread [10], replies say "Spreadsheets and a shared photo folder work fine for a few units" and "A spreadsheet works fine at small scale", and an accountant says Stessa's free tier may be enough for a very small portfolio. In the tracker thread [9], nobody said they would pay; the poster's templates were "All free, no signup", and the one reply asking whether it would be sold went unanswered. The pain is that a spreadsheet is a little tedious, and a free tool already removes it.

## Competition

All prices are from each vendor's own page. INR at 94.2754.

| Alternative | Price | Ledger, late fees, several tenants | Source |
|---|---|---|---|
| Stessa Essentials | USD 0 | Tenant ledger and rent roll, automated reminders and late fees, online rent collection on every plan; unlimited properties | [3] |
| Stessa Manage / Pro | USD 15 or 12 annual (Rs 1,414 / Rs 1,131); USD 35 or 28 annual (Rs 3,300 / Rs 2,640) a month | Same ledger plus more | [3] |
| Baselane Core | USD 0 | Tenant ledger and rent roll; "Automated rent, reminders, and late fees" | [6] |
| Baselane Smart | USD 20 a month on an annual plan (Rs 1,886) | More features | [6] |
| Landlord Studio GO / PRO | GO free up to 3 units; PRO USD 15 monthly or 12 annual (Rs 1,414 / Rs 1,131), 3 units, extra units USD 1 to 1.20 | GO has income and expense tracking and online rent collection; rent ledger named under PRO reports | [4] |
| TurboTenant Free / Essentials / Pro | Free; Essentials USD 149 a year for 1 to 10 units (Rs 14,047); Pro USD 199 a year (Rs 18,761) | Free plan advertised as "access all of TurboTenant for $0"; late fees and receipts listed under rent payments | [5] |
| TenantCloud Free / Essentials / Pro | Free; Essentials USD 149 a year for 1 to 10 units; Pro USD 199 a year | Free plan "No fees or contracts - ever" | [7] |
| Avail Unlimited / Unlimited Plus | USD 0 per unit; USD 9 per unit a month (Rs 848) | Free plan has online rent collection and income and expense tracking | [8] |
| Rent Ledger Template (Product Hunt) | Free | Generator with running balance and PDF, CSV and Excel export; no late fee calculation (commenters asked for it); no save mentioned | [12] |
| Vendor PDF templates (TurboTenant, Landlord Studio) | Free | Static printable PDF with running balance; pages push a free account | [17][18] |
| Etsy rent ledger spreadsheets | For example USD 6.99 once (Rs 659), 0 sales and no reviews on the listing read | Excel tracker | [13] |

**The gap we would fill.** A ledger kept month to month in the browser, with no account, late fees calculated automatically, PDF and CSV export and a tenant share link. Two parts of that gap are real: Stessa and Baselane both need an account, and the Product Hunt generator does not calculate late fees [12]. But the gap does not survive the paid tier. The moment a landlord wants the ledger saved across devices and for several tenants (what we would charge for), Stessa and Baselane give exactly that free, with late fees, reminders and online rent collection we would not have [3][6]. So the free version competes with free PDFs and a free generator, and the paid version competes with free Stessa.

## Willingness to pay

- For: landlords do pay for software. Stessa, Landlord Studio and Baselane sell USD 12 to 35 a month tiers [3][4][6]; TurboTenant and TenantCloud sell USD 149 to 199 a year for 1 to 10 units [5][7]. These are above the company's Rs 500 a month floor.
- Against: what those tiers sell is not the ledger. The ledger, rent roll and late fees are on the free tiers of Stessa and Baselane [3][6]; the paid tiers add banking, reports, more portfolios and the like. I found no evidence that anyone pays for a ledger alone. The one marketplace signal read, an Etsy rent ledger spreadsheet at USD 6.99, showed 0 sales [13]. The BiggerPockets threads show no stated willingness to pay [9][10].
- The price we could charge is boxed in at about the cheapest paid tier we could justify: USD 6 a month (Rs 566), my assumption for the arithmetic below and not a tested price. Even that price buys less than free Stessa.

## Distribution

Our only channel is search to pages and free tools on our own subdomain.

| Search term | US monthly volume | Who holds page one now |
|---|---|---|
| rent ledger | 5,400 [1] | TurboTenant glossary and template, Baselane, Steadily, TenantCloud guides, iPropertyManagement template, Young and the Invested [20] |
| rent ledger template | 2,400 [1] | TurboTenant PDF, Landlord Studio PDF, template.net, TenantCloud, Product Hunt generator, Baselane, DoorLoop [17] |
| rental ledger template | 2,400, likely the same Google group [1] | not searched separately |
| rent ledger example | 720 [1] | not searched separately |
| free rent ledger template | 590 [1] | same set as rent ledger template [17] |
| rent tracker | 880 [14] | not searched separately |
| tenant ledger | volume unknown (null) | Buildium, TenantCloud, RentRedi, Azibo, August, GetApp and Capterra listings [19] |
| rent late fee calculator | volume unknown (null) | Apartments.com, Landlord Studio calculator, Zillow, RentPrep, Avail, TurboTenant, Calculator Academy [18] |

**Could our pages rank and convert?** Honestly, not much.

- The volume is real (about 7,800 a month for the two head terms [1]) but the intent is "download a template". Page one is held by funded landlord software vendors with years of domain authority (TurboTenant, Landlord Studio, TenantCloud, Baselane, DoorLoop) and by template.net [17][20]. A new subdomain will not displace them within 90 days.
- The long tail we hoped to own is also taken. "rent late fee calculator" already has a free Landlord Studio calculator with flat, percentage and daily fees, a PDF report and tenant notice templates [15], plus Zillow and Apartments.com guides [18]. "tenant ledger" is held by Buildium, TenantCloud and RentRedi [19].
- A visitor who does convert to "I want this saved" is one click from a free Stessa or Baselane account. The search converts to free use, not to payment.
- This is the fleet-log and kennel-book pattern again: the buyer terms are owned by vendors who give the product away to sell something else.

## Unit economics

Assumptions (mine, not measured): price USD 6 a month (Rs 566) for the saved, multi tenant tier; no ads; hosting on the existing free Vercel plan, so cash cost Rs 0 under the Rs 0 spend cap; no payment rail exists today (company/approvals/ap-2.json, decided "do nothing for now"), so revenue cannot start until the owner sets one up. Click through and conversion rates below are assumptions, labelled as such.

- **Worst:** USD 0 (Rs 0). Pages are not on page one within 90 days, or no payment rail is live. 0 payers x USD 6 = USD 0.
- **Likely:** USD 12 (Rs 1,131). Pages reach the bottom of page one or page two for part of the 7,800 head searches by day 60. At an assumed 1% click through that is 78 visitors a month, 156 over the last two months. At an assumed 1% visitor to payer rate (low, because free Stessa is one click away) that is 1 payer for 2 months: 1 x USD 6 x 2 = USD 12.
- **Best:** USD 300 (Rs 28,283). We reach the top five for "rent ledger" and "rent ledger template" (7,800 a month) by day 30, at an assumed 8% click through = 624 visitors a month for 2 months = 1,248 visitors; at an assumed 2% paying = 25 payers: 25 x USD 6 x 2 = USD 300.
- **Costs:** Rs 0 cash. The free browser ledger is a small build; the paid tier needs accounts, sync, backups and a tenant share link with access control, which adds security and legal review.

## Sizing

The sizing agent (Farhan) adds this in cases/rent-ledger.sizing.json.

## Risks

- **It would prove me wrong if** pages on rent-ledger.anchit-tandon.com reach 1,000 or more Google Search Console impressions a week for rent ledger terms by 21 Jan 2027. I expect under 200.
- **It would prove me wrong if** 10 or more landlords pay by 21 Feb 2027 (90 days). I expect 0 or 1.
- **Free tier risk:** Stessa and Baselane already give the ledger and late fees free [3][6]. If either adds a no account mode or a public ledger generator, the free gap closes too.
- **Copy risk:** the Product Hunt generator [12] is one feature (late fees) away from our free version, and commenters have already asked for it.
- **Legal risk:** late fee caps and grace periods differ by state, so a late fee calculator must not read as legal advice or say a fee is lawful.
- **Data risk:** tenant names and payment history are personal data. A tenant share link needs access control, or it leaks a tenant's payment record.
- **Payment risk:** no rail exists (ap-2). Any revenue needs the owner's identity for a payment account.

## Options

- **Proceed:** build the free no account ledger with late fees, PDF and CSV export and a share link, and a USD 6 a month saved tier. Expected 90 day revenue USD 0 to 300, competing with free Stessa and Baselane.
- **Pivot to a free helper only (no paid tier) as a traffic asset for a later product:** a rent ledger and late fee page that earns nothing; it fails the mission ("output that earns nothing is not progress") and Landlord Studio already ranks a free late fee calculator [15]. I do not recommend it.
- **Stop:** kill rent-ledger and spend the build time on a job where the free tools leave the paid part open.

## Scorecard

| Key | Score | Reason |
|---|---|---|
| pain | 2 | Monthly and real, but mild: landlords say a spreadsheet works fine for a few units, and free Stessa covers the rest [9][10]. |
| willingnessToPay | 2 | Landlords pay USD 12 to 35 a month for suites [3][4][6], but the ledger and late fees are free on Stessa and Baselane [3][6]; no evidence anyone pays for a ledger alone, and the Etsy ledger read had 0 sales [13]. |
| marketSize | 4 | Individual investors owned about 13.6 million US rental properties in 2020 [2]; the landlord count itself is unknown. |
| distribution | 2 | About 7,800 searches a month [1], but template intent, and page one is TurboTenant, Landlord Studio, TenantCloud, Baselane and DoorLoop; the late fee and tenant ledger tails are held too [15][17][18][19][20]. |
| competitionGap | 1 | Our paid tier (saved ledgers, several tenants, late fees) is free on Stessa and Baselane with unlimited properties [3][6]; the free tier competes with free PDFs and a free generator [12][17]. |
| speedToRevenue | 2 | The free version is a fast build, but no payment rail exists (ap-2) and the paid tier competes with free. |
| recurringRevenue | 3 | Rent repeats monthly and subscriptions are the norm [3][4], but a payer can move to free Stessa at any time. |

Total: 16 of 35. Bar: 24 total, none under 2, willingnessToPay and distribution at least 3. Fails on total, on competitionGap (1), and on willingnessToPay and distribution (2 each).

## Recommendation

No-go. The market is large and landlords do pay for software, but not for this. Stessa and Baselane give the tenant ledger, rent roll and automated late fees free, with unlimited properties, which is the exact feature set our paid tier would sell. The rent ledger searches are template downloads held by TurboTenant, Landlord Studio, TenantCloud, Baselane and DoorLoop, and the late fee tail already has a free Landlord Studio calculator. A new subdomain with search only distribution cannot reach the first 100 paying landlords in 90 days.

## Sources

1. Venture screen search volumes, seodata.dev (Google Ads monthly averages, US), recorded 21 Nov 2026 in company/ventures/rent-ledger.json; re-read blocked this cycle: https://api.seodata.dev/v1/keyword?q=rent+ledger+template&country=us
2. Congressional Research Service, Ownership of the U.S. Rental Housing Stock by Investor Type (2021 Rental Housing Finance Survey): https://www.everycrsreport.com/reports/R47332.html
3. Stessa pricing: https://www.stessa.com/pricing/
4. Landlord Studio, choosing your plan (help centre): https://help.landlordstudio.com/en/articles/3905574-choosing-your-plan ; Capterra listing used by the screen: https://www.capterra.com/p/182473/Landlord-Studio/pricing/
5. TurboTenant pricing: https://turbotenant.com/pricing
6. Baselane pricing: https://www.baselane.com/pricing
7. TenantCloud pricing: https://tenantcloud.com/pricing
8. Avail pricing: https://www.avail.com/pricing
9. BiggerPockets, free Google Sheets rent payment tracker template for landlords (Feb 2026): https://www.biggerpockets.com/forums/52/topics/1277850-free-google-sheets-rent-payment-tracker-template-for-landlords
10. BiggerPockets, self-managing landlord asks what system others use: https://www.biggerpockets.com/posts/7311791
11. Census, 2024 Rental Housing Finance Survey infographic: https://www.census.gov/content/dam/Census/programs-surveys/rhfs/2024-rhfs-infographic.pdf
12. Rent Ledger Template on Product Hunt: https://www.producthunt.com/p/rent-ledger-template/rent-ledger-template
13. Etsy, Rent Ledger Template Excel tracker listing: https://www.etsy.com/listing/4616064055
14. RankHero, "rent tracker" keyword: https://www.rankhero.com/keywords/rent-tracker
15. Landlord Studio late fees calculator: https://www.landlordstudio.com/calculators/late-fees
16. Stessa comparison context, Baselane vs Stessa: https://www.baselane.com/resources/baselane-vs-stessa
17. Page one, "rent ledger template": https://www.turbotenant.com/accounting/rent-ledger-template/ , https://www.landlordstudio.com/resource/free-rent-ledger-template , https://www.template.net/edit-online/471848/rental-ledger , https://www.tenantcloud.com/blog/rent-ledger-template , https://www.producthunt.com/p/rent-ledger-template/rent-ledger-template , https://www.baselane.com/resources/fillable-rent-ledger , https://www.doorloop.com/resources/rent-ledger-template
18. Page one, "rent late fee calculator": https://www.apartments.com/rental-manager/resources/article/how-to-calculate-and-enforce-a-late-fee-for-rent , https://www.landlordstudio.com/calculators/late-fees , https://www.zillow.com/rental-manager/resources/late-fee-for-rent/ , https://rentprep.com/blog/collecting-rent/how-to-calculate-late-fees-on-rent/ , https://www.avail.com/education/articles/how-to-calculate-and-collect-late-rent-fees-per-day , https://calculator.academy/rent-late-fee-calculator/
19. Page one, "tenant ledger": https://www.buildium.com/dictionary/tenant-ledger/ , https://tenantcloud.com/blog/what-is-a-tenant-ledger , https://rentredi.com/blog/tenant-ledger/ , https://www.azibo.com/blog/tenant-ledger , https://www.augustapp.com/dictionary/tenant-ledger
20. Page one, "rent ledger": https://www.turbotenant.com/glossary/rent-ledger/ , https://www.baselane.com/resources/what-is-a-rent-ledger-definition-free-template-for-2022 , https://www.steadily.com/blog/what-is-rent-ledger , https://www.tenantcloud.com/accounting/what-is-a-tenant-ledger , https://ipropertymanagement.com/templates/rent-ledger , https://youngandtheinvested.com/rent-ledger/
