# Tech Pack Builder business case

Author: Meera, Head of Research. Date: 2026-11-28. FX used: USD 1 = INR 94.2754 (company/config.json, source xflowpay, as of 2026-11-14). No GBP or AUD rate is recorded by Finance, so those prices stay in their own currency. I did not propose or validate this idea and gain nothing if it passes. Every vendor price below was read today on the vendor's own page; review counts for Techpacker and AI Tech Packs come from Capterra and are marked so. Page one results are live US WebSearch results from today. Firecrawl search was tried once for "tech pack template" and failed (out of credits until about 22:14 UTC).

## Summary

- The job is real and people pay for it in several ways: Etsy templates at USD 8 to 12 once [1][2], bundles at GBP 39 and A$39.99 once [3][4], AI Tech Packs at about USD 20 a pack in credits [5], Techpacker at USD 35 a user a month billed yearly [6], and freelancers at USD 150 to 395 a garment [7][8].
- The buyers our free tool would attract are the template buyers, who pay once and little. Monthly payers exist (Techpacker, 28 Capterra reviews [9]) but they buy PLM features we would not build in 48 hours.
- Free options are stronger than the screen said: CLO-SET gives a full Excel tech pack (POM with tolerances across sizes, BOM, construction, quantity matrix) with "no email, no signup" [10]; template.net offers free online-editable tech packs and holds most of page one for "free tech pack template" [11][12]; Sewport has a free builder behind an account [13].
- Score 18 of 35. Recommendation: no-go. Fails the 24 bar; competitionGap, speedToRevenue and recurringRevenue are 2.

## Market

**Who pays.** New and small apparel brands, freelance designers and private-label sellers who send a tech pack to a factory for each style. The buyers on the evidence pages price in USD, GBP and AUD [1][3][4][6]; search demand is mostly US (2,400 a month for "tech pack template") with 720 a month in India [14][15]. It is a USD product first; an INR price would be for the smaller Indian search pool.

**How many (sourced):**

| Measure | Number | Source |
|---|---|---|
| US private apparel manufacturing establishments (NAICS 315), Q1 2026 | 6,199 | BLS [16] |
| US apparel manufacturing employment, Oct 2026 | 71,200 | BLS [16] |
| Sales by the largest Etsy tech pack template shop (all its products, 3 years) | 10.5k | Etsy, UrbanDistro [1] |
| Sales by a second Etsy tech pack shop (6 years) | 764 | Etsy, FIBRTechpacks [2] |

**What is not known:** how many independent brands (not factories) start or produce styles each year in the US, UK or India. I found no government or trade count. The BLS figure counts makers, not the brands that send them tech packs, so it is context only. The Etsy shop counts are the best buyer proxy: the biggest shop has about 10.5k sales in 3 years across all its listings [1], roughly 3,500 a year, at about USD 8 each.

## Problem

- **Pain:** A factory needs a complete spec to quote and sample, and agencies charge USD 100 to 1,200+ per style to make one [17]. Freelancers on Fiverr sell a simple one-garment pack at USD 150 [7]; Bomme Studio sells pack development at USD 395 [8]. So the job has a clear price when outsourced.
- **Frequency:** Once per style. Onbrand's only small-brand example is a capsule of three to five styles [17]. A small brand meets the job a few times a year, in bursts before each drop, not every month.
- **How people solve it today:** free spreadsheets and template pages [10][11][18]; one-time paid templates [1][2][3][4]; AI generation per pack [5]; subscription software [6]; or hiring a freelancer [7][8].
- **Sceptic's note:** the pain is real but episodic, and a one-time file solves most of it. I found no forum threads of small brands asking for a monthly tool; the cost guides I found are written by sellers [17].

## Competition

INR at 94.2754.

| Alternative | Price (own page) | What it does | Source |
|---|---|---|---|
| CLO-SET free tech pack template | Free, "no email, no signup, no watermark" | Excel: style info and flat sketch, construction, POM measurement sheet with tolerances across the size range, BOM, package and label, colour by size quantity matrix with totals. No automatic grading | [10] |
| template.net tech pack templates | Free, online editor and download; site has accounts and a pricing page, terms not stated on the template page | Many garment-specific tech packs (hoodie, t-shirt, backpack), BOM table; measurement grading not mentioned | [11][12] |
| Sewport tech pack tools | Free, account required | Tech pack creation tools plus guides, tied to its manufacturer marketplace | [13] |
| Bomme Studio free template | USD 0 (cart checkout); paid pack development USD 395 (Rs 37,239) | Spec pages, BOM, construction, artwork placement, costing | [8] |
| UrbanDistro Etsy bundle | USD 8.22 on sale from 16.43 (Rs 775 to 1,549), once | Editable files for sketches, construction, fabric, colourways, size charts; listing 73 reviews, 4.9 | [1] |
| FIBRTechpacks Etsy Excel | USD 11.82 (Rs 1,114), once | Excel, 7 pages, 9 size measurements, costing, colourways, cut sheet; 32 ratings, 4.3 | [2] |
| Make it British Tech Pack Bundle | GBP 39 plus VAT, once | InDesign, Google Sheets and PDF templates, checklist, examples, video | [3] |
| Payhip Adobe tech pack template | A$39.99, once | Illustrator and PDF, 10 sections incl. measurements, colourways, BOM; no sales shown | [4] |
| AI Tech Packs | Credits USD 1 each, standard pack 20 credits = USD 20 (Rs 1,886) a pack, no subscription; Starter USD 50 a month (Rs 4,714); unlimited USD 150 a month (Rs 14,141); no free plan; 2 Capterra reviews | AI draft from photo or sketch, web editor, PDF and Excel | [5][19] |
| Techpacker | Techpack Builder USD 35 a user a month billed yearly, USD 420 a year (Rs 39,596); 7 day trial, no free plan; 28 Capterra reviews, 4.5 | Online builder, one-click PDF, factory collaboration; grading only on PLM Professional at USD 95 a month | [6][9] |
| Fiverr freelancer (oti_will) | USD 150 (Rs 14,141) a garment; USD 25 an hour | Done for you, incl. size chart and BOM | [7] |
| Onbrand PLM | Demo only, no price shown | PLM with live tech packs | [17] |

**The gap.** No free tool I found does all of: no signup, browser form, automatic size grading from a base size, and a filled PDF export. CLO-SET's free Excel comes closest and asks for nothing [10]; template.net gives a free online editor [11]. So the gap is "grading plus PDF in the browser, without an account". That is a convenience over a free spreadsheet, not a missing capability.

## Willingness to pay

- **For:** Money changes hands at every level: USD 8 to 12 templates with real sales and reviews [1][2], GBP 39 and A$39.99 bundles [3][4], USD 20 per pack in credits [5], USD 420 a year for Techpacker with 28 reviews [6][9], and USD 150 to 395 a garment for services [7][8].
- **Against the Rs 500 a month floor:** Rs 500 a month is Rs 6,000 a year, about USD 64 a year at 94.2754. The template buyers who search "tech pack template" pay USD 8 to 12 once [1][2], which is 13 to 19 percent of one year at the floor, and then reuse the file for every style. A per-pack price at AI Tech Packs' USD 20 [5] clears the floor only for a brand that makes 4 or more packs a year with us (4 x USD 20 = USD 80); Onbrand's small-brand example is 3 to 5 styles [17], so the typical buyer sits right at or under the line, and only if they pay for every pack instead of copying the last one. AI Tech Packs offering no-subscription credits [5] suggests sellers see this resistance to monthly plans.
- **Monthly payers:** Techpacker's USD 35 a month [6] is the only sourced monthly price with a review base (28) [9]. Its buyers pay for a saved library, team and factory collaboration, which is the paid tier in our revenue model and not a 48 hour build.
- **Price we could charge:** USD 12 a pack (Rs 1,131) or USD 9 a month (Rs 848), my assumption, between Etsy [1][2] and AI Tech Packs [5]. Not tested.

## Distribution

Only search, to pages and free tools on our own subdomain. Volumes are Google Ads monthly averages from seodata.dev, read 28 Nov 2026. Firecrawl search failed today (out of credits until about 22:14 UTC), so page one below is WebSearch standard only, not cross-checked on a second engine.

| Search term | Monthly volume | CPC | Who holds page one now |
|---|---|---|---|
| tech pack | 5,400 US [20] | USD 2.87 | fridaythread.substack.com (two), producthunt collection, worldfashionexchange.com, gembah.com (two), makeitbritish.co.uk (two), portless.com, racklify.com (two), techpacker.com blog, sewport.com, help.browzwear.com (two), uphance.com, bommestudio.com (two), streamoid.com, hawthornintl.com, sourcify.com, plus two Minecraft mod pages [21] |
| tech pack template (tech pack templates 1,900 is the same group) | 2,400 US [14]; 720 IN [15] | USD 1.79, competition 1.0 | template.net, live.museum.manchester.ac.uk and other hijacked university and government subdomains (msoid.icmbio.gov.br, lbas.lboro.ac.uk, my-test.valpo.edu), techpacks.squarespace.com, slideshare, makeitbritish.co.uk, payhip.com, docsie.io, onbrandplm.com, templatemonster.com, hyperbots.com, bommestudio.com [18] |
| free tech pack template | 590 US [22] | USD 2.61 | template.net holds about 8 of 13 results, then museum.manchester mirrors, style.clo-set.com, makeitbritish.co.uk [12] |
| how to make a tech pack | 260 US [23] | USD 4.83 | not searched separately |
| tech pack software / tech pack maker | 90 each US [24][25] | USD 5.96 / 6.84 | not searched; buyers rarely search for software |

I count the 2,400 head term, not the sum of the template group, because seodata groups the variants together [14].

**Could a brand new subdomain page rank for "tech pack template"?**

- **For:** Page one is weak in the classic sense: spam pages on hijacked university and government subdomains, a slideshare, Squarespace and Payhip shops, and a few small vendor blogs [18]. None of them is a working tool. The fact that spam mirrors rank suggests the term is not heavily defended by strong, relevant pages. A free builder that outputs a filled PDF matches the searcher's intent better than a static file.
- **Against:** template.net is a high-authority template site that already holds the top slot for "tech pack template" and most of page one for "free tech pack template" with many garment-specific pages [12][18]. CLO-SET, a well-known fashion software brand, ranks with a free no-signup Excel [10][12]. The spam mirrors that rank sit on old .edu, .ac.uk and .gov.br domains with years of authority; a new subdomain of anchit-tandon.com has none, no backlinks, and no topical history in fashion. The CPC competition index is 1.0 [14], so funded advertisers want this click. My judgement: the long tail (garment-specific templates, "how to make a tech pack", grading calculators) could reach page one in 3 to 6 months; the 2,400 head term likely needs longer than the 90 day window, and I have no evidence either way beyond the page one mix.
- **Intent risk:** most searchers want a file to download, and they can get CLO-SET's for free with no email [10]. Converting them to pay is the hard part, not reaching them.
- **Verdict:** 3. Volume is real and the incumbents on page one are mostly weak, but template.net and CLO-SET already satisfy the free intent, and the head term is unproven for a new domain.

## Unit economics

Assumptions (mine, not measured): USD 12 a pack (Rs 1,131), one free pack per visitor; no ads; hosting on the free Vercel plan, cash cost Rs 0 under the Rs 0 cap. No payment rail exists: company/approvals/ap-2.json decided "do nothing for now" until a product clears its case and sizing, so revenue starts only after the owner opens one. Click-through and conversion rates are assumptions.

- **Worst:** USD 0 (Rs 0). No payment rail inside 90 days, or no page one placement. 0 x USD 12 = 0.
- **Likely:** USD 24 (Rs 2,263). Page two for "tech pack template" (2,400 [14]) and "free tech pack template" (590 [22]) by day 60, plus some long tail: assumed 1% click-through on 2,990 searches = about 30 visits a month, about 60 over the last two months, plus an assumed 60 long-tail visits = 120 visits; assumed 1.5% buy a second pack = 2 x USD 12 = USD 24.
- **Best:** USD 900 (Rs 84,848). Top five by day 30 for "tech pack", "tech pack template" and "free tech pack template" (5,400 + 2,400 + 590 = 8,390 [20][14][22]); assumed 8% click-through = 671 visits a month, about 2,000 over 3 months; assumed 3% buy = 60 packs x USD 15 average (some buy two) = USD 900.
- **Costs:** Rs 0 cash. Build effort: the free version (form, grading table, BOM, sketch upload, print to PDF) is plausible in 48 hours; the paid tier (saved library, share links for factories) needs accounts and storage of brand designs, which is more work and some data risk.

## Sizing

To follow: the sizing agent (Farhan) adds this in cases/tech-pack.sizing.json.

## Risks

- **It would prove me wrong if** pages on tech-pack.anchit-tandon.com reach 500 or more Google Search Console impressions a week for "tech pack template" terms by 28 Feb 2027. I expect under 100.
- **It would prove me wrong if** 20 or more paid packs (or 5 monthly subscribers) are sold by 26 Feb 2027 (90 days). I expect 0 to 2.
- **Free rival risk:** CLO-SET's free Excel [10] and template.net's free online tech packs [11] already serve the free searcher; if template.net adds grading or CLO-SET makes its sheet a web form, the gap closes.
- **Price risk:** the buyers we reach pay USD 8 to 12 once [1][2]; anything that relies on Rs 500 a month from them is unproven.
- **Recurrence risk:** a pack is made once per style, a few times a year [17]; churn after each drop is likely.
- **Payment risk:** no payment rail (ap-2); any revenue needs the owner's identity for a payment account.
- **Distribution risk:** high-authority template.net and old hijacked .edu domains hold the head term [18]; a new subdomain may not reach page one inside 90 days.
- **Legal risk:** low. B2B production documents, no regulated category (venture screen). We must not copy brand templates or claim factory acceptance.

## Options

- **Proceed:** build the free no-signup builder with grading and PDF, paid tier at about USD 9 a month or USD 12 a pack. Expected 90 day revenue USD 0 to 900, likely about USD 24.
- **Pivot to a free helper page inside another venture or a one-time pack price:** a size grading calculator page or per-pack export could win long-tail search cheaply, but per-pack pricing at Etsy levels breaks the Rs 500 a month floor for most buyers, so it does not pass the owner's screen.
- **Stop:** kill tech-pack; keep the finding that the head term's page one is weak (spam mirrors) but the free intent is already served by template.net and CLO-SET, and move the build to a job with recurring monthly payers.

## Scorecard

| Key | Score | Reason |
|---|---|---|
| pain | 3 | A factory needs a full spec, and outsourcing costs USD 100 to 1,200+ a style [7][8][17], but it is once per style, a few times a year, and a free spreadsheet solves it [10]. |
| willingnessToPay | 3 | People pay at every level: USD 8 to 12 templates with real sales [1][2], USD 20 a pack [5], USD 35 a month with 28 reviews [6][9]; but the buyers we would reach pay once, below the Rs 500 a month floor. |
| marketSize | 3 | 2,400 US and 720 India monthly searches for the head term [14][15] and an Etsy shop with 10.5k sales [1], but no count of independent brands exists and the US has 6,199 apparel makers [16]. |
| distribution | 3 | Page one for the head term is mostly spam mirrors and small shops [18], but template.net and CLO-SET hold the free intent [12] and a new subdomain has no authority; the head term is unproven inside 90 days. |
| competitionGap | 2 | CLO-SET gives a full free Excel with no email or signup [10], template.net a free online editor [11], Sewport a free builder [13]; only no-signup grading plus PDF in the browser is open. |
| speedToRevenue | 2 | The free tool is a 48 hour build, but there is no payment rail (ap-2) and the free pack covers the typical one-off need, so the likely 90 day revenue is about USD 24. |
| recurringRevenue | 2 | The job repeats per style, a few times a year [17]; the market sells mostly one-time templates [1][2][3][4] and per-pack credits [5], so monthly retention is unlikely. |

Total: 18 of 35. Bar: 24 total, none under 2, willingnessToPay and distribution at least 3. Fails on total.

## Recommendation

No-go. The job is real and people pay for it, but the people a free search tool reaches buy a template once for USD 8 to 12 and reuse it, which is far below Rs 500 a month; per-pack pricing at USD 20 clears the floor only for brands making 4 or more packs a year with us. CLO-SET already gives a full free Excel tech pack with no signup, template.net owns the free intent on page one, and monthly payers buy Techpacker's collaboration features, not a form. The likely 90 day revenue is about USD 24.

## Sources

1. UrbanDistro, Fashion Tech Pack Template Bundle on Etsy (USD 8.22 from 16.43, shop 10.5k sales, listing 73 reviews): https://www.etsy.com/listing/1698863971
2. FIBRTechpacks, Excel tech pack template on Etsy (USD 11.82, 764 shop sales, 32 ratings): https://www.etsy.com/listing/889838795
3. Make it British, Tech Pack Bundle (GBP 39 plus VAT): https://makeitbritish.co.uk/tech-pack-bundle/
4. Payhip, Adobe Tech Pack Template, Blank with Instructions (A$39.99): https://payhip.com/b/tBpnV
5. AI Tech Packs pricing (credits USD 1, pack 20 credits, Starter USD 50, unlimited USD 150, no free plan): https://aitechpacks.com/pricing
6. Techpacker pricing (Techpack Builder USD 35 a user a month billed yearly, 7 day trial; PLM Professional USD 95 with grading): https://techpacker.com/pricing
7. Fiverr, oti_will, simple 1 garment tech pack USD 150, 5.0 from 12 reviews: https://fiverr.com/oti_will/create-a-professional-clothing-tech-pack-for-manufacturing
8. Bomme Studio free tech pack template (USD 0) and Professional Apparel Tech Pack Development (USD 395): https://bommestudio.com/free-tech-pack-template
9. Techpacker on Capterra UK (28 reviews, 4.5, from USD 49 a user, no free version): https://www.capterra.co.uk/software/165057/techpcker
10. CLO-SET, Free Tech Pack Template (Excel), No Email Required: https://style.clo-set.com/es/resources/article/ea95bf7b27ca48619b9b76752097aa70
11. template.net tech pack templates and free online editor: https://www.template.net/tech-pack and https://www.template.net/edit-online/518489/tech-pack
12. Page one, "free tech pack template" (WebSearch, 28 Nov 2026): template.net (edit-online 518489, 517236, 517233, 517232, 517158, 517320, 514218 and /tech-pack), https://live.museum.manchester.ac.uk/library/tech-pack-template.html , https://msoid.icmbio.gov.br/templates/tech-pack-template.html , https://style.clo-set.com/es/resources/article/ea95bf7b27ca48619b9b76752097aa70 , https://makeitbritish.co.uk/tech-pack-bundle/
13. Sewport tech pack tools (free, account required): https://sewport.com/tech-pack
14. seodata.dev, "tech pack template" US (2,400, CPC 1.79, competition 1): https://api.seodata.dev/v1/keyword?q=tech%20pack%20template&country=us
15. seodata.dev, "tech pack template" India (720): https://api.seodata.dev/v1/keyword?q=tech%20pack%20template&country=in
16. BLS, Apparel Manufacturing NAICS 315 (6,199 private establishments Q1 2026; 71.2 thousand employees Oct 2026): https://www.bls.gov/iag/tgs/iag315.htm
17. Onbrand, How Much Does a Tech Pack Cost (USD 100 to 1,200+ a style; capsule of 3 to 5 styles; demo only): https://www.onbrandplm.com/blog/how-much-does-a-tech-pack-cost and https://www.onbrandplm.com/blog/tech-pack-template
18. Page one, "tech pack template" (WebSearch, 28 Nov 2026): https://www.template.net/tech-pack , https://live.museum.manchester.ac.uk/library/tech-pack-template.html , https://techpacks.squarespace.com/tech-pack-template , https://www2.slideshare.net/slideshow/the-art-of-a-well-structured-tech-pack-template-pptx-pdf/267875903 , https://msoid.icmbio.gov.br/templates/techpack-template.html , https://makeitbritish.co.uk/tech-pack-bundle/ , https://payhip.com/b/tBpnV , https://lbas.lboro.ac.uk/template/techpack-template.html , https://www.docsie.io/solutions/templates/fashion-apparel/tech-pack/ , https://www.onbrandplm.com/blog/tech-pack-template , https://my-test.valpo.edu/tech-pack-template-psd-93790 , https://www.templatemonster.com/product-mockups/fashion-tech-pack-template-424862.html , https://www.hyperbots.com/glossary/tech-pack-template , https://bommestudio.com/free-tech-pack-template
19. AI Tech Packs on Capterra (2 reviews): https://www.capterra.com/p/10049304/AI-Tech-Packs/
20. seodata.dev, "tech pack" US (5,400): https://api.seodata.dev/v1/keyword?q=tech%20pack&country=us
21. Page one, "tech pack" (WebSearch, 28 Nov 2026): https://fridaythread.substack.com/p/tech-pack-mastery-the-ultimate-guide , https://www.producthunt.com/@jeffberrylife/collections/tech-pack , https://www.portless.com/blogs/what-is-a-tech-pack , https://racklify.com/encyclopedia/how-to-build-a-tech-pack-practical-step-by-step-checklist/ , https://www.techpacker.com/blog/what-is-a-tech-pack/ , https://sewport.com/tech-pack , https://uphance.com/blog/tech-pack-mistakes-to-avoid/ , https://www.bommestudio.com/blog/how-to-make-a-tech-pack , https://www.hawthornintl.com/tech-packs , https://streamoid.com/resources/guides/how-to-create-a-tech-pack , https://www.curseforge.com/minecraft/modpacks/a-tech-pack
22. seodata.dev, "free tech pack template" US (590): https://api.seodata.dev/v1/keyword?q=free%20tech%20pack%20template&country=us
23. seodata.dev, "how to make a tech pack" US (260): https://api.seodata.dev/v1/keyword?q=how%20to%20make%20a%20tech%20pack&country=us
24. seodata.dev, "tech pack software" US (90): https://api.seodata.dev/v1/keyword?q=tech%20pack%20software&country=us
25. seodata.dev, "tech pack maker" US (90): https://api.seodata.dev/v1/keyword?q=tech%20pack%20maker&country=us
